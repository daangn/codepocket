/**
 * 재사용 가능한 타입들
 */
export interface PocketToken {
  pocketToken: string;
}

export interface CodeInfo {
  codeName: string;
  codeAuthor: string;
}

export interface StoryInfo extends CodeInfo {
  storyName: string;
  storyAuthor: string;
}

export interface StoryInfoWithCode extends StoryInfo {
  codes: { [x: string]: string };
}

export interface UserInfo {
  userName: string;
  email: string;
}

export type UserInfoWithToken = UserInfo & PocketToken;

/**
 *
 */
export interface PushCodeParams {
  code: string;
  codeName: string;
  codeAuthor: string;
  isAlreadyPushedCode: boolean;
  slackChatChannel?: string;
  slackChatTimeStamp?: any;
}

export interface SearchCodesParam {
  searchRegex?: RegExp;
  limit: string;
  offset: string;
}

export interface FindCodeInfoUsingRegexParams {
  codeNameRegex: RegExp;
  codeAuthorRegex: RegExp;
}
