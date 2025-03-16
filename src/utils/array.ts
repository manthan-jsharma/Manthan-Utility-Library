/**
 * Chunks an array into smaller arrays of a specified size
 * @param array The array to chunk
 * @param size The size of each chunk
 * @returns Array of chunks
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};

/**
 * Removes duplicate values from an array
 * @param array The array to process
 * @returns Array with unique values
 */
export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

/**
 * Groups array items by a key
 * @param array The array to group
 * @param keyGetter Function to get the key for each item
 * @returns Object with groups
 */
export const groupBy = <T, K extends string | number | symbol>(
  array: T[],
  keyGetter: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((acc: Record<K, T[]>, item: T) => {
    const key = keyGetter(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
};

/**
 * Shuffles an array using the Fisher-Yates algorithm
 * @param array The array to shuffle
 * @returns Shuffled array
 */
export const shuffle = <T>(array: T[]): T[] => {
  const result: T[] = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/**
 * Finds the intersection of two arrays
 * @param a First array
 * @param b Second array
 * @returns Array with common elements
 */
export const intersection = <T>(a: T[], b: T[]): T[] => {
  const setB = new Set(b);
  return a.filter((x) => setB.has(x));
};

/**
 * Finds the difference between two arrays
 * @param a First array
 * @param b Second array
 * @returns Elements in a that are not in b
 */
export const difference = <T>(a: T[], b: T[]): T[] => {
  const setB = new Set(b);
  return a.filter((x) => !setB.has(x));
};

/**
 * Creates a range of numbers
 * @param start Start number
 * @param end End number
 * @param step Step value (default: 1)
 * @returns Array of numbers
 */
export const range = (start: number, end: number, step = 1): number[] => {
  const result: number[] = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
};

/**
 * Flattens a nested array
 * @param array The array to flatten
 * @returns Flattened array
 */

export const flatten = <T extends unknown[]>(array: (T | T[])[]): T[] => {
  const result: T[] = [];
  for (const val of array) {
    if (Array.isArray(val)) {
      result.push(...flatten(val as T[]));
    } else {
      result.push(val as T);
    }
  }
  return result;
};
