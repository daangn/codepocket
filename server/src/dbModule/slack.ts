import { UploadSlackFileResponse } from '@pocket/schema';
import { to } from 'await-to-js';

import { postMessageToSlackAPI } from '../api/postMessageToSlack';
import { uploadCodeToSlackAPI } from '../api/uploadCodeToSlack';
import { env } from '../utils/env';
import { CustomResponse } from '../utils/responseHandler';
import { changeFirstToUpperCase } from '../utils/string';

export const isSlackAvailable = env.SLACK_BOT_TOKEN && env.CODEPOCKET_CHANNEL_ID;

export const postMessageToSlack = async (
  isAlreadyPushedCode: boolean,
  codeAuthor: string,
  codeName: string,
  uploadedChatURL?: string,
) => {
  const [postMessageError] = await to(
    postMessageToSlackAPI({
      slackBotToken: env.SLACK_BOT_TOKEN || '',
      channelId: env.CHAPTER_FRONTED_CHANNEL_ID || '',
      text: `\`${changeFirstToUpperCase(codeAuthor)}\`의 \`${codeName}\` 코드가 ${
        isAlreadyPushedCode ? '수정됐어요!' : '올라왔어요!'
      }\n${uploadedChatURL}`,
    }),
  );

  if (postMessageError) throw new CustomResponse({ customStatus: 5001 });
};

export const uploadCodeToSlack = async (
  code: string,
  codeName: string,
  codeAuthor: string,
  isAlreadyPushedCode: boolean,
) => {
  const [uploadCodeError, uploadCodeResponse] = await to(
    uploadCodeToSlackAPI({
      code,
      codeName,
      initialComment: `\`${changeFirstToUpperCase(codeAuthor)}\`의 \`${codeName}\` 코드가 ${
        isAlreadyPushedCode ? '수정됐어요!' : '올라왔어요!'
      }`,
      slackBotToken: env.SLACK_BOT_TOKEN || '',
      channelId: env.CODEPOCKET_CHANNEL_ID || '',
    }),
  );

  if (uploadCodeError || !uploadCodeResponse.response)
    throw new CustomResponse({ customStatus: 5001 });

  const {
    file: {
      channels,
      shares: { public: publicResponse },
    },
  }: UploadSlackFileResponse = await uploadCodeResponse.response.json();

  // eslint-disable-next-line prefer-destructuring
  const uploadedChatChannel = channels[0];
  const uploadedChatTimeStamp = (publicResponse as any)[uploadedChatChannel][0].ts;
  const uploadedChatURL = `https://daangn.slack.com/archives/${uploadedChatChannel}/${uploadedChatTimeStamp}`;

  return { uploadedChatChannel, uploadedChatTimeStamp, uploadedChatURL };
};
