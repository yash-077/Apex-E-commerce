/**
 * Formats a numeric price into a currency string (USD).
 * @param {number} price - The price to format
 * @returns {string} Formatted price (e.g. $1,299.00)
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number') {
    price = parseFloat(price) || 0;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

/**
 * Truncates a string to a given length and appends an ellipsis.
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};
