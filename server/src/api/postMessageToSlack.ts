import to from 'await-to-js';
import fetch from 'node-fetch';

import { SLACK_POST_MESSAGE_URL } from '../constants';

interface PostMessageToSlack {
  slackBotToken: string;
  channelId: string;
  text: string;
  threadTs?: string;
}

export const postMessageToSlack = async ({
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
