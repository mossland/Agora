import { useEffect, useState } from "react";
import { Box } from '@mui/material';
import AllProposals from "./components/allProposals";
import requestHeaders from "../../utils/restClient";
import axios from "axios";

const Proposals = () => {

  const appHeaders = requestHeaders();
  const [approvedProposals, setApprovedProposals] = useState(null);
  const [proposalStats, setProposalStats] = useState(null);

  // GET all proposals to render in table 
  useEffect(() => {
    if (approvedProposals === null) {
      getApprovedProposals();
    }
  }, [approvedProposals, appHeaders]);

  const getApprovedProposals = async () => {
    //setLoadingData(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/approved-proposals`,
        appHeaders
      );
      setApprovedProposals(response.data);
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

  return (
    <Box sx={{ mt: 2 }}>
      <AllProposals proposals={approvedProposals} stats={proposalStats} />
    </Box>
  );
};

export default Proposals;
