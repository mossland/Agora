import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./App.css";

import Layout from "./components/layout";
import Home from "./pages/home";
import Proposals from "./pages/proposals";
import Forum from "./pages/forum";
import Profile from "./pages/profile";

function App() {
  const [web3, setWeb3] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  async function initWeb3() {
    // Check if MetaMask is installed
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      try {
        // Request access to accounts
        const walletAddress = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWeb3(web3Instance);
        setWalletAddress(walletAddress)
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("MetaMask not detected!");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/proposals"
            element={
              <Layout>
                <Proposals />
              </Layout>
            }
          />
          <Route
            path="/forum"
            element={
              <Layout>
                <Forum />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
