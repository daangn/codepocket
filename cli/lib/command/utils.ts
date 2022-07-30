import { BASE_DEV_URL, BASE_PROD_URL } from '../env';

export const checkaServerEnv = () => {
  if (
    (process.env.NODE_ENV === 'development' && !BASE_DEV_URL) ||
    (process.env.NODE_ENV !== 'development' && !BASE_PROD_URL)
  )
    throw Error('🚨 서버 환경변수를 입력해주세요');
};
