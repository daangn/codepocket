import { UploadSlackFileResponse } from '@codepocket/schema';
import { to } from 'await-to-js';

import { postMessageToSlackAPI, uploadCodeToSlackAPI } from './api';
import { changeFirstToUpperCase } from './utils';

export interface SlackConfig {
  SLACK_BOT_TOKEN?: string;
  CHAPTER_FRONTED_CHANNEL_ID?: string;
  CODEPOCKET_CHANNEL_ID?: string;
}

interface PoseMessageToSlack {
  isAlreadyPushedCode: boolean;
  codeAuthor: string;
  codeName: string;
  config: SlackConfig;
  isAnonymous: boolean;
  uploadedChatURL?: string;
}

interface UploadCodeToSlack {
  code: string;
  codeName: string;
  codeAuthor: string;
  isAlreadyPushedCode: boolean;
  isAnonymous: boolean;
  config: SlackConfig;
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

export const postMessageToSlack = async ({
  isAlreadyPushedCode,
  codeAuthor,
  codeName,
  config,
  uploadedChatURL,
  isAnonymous,
}: PoseMessageToSlack) => {
  const [postMessageError] = await to(
    postMessageToSlackAPI({
      slackBotToken: config.SLACK_BOT_TOKEN || '',
      channelId: config.CHAPTER_FRONTED_CHANNEL_ID || '',
      text: `${
        generateAuthorText({ isAnonymous, codeAuthor }) +
        generateInfoText({ isAlreadyPushedCode, codeName })
      }\n${uploadedChatURL}`,
    }),
  );

  if (postMessageError) throw new Error();
};

export const uploadCodeToSlack = async ({
  code,
  codeAuthor,
  codeName,
  config,
  isAnonymous,
  isAlreadyPushedCode,
}: UploadCodeToSlack) => {
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

  if (uploadCodeError || !uploadCodeResponse.response) throw new Error();

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
