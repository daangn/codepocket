export interface DetailPathParam {
  codeId: string;
}

export interface TokenPathQuery {
  token: string;
}

export const pocketPath = '/';
export const generatePocketPath = () => '/';

export const detailPath = `/detail/:codeId`;
export const generateDetailPath = ({ codeId }: DetailPathParam) => `/detail/${codeId}`;

export const authPath = '/auth';

export const tokenPath = '/token';
export const generateTokenPath = ({ token }: TokenPathQuery) => `/token?token=${token}`;
