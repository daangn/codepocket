import { JwtType } from '@codepocket/schema';
import jwt from 'jsonwebtoken';

import { TOKEN } from './env';

export const logger = {
  info: console.log,
  error: console.error,
};

export const getBaseUrl = () => {
  const token = TOKEN;
  if (!token) throw new Error('발급받은 토큰을 환경변수에 넣어주세요!');

  const decoded = jwt.verify(token, 'key') as JwtType;
  return decoded.serverUrl;
};
