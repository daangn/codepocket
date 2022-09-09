import { FastifyInstance } from 'fastify';

import * as codeModules from './code';
import * as storyModules from './story';
import * as userModules from './user';

type CurryingFunc = (server: FastifyInstance) => (param: any) => any;
type Modules<T> = { [key in keyof T]: CurryingFunc };
type UpdatedModules<T> = { [key in keyof T]: ReturnType<CurryingFunc> };

const parse = <T>(server: FastifyInstance, modules: Modules<T>) => {
  return Object.keys(modules).reduce((acc, key: string) => {
    acc[key] = modules[key](server);
    return acc;
  }, {} as UpdatedModules<T>);
};

export default (server: FastifyInstance) => ({
  CodeModule: parse(server, codeModules),
  StoryModule: parse(server, storyModules),
  UserModule: parse(server, userModules),
});
