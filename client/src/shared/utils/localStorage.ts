const USER_NAME_KEY = 'userName';
const USER_TOKEN_KEY = 'userToken';

export const setUserNameToLocalStorage = (value: string) =>
  localStorage.setItem(USER_NAME_KEY, value);
export const getUserNameFormLocalStorage = () => localStorage.getItem(USER_NAME_KEY);

export const setUserTokenToLocalStorage = (value: string) =>
  localStorage.setItem(USER_TOKEN_KEY, value);
export const getUserTokenToLocalStorage = () => localStorage.getItem(USER_TOKEN_KEY);
