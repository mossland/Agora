import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { isValidToken, setSession, handleTokenExpired } from "../utils/jwt";
import { Web3 } from "web3";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const userId = localStorage.getItem("_id");

          const config = {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: localStorage.getItem("accessToken"),
            },
          };

          const response = await axios.get(
            // `http://localhost:3000/user/${userId}`,
            `${import.meta.env.VITE_APP_API_BASE_URL}/user/${userId}`,
            config
          );
          const user = response.data;

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          const decoded = jwtDecode(accessToken);
          handleTokenExpired(decoded)
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (wallet) => {


    const ethereumProvider = window.ethereum;
    const web3 = new Web3(ethereumProvider);
    
    const signature = await web3.eth.personal.sign(
      import.meta.env.VITE_APP_SIGNING_MESSAGE,
      wallet,
      ''
    );
    
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_BASE_URL}/login`,
      {
        signature: signature,
        wallet: wallet
      }
    );

    // Check if user exists 

    if (response.data.userExists === false) {
      // Register the user 
      return "NO SUCH USER"
    }
    const accessToken = response.data.token;
    const user = response.data;

    setSession(accessToken);
    localStorage.setItem("_id", user["_id"]);
    localStorage.setItem("walletAddress", user["walletAddress"]);
    localStorage.setItem("role", user["role"]);
    localStorage.setItem("profilePicture", user["profilePicture"]);
    localStorage.setItem("nickname", user["nickname"]);

    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  const register = async (wallet, nickname, pfpSelected) => {

    const ethereumProvider = window.ethereum;
    const web3 = new Web3(ethereumProvider);
    
    const signature = await web3.eth.personal.sign(
      import.meta.env.VITE_APP_SIGNING_MESSAGE,
      wallet,
      ''
    );
    
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_BASE_URL}/register`,
      {
        wallet: wallet,
        signature: signature,
        nickname: nickname,
        pfp: pfpSelected
      }
    );

    const accessToken = response.data.token;
    const user = response.data;

    setSession(accessToken);
    localStorage.setItem("_id", user["_id"]);
    localStorage.setItem("walletAddress", user["walletAddress"]);
    localStorage.setItem("role", user["role"]);
    localStorage.setItem("profilePicture", user["profilePicture"]);
    localStorage.setItem("nickname", user["nickname"]);

    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
