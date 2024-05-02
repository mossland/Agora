/**
 * Formats a date string into a readable date format without time.
 * @param {string} dateString - The ISO string or date string to format.
 * @returns {string} - The formatted date string.
 */
export function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    hour12: false,
  };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formatDateTime(dateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
