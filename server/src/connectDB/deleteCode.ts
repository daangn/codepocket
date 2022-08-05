import { deleteCodeRequestValidate, DeleteCodeResponse } from '@pocket/schema';

export interface GetUserNameParams {
  pocketToken: string;
}

export interface IsExistCodeParams {
  codeName: string;
  codeAuthor: string;
}

export interface DeleteCodeParams {
  codeName: string;
  codeAuthor: string;
}

interface DeleteCode<Response> {
  validateErrorFunc: () => Response;
  existCodeErrorFunc: () => Response;
  successResponseFunc: (body: DeleteCodeResponse) => Response;
  getUserName: (params: GetUserNameParams) => Promise<string>;
  isExistCode: (params: IsExistCodeParams) => Promise<boolean>;
  deleteCode: (params: DeleteCodeParams) => Promise<void>;
}

export default async <T, Response>(request: T, modules: DeleteCode<Response>) => {
  if (!deleteCodeRequestValidate(request)) throw modules.validateErrorFunc();
  const { pocketToken, codeName } = request.body;

  const codeAuthor = await modules.getUserName({ pocketToken });
  const existCode = await modules.isExistCode({ codeAuthor, codeName });
  if (!existCode) throw modules.existCodeErrorFunc();

  await modules.deleteCode({ codeAuthor, codeName });

  // const [postMessageError] = await to(
  //   postMessageToSlackAPI({
  //     slackBotToken: env.SLACK_BOT_TOKEN || '',
  //     channelId: existsCodeResponse._id?.uploadedChatChannel || '',
  //     threadTs: existsCodeResponse._id?.uploadedChatTimeStamp || '',
  //     text: `\`${codeAuthor}\`의 \`${codeName}\` 코드가 삭제되었어요!`,
  //   }),
  // );
  // if (postMessageError) throw new CustomResponse({ customStatus: 5001 });

  return modules.successResponseFunc({ message: '' });
};
