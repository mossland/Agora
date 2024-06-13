/**
 * Returns style object based on the status.
 * @param {string} status - The current status of an item
 * @returns {Object} The style object with color and backgroundColor
 */
export const getStatusStyle = (status) => {
  switch (status) {
    case "Ongoing":
      return { color: "#02AD3C", backgroundColor: "#CCEFD8" };
    case "Approved":
      return { color: "#006ED4", backgroundColor: "#CCE2F6" };
    case "Rejected":
      return { color: "#FF2869", backgroundColor: "#FFD4E1" };
    case "Extended":
      return { color: "#D48C00", backgroundColor: "#F6E8CC" };
    case "Review":
      return { color: "#2A00D4", backgroundColor: "#D4CCF6" };
    case "Ended":
      return { color: "#676767", backgroundColor: "#D5D5D5" };
    default:
      return {};
  }
};

export const getVoteStyle = (status) => {
  switch (status) {
    case "For":
      return { color: "#02AD3C", backgroundColor: "#CCEFD8" };
    case "Against":
      return { color: "#FF2869", backgroundColor: "#FFD4E1" };
    case "Abstain":
      return { color: "#D48C00", backgroundColor: "#F6E8CC" };
    default:
      return {};
  }
};

