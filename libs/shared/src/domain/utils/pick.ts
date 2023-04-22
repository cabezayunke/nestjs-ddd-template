export const pick = (object: Record<string, any>, keys: string[]): Record<string, any> =>
  Object.keys(object).reduce((acc: Record<string, any>, k: string) => {
    if (keys.includes(k)) {
      return {
        ...acc,
        [k]: object[k],
      };
    }
    return acc;
  }, {} as Record<string, any>);

export const pickAs = (
  object: Record<string, any>,
  keys: string[],
  renamedKeys: string[],
): Record<string, any> => {
  if (keys.length !== renamedKeys.length) {
    throw new Error('Set the new names for all keys please');
  }
  const objectKeys = Object.keys(object);
  const INDEX_NOT_FOUND = -1;
  return objectKeys.reduce((acc: Record<string, any>, k: string) => {
    const i = keys.findIndex(e => e === k);
    if (i > INDEX_NOT_FOUND) {
      return {
        ...acc,
        [renamedKeys[i] as string]: object[k],
      };
    }
    return acc;
  }, {} as Record<string, any>);
};
