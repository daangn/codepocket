import { Schema } from 'mongoose';

export interface User {
  userName: string;
  email: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Code {
  code: string;
  codeName: string;
  codeAuthor: string;
  uploadedChatChannel?: string;
  uploadedChatTimeStamp?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Story {
  codes: string;
  codeName: string;
  codeAuthor: string;
  storyName: string;
  storyAuthor: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = new Schema<User>({
  userName: {
    type: String,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    index: true,
    unique: true,
  },
  token: {
    type: String,
    index: true,
    unique: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

export const CodeSchema = new Schema<Code>({
  code: String,
  codeName: String,
  codeAuthor: String,
  uploadedChatChannel: String,
  uploadedChatTimeStamp: String,
  createdAt: Date,
  updatedAt: Date,
});

export const StorySchema = new Schema<Story>({
  codes: String,
  codeName: String,
  codeAuthor: String,
  storyName: String,
  storyAuthor: String,
  createdAt: Date,
  updatedAt: Date,
});
