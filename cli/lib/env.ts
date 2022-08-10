// custom_server는 .env에 있지 않다. 직접 입력받아야하는 변수이다
export const CUSTOM_SERVER = process.env.CUSTOM_SUERVER;

export const POCKET_DEV_SERVER = process.env.BASE_SERVER_URL_DEV;
export const POCKET_PROD_SERVER = process.env.BASE_SERVER_URL_PROD;
export const BASE_DEFAULT_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.BASE_SERVER_URL_DEV
    : process.env.BASE_SERVER_URL_PROD;

export const WEB_DEV_URL = process.env.BASE_CLIENT_URL_DEV;
export const WEB_PROD_URL = process.env.BASE_CLIENT_URL_PROD;
