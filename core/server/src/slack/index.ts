/* eslint-disable no-underscore-dangle */
import { UploadSlackFileResponse } from '@codepocket/schema';
import { to } from 'await-to-js';

import { postMessageToSlackAPI, uploadCodeToSlackAPI } from './api';
import { changeFirstToUpperCase } from './utils';

export interface SlackConfig {
  BASE_WEB_URL?: string;
  SLACK_BOT_TOKEN?: string;
  CHAPTER_FRONTED_CHANNEL_ID?: string;
  CODEPOCKET_CHANNEL_ID?: string;
}

interface PostMessageToSlack<Response> {
  isAlreadyPushedCode: boolean;
  codeId: string;
  codeAuthor: string;
  codeName: string;
  config: SlackConfig;
  isAnonymous: boolean;
  uploadedChatURL?: string;
  PostMessageError: Response;
}

interface DeleteMessageToSlack<Response> {
  codeAuthor: string;
  codeName: string;
  config: SlackConfig;
  existsCodeResponse: any;
  DeleteMessageError: Response;
}

interface UploadCodeToSlack<Response> {
  code: string;
  codeName: string;
  codeAuthor: string;
  isAlreadyPushedCode: boolean;
  isAnonymous: boolean;
  config: SlackConfig;
  UploadCodeError: Response;
}

const generateAuthorText = ({
  isAnonymous,
  codeAuthor,
}: {
  isAnonymous: boolean;
  codeAuthor: string;
}) => (!isAnonymous ? `\`${changeFirstToUpperCase(codeAuthor)}\`의 ` : ``);
const generateInfoText = ({
  isAlreadyPushedCode,
  codeName,
}: {
  isAlreadyPushedCode: boolean;
  codeName: string;
}) => `\`${codeName}\` 코드가 ${isAlreadyPushedCode ? '수정됐어요!' : '올라왔어요!'}`;
const generateSlackLinkText = ({ uploadedChatURL }: { uploadedChatURL: string }) =>
  `\n코드 보기: ${uploadedChatURL}`;
const generateWebLinkText = ({ codeId, webBaseUrl }: { codeId: string; webBaseUrl: string }) =>
  `\n웹으로 보기: ${webBaseUrl}/detail/${codeId}`;

export const postMessageToSlack = async <Response>({
  isAlreadyPushedCode,
  codeId,
  codeAuthor,
  codeName,
  config,
  uploadedChatURL,
  isAnonymous,
  PostMessageError,
}: PostMessageToSlack<Response>) => {
  const [postMessageError] = await to(
    postMessageToSlackAPI({
      slackBotToken: config.SLACK_BOT_TOKEN || '',
      channelId: config.CHAPTER_FRONTED_CHANNEL_ID || '',
      text: `${
        generateAuthorText({ isAnonymous, codeAuthor }) +
        generateInfoText({ isAlreadyPushedCode, codeName }) +
        generateSlackLinkText({ uploadedChatURL: uploadedChatURL || '' }) +
        generateWebLinkText({ codeId, webBaseUrl: config.BASE_WEB_URL || '' })
      }`,
    }),
  );

  if (postMessageError) throw PostMessageError;
};

export const deleteMessageToSlack = async <Response>({
  codeAuthor,
  codeName,
  config,
  existsCodeResponse,
  DeleteMessageError,
}: DeleteMessageToSlack<Response>) => {
  const [deleteMessageError] = await to(
    postMessageToSlackAPI({
      slackBotToken: config.SLACK_BOT_TOKEN || '',
      channelId: existsCodeResponse._id?.uploadedChatChannel || '',
      threadTs: existsCodeResponse._id?.uploadedChatTimeStamp || '',
      text: `\`${codeAuthor}\`의 \`${codeName}\` 코드가 삭제되었어요!`,
    }),
  );
  if (deleteMessageError) throw DeleteMessageError;
};

export const uploadCodeToSlack = async <Response>({
  code,
  codeAuthor,
  codeName,
  config,
  isAnonymous,
  isAlreadyPushedCode,
  UploadCodeError,
}: UploadCodeToSlack<Response>) => {
  const [uploadCodeError, uploadCodeResponse] = await to(
    uploadCodeToSlackAPI({
      code,
      codeName,
      initialComment: `${
        generateAuthorText({ isAnonymous, codeAuthor }) +
        generateInfoText({ isAlreadyPushedCode, codeName })
      }`,
      slackBotToken: config.SLACK_BOT_TOKEN || '',
      channelId: config.CODEPOCKET_CHANNEL_ID || '',
    }),
  );

  if (uploadCodeError || !uploadCodeResponse.response) throw UploadCodeError;

  const {
    file: {
      channels,
      shares: { public: publicResponse },
    },
  }: UploadSlackFileResponse = await uploadCodeResponse.response.json();

  const uploadedChatChannel = channels[0];
  const uploadedChatTimeStamp = (publicResponse as any)[uploadedChatChannel][0].ts;
  const uploadedChatURL = `https://daangn.slack.com/archives/${uploadedChatChannel}/${uploadedChatTimeStamp}`;

  return { uploadedChatChannel, uploadedChatTimeStamp, uploadedChatURL };
};
