import to from 'await-to-js';
import fetch from 'node-fetch';

import { Languages, SLACK_POST_FILE_UPLOAD_URL, SLACK_POST_MESSAGE_URL } from './constants';
import { getExtensionFromFileName } from './utils';

interface PostMessageToSlack {
  slackBotToken: string;
  channelId: string;
  text: string;
  threadTs?: string;
}

interface UploadCodeToSlack {
  slackBotToken: string;
  channelId: string;
  code: string;
  codeName: string;
  initialComment: string;
  language?: Languages;
}

export const postMessageToSlackAPI = async ({
  text,
  slackBotToken,
  channelId,
  threadTs,
}: PostMessageToSlack) => {
  const [error, response] = await to(
    fetch(SLACK_POST_MESSAGE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${slackBotToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        channel: channelId,
        thread_ts: threadTs || '',
        text,
      }),
    }),
  );

  return { error, response };
};

const isLanguageExtType = (ext: string): ext is keyof typeof Languages =>
  Object.keys(Languages).includes(ext);

export const uploadCodeToSlackAPI = async ({
  codeName,
  code,
  language,
  initialComment,
  slackBotToken,
  channelId,
}: UploadCodeToSlack) => {
  const params = new URLSearchParams();
  const fileExt = getExtensionFromFileName(codeName) || 'text';
  const fileExtInLanguage = isLanguageExtType(fileExt) ? fileExt : 'text';

  params.append('channels', channelId);
  params.append('filetype', language || Languages[fileExtInLanguage]);
  params.append('filename', codeName);
  params.append('title', codeName);
  params.append('initial_comment', initialComment);
  params.append('content', code);

  const [error, response] = await to(
    fetch(SLACK_POST_FILE_UPLOAD_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${slackBotToken}`,
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: params,
    }),
  );
  return { error, response };
};
