/**
 * 재사용 가능한 타입들
 */
export interface PocketToken {
  pocketToken: string;
}

export interface CodeId {
  codeId: string;
}

export interface CodeName {
  codeName: string;
}

export interface CodeAuthor {
  codeAuthor: string;
  isAnonymous: boolean;
}

export interface CodeInfo {
  codeName: string;
  codeAuthor: string;
}

export interface CodeInfoWithAnonymous extends CodeInfo {
  isAnonymous: boolean;
}

export interface CodeInfoWithCode extends CodeInfoWithAnonymous {
  code: string;
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

export interface PushCodeParams {
  code: string;
  codeName: string;
  codeAuthor: string;
  isAnonymous: boolean;
  isAlreadyPushedCode: boolean;
  slackChatChannel?: string;
  slackChatTimeStamp?: any;
}

export interface SearchCodesParam {
  searchRegex?: RegExp;
  limit: number;
  offset: number;
}

export interface FindCodeInfoUsingRegexParams {
  codeNameRegex: RegExp;
  codeAuthorRegex: RegExp;
  isCodeAuthorExist: boolean;
}
