const NAME_KEY = 'userName';
export const setUserNameToLocalStorage = (value: string) => localStorage.setItem(NAME_KEY, value);
export const getUserNameFormLocalStorage = () => localStorage.getItem(NAME_KEY);
