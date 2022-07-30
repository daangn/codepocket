import './config';

import cors from '@fastify/cors';
import { to } from 'await-to-js';
import fastify, { FastifyInstance as H } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import mongoose from 'mongoose';

import route from './router';
import { CodeSchema, StorySchema, UserSchema } from './schema';
import { env } from './utils/env';

const PORT = Number(process.env.PORT) || 8080;
const server: H<Server, IncomingMessage, ServerResponse> = fastify({ logger: true });

server.register(cors, () => {
  return (__, callback) => {
    const corsOptions = { origin: true };
    callback(null, corsOptions);
  };
});
server.register(route);
server.register(async () => {
  const [err, connection] = await to(
    mongoose.connect(env.MONGO_DB_URI || '', { dbName: env.MONGO_DB_NAME }),
  );
  if (err) throw err;
  server.decorate('store', {
    User: connection.model('User', UserSchema),
    Code: connection.model('Code', CodeSchema),
    Story: connection.model('Story', StorySchema),
    db: connection,
  });
});

const start = async () => {
  const [err] = await to(server.listen({ port: PORT }));
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
