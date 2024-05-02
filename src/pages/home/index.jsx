import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

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
  const [agorasHighlights, setAgorasHighlights] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get ongoing proposals
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // Fetch all data in parallel
        if (ongoingProposals === null || proposalStats === null || recentActivity === null || agorasHighlights === null) {
        const [ongoingResponse, statsResponse, activityResponse, agorasHighlightsResponse] =
          await Promise.all([
            axios.get(
              `${import.meta.env.VITE_APP_API_BASE_URL}/ongoing-proposals`,
              appHeaders
            ),
            axios.get(
              `${import.meta.env.VITE_APP_API_BASE_URL}/proposal-stats`,
              appHeaders
            ),
            axios.get(
              `${import.meta.env.VITE_APP_API_BASE_URL}/agora-activity`,
              appHeaders
            ),
            axios.get(
              `${import.meta.env.VITE_APP_API_BASE_URL}/agora-highlights`,
              appHeaders
            ),
          ]);
        // Update state with the fetched data
        setOngoingProposals(ongoingResponse.data);
        setProposalStats(statsResponse.data);
        setRecentActivity(activityResponse.data);
        setAgorasHighlights(agorasHighlightsResponse.data);
        }
      } catch (error) {
        console.log(error);
        // Handle error here if needed
      }
      setLoading(false); // Set loading to false after all fetches are done
    })();
  }, []);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Overview proposalStats={proposalStats} />
            <OpenProposals ongoingProposals={ongoingProposals} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <AgorasHighlights highlights={agorasHighlights}/>
            <RecentActivity activity={recentActivity} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Home;
