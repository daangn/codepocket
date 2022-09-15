const dependencyRegex =
  /import([ \n\t]*(?:[^ \n\t]+[ \n\t]*,?)?(?:[ \n\t]*(?:[ \n\t]*[^ \n\t"']+[ \n\t]*,?)+)?[ \n\t]*)from[ \n\t]*(['"])([^'"\n]+)(?:['"])/g;
export const getDependenciesFromText = (text: string) =>
  [...(text.match(dependencyRegex) || [])].map((dependency) => dependency.split("'")[1]);

export const removeExtension = (filename: string) => filename.split('.')[0];

export const getExtension = (filename: string) => filename.split('.').pop() || '';

export const convertFirstToUpperCase = <T extends string>(str: string) =>
  (str.slice(0, 1).toUpperCase() + str.slice(1)) as T;

export const checkWordInArray = (word: string, words: string[]) => words.includes(word);
