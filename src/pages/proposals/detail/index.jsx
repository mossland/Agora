import { Box, CircularProgress, Typography } from "@mui/material";

import Description from "./components/description";
import Vote from "./components/vote";
import Information from "./components/information";
import CurrentResult from "./components/currentResult";
import Votes from "./components/votes";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import requestHeaders from "../../../utils/restClient";
import axios from "axios";

const ProposalDetails = () => {
  const appHeaders = requestHeaders();
  const params = useParams();
  const proposalId = params.id;

  const [proposal, setProposal] = useState(null);
  const [proposalVotes, setProposalVotes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (proposal === null || proposalVotes === null) {
          const proposalResponse = axios.get(
            `${
              import.meta.env.VITE_APP_API_BASE_URL
            }/proposals/approved/${proposalId}`,
            { headers: appHeaders }
          );
          const votesResponse = axios.get(
            `${
              import.meta.env.VITE_APP_API_BASE_URL
            }/proposal-votes/${proposalId}`,
            { headers: appHeaders }
          );
          const [proposalData, votesData] = await Promise.all([
            proposalResponse,
            votesResponse,
          ]);

          setProposal(proposalData.data);
          setProposalVotes(votesData.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [proposalId, appHeaders]);

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
          <Box sx={{ flex: 1 }}>
            <Description proposal={proposal} />
            {!proposal && (
              <Typography sx={{ mt: 10 }}>
                Proposal not found. Please try again.
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Vote proposal={proposal} />
            <Information proposal={proposal} />
            <CurrentResult proposal={proposal} votes={proposalVotes} />
            <Votes proposal={proposal} votes={proposalVotes} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProposalDetails;
