import { deleteCodeRequestValidate, DeleteCodeResponse } from '@codepocket/schema';
import { CodeInfo, PocketToken } from 'types';

interface DeleteCode<Response> {
  validateErrorFunc: () => Response;
  existCodeErrorFunc: () => Response;
  successResponseFunc: (body: DeleteCodeResponse) => Response;
  getUserName: (params: PocketToken) => Promise<string>;
  isExistCode: (params: CodeInfo) => Promise<boolean>;
  deleteCode: (params: CodeInfo) => Promise<void>;
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
