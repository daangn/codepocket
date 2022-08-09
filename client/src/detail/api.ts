export type CodeFullName = `${string}/${string}`;
export type StoryFullName = `${string}-${string}`;
export type PocketCode = `${CodeFullName}_${StoryFullName}`;

export interface CodeData {
  code: string;
  uploadedChatChannel: string;
  uploadedChatTimeStamp: string;
}

export const getCodeUrl = `/code/id`;
export const getStoryNamesUrl = `/story/names`;
export const getStoryCodeUrl = `/story/code`;
export const createStoryUrl = `/story`;
