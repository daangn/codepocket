export const isDevelopment = () => process.env.NODE_ENV === 'development';

const s = (dev: string | undefined, prod: string | undefined) => (isDevelopment() ? dev : prod);
export const env = {
  MONGO_DB_URI: s(process.env.MONGO_DB_URI_DEV, process.env.MONGO_DB_URI_PROD),
  MONGO_DB_NAME: s(process.env.MONGO_DB_NAME_DEV, process.env.MONGO_DB_NAME_PROD),
  SLACK_BOT_TOKEN: s(process.env.SLACK_BOT_TOKEN_DEV, process.env.SLACK_BOT_TOKEN_PROD),
  CODEPOCKET_CHANNEL_ID: s(
    process.env.CODEPOCKET_CHANNEL_ID_DEV,
    process.env.CODEPOCKET_CHANNEL_ID_PROD,
  ),
  CHAPTER_FRONTED_CHANNEL_ID: s(
    process.env.CHAPTER_FRONTED_CHANNEL_ID_DEV,
    process.env.CHAPTER_FRONTED_CHANNEL_ID_PROD,
  ),
} as const;
