/**
 * Calculates the time difference from the given timestamp and returns a formatted string indicating how much time until it ends.
 * @param {string} timestamp - The timestamp to compare against the current time.
 * @returns {string} - A human-readable string describing how long until/since the timestamp.
 */
export function getTimeDifference(timestamp) {
    const currentTime = new Date().getTime();
    const targetTime = new Date(timestamp);
    const timeDifference = targetTime - currentTime;
  
    if (timeDifference > 0) {
      const minutes = Math.floor(timeDifference / 60000);
  
      if (minutes >= 1440) {
        const days = Math.floor(minutes / 1440);
        return `ENDS IN ${days} DAY${days !== 1 ? "S" : ""}`;
      } else if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        return `ENDS IN ${hours} HOUR${hours !== 1 ? "S" : ""}`;
      } else {
        return `ENDS IN ${minutes} MINUTE${minutes !== 1 ? "S" : ""}`;
      }
    } else {
      return "ENDED";
    }
  }