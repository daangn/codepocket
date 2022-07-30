export interface DetailPathParam {
  codeAuthor: string;
  codeName: string;
}

export const pocketPath = '/';
export const generatePocketPath = () => '/';

export const detailPath = `/detail/:codeAuthor/:codeName`;
export const generateDetailPath = ({ codeAuthor, codeName }: DetailPathParam) =>
  `/detail/${codeAuthor}/${codeName}`;

export const authPath = '/auth';
