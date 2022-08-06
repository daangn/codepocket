export const SLACK_API_BASE_URL = 'https://slack.com/api';
export const SLACK_POST_MESSAGE_URL = `${SLACK_API_BASE_URL}/chat.postMessage`;
export const SLACK_POST_FILE_UPLOAD_URL = `${SLACK_API_BASE_URL}/files.upload`;

// https://api.slack.com/types/file#file_types
export const Languages = {
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  go: 'go',
  java: 'java',
  css: 'css',
  html: 'html',
  markdown: 'markdown',
  ml: 'ocaml',
  py: 'python',
  rs: 'rust',
  sh: 'shell',
  text: 'text',
} as const;
// eslint-disable-next-line no-redeclare
export type Languages = typeof Languages[keyof typeof Languages];
