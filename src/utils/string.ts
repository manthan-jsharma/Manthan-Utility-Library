/**
 * Converts a string to camelCase
 * @param str The string to convert
 * @returns Camel case string
 */
export const camelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "")
    .replace(/[-_]/g, "");
};

/**
 * Converts a string to PascalCase
 * @param str The string to convert
 * @returns Pascal case string
 */
export const pascalCase = (str: string): string => {
  const camel = camelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
};

/**
 * Converts a string to kebab-case
 * @param str The string to convert
 * @returns Kebab case string
 */
export const kebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace(/_/g, "-")
    .toLowerCase();
};

/**
 * Converts a string to snake_case
 * @param str The string to convert
 * @returns Snake case string
 */
export const snakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .replace(/-/g, "_")
    .toLowerCase();
};

/**
 * Capitalizes the first letter of a string
 * @param str The string to capitalize
 * @returns Capitalized string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Reverses a string
 * @param str The string to reverse
 * @returns Reversed string
 */
export const reverseString = (str: string): string => {
  return str.split("").reverse().join("");
};

/**
 * Counts occurrences of a substring in a string
 * @param str The string to search in
 * @param searchValue The substring to search for
 * @returns Number of occurrences
 */
export const countOccurrences = (str: string, searchValue: string): number => {
  return str.split(searchValue).length - 1;
};

/**
 * Generates a random string
 * @param length The length of the string (default: 10)
 * @param chars The characters to use (default: alphanumeric)
 * @returns Random string
 */
export const randomString = (
  length = 10,
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
): string => {
  let result = "";
  const charsLength = chars.length;

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }

  return result;
};

/**
 * Escapes HTML special characters
 * @param html The HTML string to escape
 * @returns Escaped HTML string
 */
export const escapeHtml = (html: string): string => {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * Unescapes HTML special characters
 * @param html The HTML string to unescape
 * @returns Unescaped HTML string
 */
export const unescapeHtml = (html: string): string => {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
};
