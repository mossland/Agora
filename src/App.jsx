import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./App.css";

import Layout from "./components/layout";
import Home from "./pages/home";
import Proposals from "./pages/proposals";
import ProposalDetails from "./pages/proposals/detail";
import Forum from "./pages/forum";
import ForumDetails from "./pages/forum/detail";
import Profile from "./pages/profile";
import NewProposal from "./pages/proposals/new";
import NewForum from "./pages/forum/new";

function App() {
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
            path="/proposals/new"
            element={
              <Layout>
                <NewProposal />
              </Layout>
            }
          />
          <Route
            path="/proposals/:id"
            element={
              <Layout>
                <ProposalDetails />
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
            path="/forum/:id"
            element={
              <Layout>
                <ForumDetails />
              </Layout>
            }
          />
          <Route
            path="/forum/new"
            element={
              <Layout>
                <NewForum />
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
