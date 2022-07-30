import { setupServer } from 'msw/node';

import * as handlers from './handlers';

const executedHandler = Object.values(handlers).map((handler) => handler());

const server = setupServer(...executedHandler);
export default server;
