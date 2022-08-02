const keys = {
  USER_TOKEN_KEY: 'userToken',
} as const;

const store = {
  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get<T>(key: string): T {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : '';
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
} as const;

export default {
  setUserToken: (userToken: string) => store.set<string>(keys.USER_TOKEN_KEY, userToken),
  getUserToken: () => store.get<string>(keys.USER_TOKEN_KEY),
} as const;
