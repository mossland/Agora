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
import Web3 from "web3";
import { contractABIProposalVoting } from "../../../utils/contractInteraction";
import FinalResult from "./components/finalResult";

const ProposalDetails = () => {
  const token = localStorage.getItem("accessToken");
  const appHeaders = requestHeaders(token);
  const wallet = localStorage.getItem("walletAddress");

  const params = useParams();
  const proposalId = params.id;

  const [proposal, setProposal] = useState(null);
  const [proposalVotes, setProposalVotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [proposalLoading, setProposalLoading] = useState(true);

  const contractAddress = import.meta.env.VITE_APP_VOTING_CONTRACT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (proposal === null) {
          setProposalLoading(true); // Start loading for proposal data
          // Fetch on-chain proposal events

          if (wallet) {
            // Initialize web3 instance
            const web3 = new Web3(window.ethereum);

            // Create contract instance
            const contractObj = new web3.eth.Contract(
              contractABIProposalVoting,
              contractAddress.toString()
            );

            contractObj
              .getPastEvents("ProposalCreated", {
                fromBlock: 0,
                toBlock: "latest",
              })
              .then(async function (events) {
                const proposalResponse = await axios.get(
                  `${
                    import.meta.env.VITE_APP_API_BASE_URL
                  }/proposals/approved/${proposalId}`,
                  { headers: appHeaders }
                );
                setProposal(proposalResponse.data);
                setProposalLoading(false); // End loading for proposal data
                if (
                  proposalResponse.data.smartContractId == undefined ||
                  proposalResponse.data.smartContractId == null
                ) {
                  const matchingEvent = events.filter(
                    (i) =>
                      i.returnValues.proposalIdMongo ==
                      proposalResponse.data._id
                  );
                  console.log("MATCHING EVENT", matchingEvent);
                  if (matchingEvent.length === 1) {
                    // Patch the SC ID for this proposal
                    const scIDToPatch =
                      matchingEvent[0].returnValues.proposalId; // convert from 1n
                    await axios.patch(
                      `${
                        import.meta.env.VITE_APP_API_BASE_URL
                      }/proposals/patch-sc-id/${proposalResponse.data._id}`,
                      {
                        sc: Number(scIDToPatch),
                      },
                      appHeaders
                    );
                  }
                }

                const now = new Date();
                if (now >= proposalResponse.data.endDate && !proposalResponse.data.votingClosed ) {
                  console.log("close voting")
                  // Trigger close voting
                  await axios.patch(
                    `${
                      import.meta.env.VITE_APP_API_BASE_URL
                    }/proposals/close-voting/${proposalResponse.data._id}`,
                    {},
                    appHeaders
                  );
                }
              });
          } else {
            const proposalResponse = await axios.get(
              `${
                import.meta.env.VITE_APP_API_BASE_URL
              }/proposals/approved/${proposalId}`,
              { headers: appHeaders }
            );
            setProposal(proposalResponse.data);
            setProposalLoading(false); // End loading for proposal data
          }
        }
        if (proposalVotes === null) {
          const votesResponse = await axios.get(
            `${
              import.meta.env.VITE_APP_API_BASE_URL
            }/proposal-votes/${proposalId}`,
            { headers: appHeaders }
          );
          setProposalVotes(votesResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [proposalId, appHeaders]);

  const now = new Date()

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
      ) : proposalLoading ? (
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
      ) : proposal ? (
        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Description proposal={proposal} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Vote proposal={proposal} votes={proposalVotes} />
            <Information proposal={proposal} />
            <CurrentResult proposal={proposal} votes={proposalVotes} />
            <Votes proposal={proposal} votes={proposalVotes} />
          </Box>
        </Box>
      ) : (
        <Typography sx={{ mt: 10 }}>
          Proposal not found. Please try again.
        </Typography>
      )}
    </>
  );
};

export default ProposalDetails;
