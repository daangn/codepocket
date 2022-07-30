const NAME_KEY = 'username';
export const setUsernameToLocalStorage = (value: string) => localStorage.setItem(NAME_KEY, value);
export const getUsernameFormLocalStorage = () => localStorage.getItem(NAME_KEY);
