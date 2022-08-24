export const env = {
  SELF_URL: process.env.BASE_SERVER_URL,
  WEB_URL: process.env.BASE_WEB_URL,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
  CODEPOCKET_CHANNEL_ID: process.env.CODEPOCKET_CHANNEL_ID,
  CHAPTER_FRONTED_CHANNEL_ID: process.env.CHAPTER_FRONTED_CHANNEL_ID,
} as const;

export const checkSlackPossible =
  env.SLACK_BOT_TOKEN && env.CHAPTER_FRONTED_CHANNEL_ID && env.CODEPOCKET_CHANNEL_ID;
