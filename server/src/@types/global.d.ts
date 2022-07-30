import mongoose from 'mongoose';

import { Code, Story, User } from '../schema';

declare module 'fastify' {
  export interface FastifyInstance {
    store: {
      User: mongoose.Model<User>;
      Code: mongoose.Model<Code>;
      Story: mongoose.Model<Story>;
      db: typeof mongoose;
    };
  }
}
