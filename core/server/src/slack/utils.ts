export const changeFirstToUpperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getExtensionFromFileName = (fileName: string) =>
  fileName.includes('.') ? fileName.split('.').pop() : null;
