import { to } from 'await-to-js';
import { FastifyReply } from 'fastify';

interface CustomResponseStatusesType {
  [key: number]: { message: string; status: number };
}

const CustomResponseStatuses: CustomResponseStatusesType = {
  2000: { message: '인증에 성공하셨어요', status: 200 },
  2001: { message: '스토리 코드를 반환해요', status: 200 },
  2002: { message: '삭제를 성공했어요', status: 200 },
  2003: { message: '코드 이름들을 가져왔어요', status: 200 },
  2004: { message: '코드를 가져왔어요', status: 200 },
  2005: { message: '코드를 성공적으로 넣었어요', status: 200 },
  2006: { message: '코드를 성공적으로 추가했어요', status: 200 },
  2007: { message: '토큰을 성공적으로 가져왔어요', status: 200 },
  2008: { message: '스토리 코드를 삭제했어요', status: 200 },
  2009: { message: '스토리를 성공적으로 수정했어요', status: 200 },

  4000: { message: '권한이 없어요', status: 401 },
  4001: { message: '적절한 쿼리가 들어오지 않았아요', status: 400 },
  4002: { message: '존재하지 않는 스토리예요', status: 404 },
  4003: { message: '존재하지 않는 파일이예요', status: 404 },
  4004: { message: '이미 존재하는 스토리예요', status: 400 },
  4005: { message: '존재하지 않는 파일이예요', status: 404 },
  4006: { message: '삭제할 코드가 없어요', status: 404 },
  4007: { message: '없는 코드를 지정하셨어요', status: 404 },
  4008: { message: '존재하지 않는 코드예요', status: 404 },
  4009: {
    message: '이미 같은 이름의 익명 코드가 존재해요. 이름을 바꾸시거나 실명으로 올려주세요',
    status: 400,
  },
  4010: { message: '이미 같은 이름의 코드가 존재해요', status: 400 },

  5000: { message: '데이터베이스에 문제가 생겼어요', status: 500 },
  5001: { message: '슬랙에 문제가 생겼어요', status: 500 },
};

export class CustomResponse<T = unknown> extends Error {
  customStatus: keyof typeof CustomResponseStatuses;

  body: Omit<T, 'message'> | null;

  constructor({
    customStatus,
    body,
  }: {
    customStatus: keyof typeof CustomResponseStatuses;
    body?: Omit<T, 'message'>;
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
    return reply.code(status).send({ ...body, message });
  }
  const { customStatus, body } = response;
  const { message, status } = CustomResponseStatuses[customStatus];
  return reply.code(status).send({ ...body, message });
};
