export interface CodeType {
  code: string;
  codeAuthor: string;
  codeName: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getCodesUrl = '/codes';
