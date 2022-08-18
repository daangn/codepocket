/**
 * 재사용 가능한 타입들
 */
export interface PocketToken {
  pocketToken: string;
}

export interface CodeId {
  codeId: string;
}

export interface StoryId {
  storyId: string;
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

export interface StoryIdWithCode {
  storyId: string;
  code: string;
}

export interface StoryNamesWithCodeId {
  storyName: string;
  storyId: string;
}

export interface StoryInfoWithCode {
  codeId: string;
  storyName: string;
  storyAuthor: string;
  codes: { [x: string]: string };
}

export interface StoryInfoWithCodeId {
  codeId: string;
  storyName: string;
  storyAuthor: string;
}

export interface UserInfo {
  userName: string;
  email: string;
}

export interface UserPrivateInfo {
  pocketToken: string;
  userId: string;
}

export type UserNameWithId = Pick<UserInfo, 'userName'> & Pick<UserPrivateInfo, 'userId'>;

export type UserInfoWithToken = UserInfo & PocketToken;

export interface PushCodeParams {
  code: string;
  codeName: string;
  codeAuthor: string;
  userId: string;
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
