import { UploadSlackFileResponse } from '@pocket/schema';
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
  uploadedChatURL?: string;
}

interface UploadCodeToSlack {
  code: string;
  codeName: string;
  codeAuthor: string;
  isAlreadyPushedCode: boolean;
  config: SlackConfig;
}

export const postMessageToSlack = async ({
  isAlreadyPushedCode,
  codeAuthor,
  codeName,
  config,
  uploadedChatURL,
}: PoseMessageToSlack) => {
  const [postMessageError] = await to(
    postMessageToSlackAPI({
      slackBotToken: config.SLACK_BOT_TOKEN || '',
      channelId: config.CHAPTER_FRONTED_CHANNEL_ID || '',
      text: `\`${changeFirstToUpperCase(codeAuthor)}\`의 \`${codeName}\` 코드가 ${
        isAlreadyPushedCode ? '수정됐어요!' : '올라왔어요!'
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
  isAlreadyPushedCode,
}: UploadCodeToSlack) => {
  const [uploadCodeError, uploadCodeResponse] = await to(
    uploadCodeToSlackAPI({
      code,
      codeName,
      initialComment: `\`${changeFirstToUpperCase(codeAuthor)}\`의 \`${codeName}\` 코드가 ${
        isAlreadyPushedCode ? '수정됐어요!' : '올라왔어요!'
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
