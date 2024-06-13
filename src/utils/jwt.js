import axios from "axios";
import { jwtDecode } from "jwt-decode";

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp) => {
  let expiredTimer;

  const currentTime = Date.now();

  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Session expired. Please login again.');

    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("_id");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem("walletAddress");

  }, timeLeft);
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    const { exp, profilePicture } = jwtDecode(accessToken); // Assuming profilePicture is included in the token
    handleTokenExpired(exp);

    // Save the profile picture to local storage
    if (profilePicture) {
      localStorage.setItem("profilePicture", profilePicture);
    }
  } else {
    localStorage.removeItem("_id");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("role");
    localStorage.removeItem("nickname");
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession, handleTokenExpired };
