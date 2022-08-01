import { afterAll, afterEach, beforeAll } from 'vitest';

import server from './__mocks__/server';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
