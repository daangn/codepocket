const dependencyRegex = /(?<=import.+(from.+'|')).+(?=')/g;
export const getDependenciesFromText = (text: string) => [...(text.match(dependencyRegex) || [])];

export const removeExtension = (filename: string) => filename.split('.')[0];

export const getExtension = (filename: string) => filename.split('.').pop() || '';

export const convertFirstToUpperCase = <T extends string>(str: string) =>
  (str.slice(0, 1).toUpperCase() + str.slice(1)) as T;
