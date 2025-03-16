/**
 * Deep clones an object
 * @param obj The object to clone
 * @returns Cloned object
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  if (obj instanceof Object) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
    ) as unknown as T;
  }

  return obj;
};

/**
 * Picks specified properties from an object
 * @param obj The source object
 * @param keys The keys to pick
 * @returns New object with only the specified properties
 */
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Pick<T, K>);
};

/**
 * Omits specified properties from an object
 * @param obj The source object
 * @param keys The keys to omit
 * @returns New object without the specified properties
 */
export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>;
};

/**
 * Checks if a value is an object
 * @param item The value to check
 * @returns Whether the value is an object
 */
const isObject = (item: unknown): item is object => {
  return item !== null && typeof item === "object" && !Array.isArray(item);
};

/**
 * Merges objects deeply
 * @param target The target object
 * @param sources The source objects
 * @returns Merged object
 */
export const deepMerge = <T extends object>(
  target: T,
  ...sources: Partial<T>[]
): T => {
  if (!sources.length) return target;

  const source = sources.shift();
  if (source === undefined) return target;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject((source as any)[key])) {
        if (!target[key as keyof T]) {
          Object.assign(target, { [key]: {} });
        }
        deepMerge(
          target[key as keyof T] as object,
          (source as any)[key] as object
        );
      } else {
        Object.assign(target, { [key]: (source as any)[key] });
      }
    });
  }

  return deepMerge(target, ...sources);
};

/**
 * Flattens a nested object
 * @param obj The object to flatten
 * @param prefix The prefix for keys (default: '')
 * @returns Flattened object
 */
export const flattenObject = (
  obj: Record<string, any>,
  prefix = ""
): Record<string, any> => {
  return Object.keys(obj).reduce((acc, key) => {
    const pre = prefix.length ? `${prefix}.` : "";
    const value = obj[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, `${pre}${key}`));
    } else {
      acc[`${pre}${key}`] = value;
    }

    return acc;
  }, {} as Record<string, any>);
};

/**
 * Creates an object from entries
 * @param entries Array of key-value pairs
 * @returns Object created from entries
 */
export const fromEntries = <T = any>(
  entries: [string, any][]
): Record<string, T> => {
  return entries.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, T>);
};
