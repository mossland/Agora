import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import Overview from "./components/overview";
import OpenProposals from "./components/openProposals";
import AgorasHighlights from "./components/agorasHighlights";
import RecentActivity from "./components/recentActivity";
import requestHeaders from "../../utils/restClient";
import axios from "axios";

const Home = () => {

  const appHeaders = requestHeaders();
  const [ongoingProposals, setOngoingProposals] = useState(null);
  const [proposalStats, setProposalStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState(null);

  // Get ongoing proposals

  useEffect(() => {
    if (ongoingProposals === null) {
      getOngoingProposals();
    }
  }, [ongoingProposals, appHeaders]);

  const getOngoingProposals = async () => {
    //setLoadingData(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/ongoing-proposals`,
        appHeaders
      );
      setOngoingProposals(response.data);
      //setLoadingData(false);
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  };

  // GET proposal stats
  useEffect(() => {
    if (proposalStats === null) {
      getProposalStats();
    }
  }, [proposalStats, appHeaders]);

  const getProposalStats = async () => {
    //setLoadingData(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/proposal-stats`,
        appHeaders
      );
      setProposalStats(response.data);
      //setLoadingData(false);
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  };

  // Get activity
  // GET all forum topics to render in table 
  useEffect(() => {
    if (recentActivity === null) {
      getRecentActivity();
    }
  }, [recentActivity, appHeaders]);

  const getRecentActivity = async () => {
    //setLoadingData(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/agora-activity`,
        appHeaders
      );
      console.log(response.data)
      setRecentActivity(response.data);
      //setLoadingData(false);
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  };

  return (
    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Overview proposalStats={proposalStats}/>
        <OpenProposals ongoingProposals={ongoingProposals} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <AgorasHighlights />
        <RecentActivity activity={recentActivity} />
      </Box>
    </Box>
  );
};

export default Home;
