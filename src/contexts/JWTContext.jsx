import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { isValidToken, setSession } from "../utils/jwt";

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
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_BASE_URL}/login`,
      {
        signature: wallet
      }
    );

    const accessToken = response.data.token;
    const user = response.data;

    setSession(accessToken);
    localStorage.setItem("_id", user["_id"]);
    localStorage.setItem("wallet", user["walletAddress"]);
    localStorage.setItem("role", user["role"]);
    localStorage.setItem("profilePicture", user["profilePicture"]);

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

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
