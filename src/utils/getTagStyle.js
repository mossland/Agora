/**
 * Returns style object for tags based on the given status.
 * @param {string} status - The type of tag
 * @returns {Object} The style object with color and borderColor
 */
export const getTagStyle = (status) => {
  switch (status) {
    case "Project":
      return { color: "#009BB0", borderColor: "#009BB0" };
    case "Process":
      return { color: "#8DB100", borderColor: "#8DB100" };
    case "Informational":
      return { color: "#A55FFF", borderColor: "#A55FFF" };
    case "Core":
      return { color: "#DE00BA", borderColor: "#DE00BA" };
    default:
      return {};
  }
};
