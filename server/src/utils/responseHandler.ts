import { to } from 'await-to-js';
import { FastifyReply } from 'fastify';

const CustomResponseStatuses = {
  2000: { message: '인증에 성공하셨어요', status: 200 },
  2001: { message: '스토리 코드를 반환해요', status: 200 },
  2002: { message: '삭제를 성공했어요', status: 200 },
  2003: { message: '코드 이름들을 가져왔어요', status: 200 },
  2004: { message: '코드를 가져왔어요', status: 200 },
  2005: { message: '코드를 성공적으로 넣었어요', status: 200 },
  2006: { message: '코드를 성공적으로 수정했어요', status: 200 },

  4000: { message: '권한이 없어요', status: 401 },
  4001: { message: '적절한 쿼리가 들어오지 않았아요', status: 400 },
  4002: { message: '존재하지 않는 스토리예요', status: 404 },
  4003: { message: '존재하지 않는 파일이예요', status: 404 },
  4004: { message: '이미 존재하는 스토리예요', status: 400 },
  4005: { message: '존재하지 않는 파일이예요', status: 404 },
  4006: { message: '삭제할 코드가 없어요', status: 404 },

  5000: { message: '데이터베이스에 문제가 생겼어요', status: 500 },
  5001: { message: '슬랙에 문제가 생겼어요', status: 500 },
};

export class CustomResponse<T = unknown> extends Error {
  customStatus: keyof typeof CustomResponseStatuses;

  body: T | null;

  constructor({
    customStatus,
    body,
  }: {
    customStatus: keyof typeof CustomResponseStatuses;
    body?: T;
  }) {
    super();
    this.customStatus = customStatus;
    this.body = body || null;
  }
}

export default async <T>(fn: () => Promise<CustomResponse<T>>, reply: FastifyReply) => {
  const [error, response] = await to(fn());
  if (error) {
    const { customStatus, body } = error as CustomResponse<T>;
    const { message, status } = CustomResponseStatuses[customStatus];
    return reply.code(status).send({ message, ...body });
  }
  const { customStatus, body } = response;
  const { message, status } = CustomResponseStatuses[customStatus];
  return reply.code(status).send({ message, ...body });
};
