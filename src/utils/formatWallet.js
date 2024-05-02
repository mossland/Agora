/**
 * Formats a wallet address to show only the first and last four characters.
 * @param {string} walletString - The full wallet address string.
 * @returns {string} - The formatted wallet address.
 */
export function formatWallet(walletString) {
    if (!walletString) return ""; // Handle potential null or undefined inputs
    return `${walletString.slice(0, 4)}...${walletString.slice(-4)}`;
  }