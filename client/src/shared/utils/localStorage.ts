const keys = {
  USER_TOKEN_KEY: 'userToken',
  USER_ID: 'userId',
} as const;

const store = {
  set<T>(key: string, value: T) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  get<T>(key: string): T | null {
    const item = window.localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item);
    } catch {
      return item as unknown as T;
    }
  },
  remove(key: string) {
    window.localStorage.removeItem(key);
  },
} as const;

export const localStorage = {
  setUserToken: (userToken: string) => store.set<string>(keys.USER_TOKEN_KEY, userToken),
  getUserToken: () => store.get<string>(keys.USER_TOKEN_KEY),
  setUserId: (userId: string) => store.set<string>(keys.USER_ID, userId),
  getUserId: () => store.get<string>(keys.USER_ID),
} as const;
