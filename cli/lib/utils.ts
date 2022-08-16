import { JwtType } from '@codepocket/schema';
import jwt from 'jsonwebtoken';

import { TOKEN } from './env';

export const logger = {
  info: console.log,
  error: console.error,
};

export const getBaseUrl = (): string => {
  try {
    if (!TOKEN) throw new Error('발급받은 토큰을 환경변수에 넣어주세요!');

    // NOTE: KEY값은 server/src/dbModule/user.ts의 KEY변수와 동일하게 맞춰주세요
    const KEY = 'key';
    const decoded = jwt.verify(TOKEN, KEY) as JwtType;
    return decoded.serverUrl;
  } catch (error) {
    logger.error((error as Error).message);
    return '';
  }
};
