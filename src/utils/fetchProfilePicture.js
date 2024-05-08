import p1 from "../assets/profile/profile1.png";
import p2 from "../assets/profile/profile2.png";
import p3 from "../assets/profile/profile3.png";
import p4 from "../assets/profile/profile4.png";

/**
 * Fetches the profile picture based on the provided identifier.
 * @param {string} picId - The identifier for the profile picture.
 * @returns {string} - The path to the profile picture.
 */
export function fetchProfilePicture(picId) {
  switch (picId) {
    case "1":
      return p1;
    case "2":
      return p2;
    case "3":
      return p3;
    case "4":
      return p4;
    default:
      return "";
  }
}
