export const filterDuplicate = (strings: string[]): string[] => [...new Set(strings)];

export const getExtensionFromFileName = (fileName: string) =>
  fileName.includes('.') ? fileName.split('.').pop() : null;

export const changeFirstToUpperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
