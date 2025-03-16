/**
 * Formats a number as currency
 * @param value The number to format
 * @param locale The locale to use for formatting (default: 'en-US')
 * @param currency The currency code (default: 'USD')
 * @returns Formatted currency string
 */
export const formatCurrency = (
  value: number,
  locale = "en-US",
  currency = "USD"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};

/**
 * Formats a date
 * @param date The date to format
 * @param options Intl.DateTimeFormatOptions
 * @param locale The locale to use (default: 'en-US')
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  locale = "en-US"
): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Formats a number with commas
 * @param value The number to format
 * @param locale The locale to use (default: 'en-US')
 * @returns Formatted number string
 */
export const formatNumber = (value: number, locale = "en-US"): string => {
  return new Intl.NumberFormat(locale).format(value);
};

/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes The file size in bytes
 * @param decimals The number of decimal places (default: 2)
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  );
};

/**
 * Truncates text to a specified length and adds an ellipsis
 * @param text The text to truncate
 * @param length The maximum length (default: 100)
 * @param ellipsis The ellipsis string (default: '...')
 * @returns Truncated text
 */
export const truncateText = (
  text: string,
  length = 100,
  ellipsis = "..."
): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + ellipsis;
};
