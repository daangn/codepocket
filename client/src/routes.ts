export interface DetailPathParam {
  codeAuthor: string;
  codeName: string;
}

export interface TokenPathQuery {
  token: string;
}

export const pocketPath = '/';
export const generatePocketPath = () => '/';

export const detailPath = `/detail/:codeAuthor/:codeName`;
export const generateDetailPath = ({ codeAuthor, codeName }: DetailPathParam) =>
  `/detail/${codeAuthor}/${codeName}`;

export const authPath = '/auth';

export const tokenPath = '/token';
export const generateTokenPath = ({ token }: TokenPathQuery) => `/token?token=${token}`;
