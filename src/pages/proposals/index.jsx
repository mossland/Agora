import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import requestHeaders from "../../utils/restClient";

import { Box, CircularProgress } from "@mui/material";
import AllProposals from "./components/allProposals";
[]
const Proposals = () => {
  const appHeaders = requestHeaders();
  const [approvedProposals, setApprovedProposals] = useState(null);
  const [proposalStats, setProposalStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (approvedProposals === null || proposalStats === null) {
        const [approvedResponse, statsResponse] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/approved-proposals`,
            { headers: appHeaders }
          ),
          axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/proposal-stats`, {
            headers: appHeaders,
          }),
        ]);
        setApprovedProposals(approvedResponse.data);
        setProposalStats(statsResponse.data);
      }
      } catch (error) {
        console.log(error);
        // Handle the error state appropriately here
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [appHeaders]);
  
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
        <Box sx={{ mt: 2 }}>
          <AllProposals proposals={approvedProposals} stats={proposalStats} />
          <Outlet />
        </Box>
      )}
    </>
  );
};

export default Proposals;
