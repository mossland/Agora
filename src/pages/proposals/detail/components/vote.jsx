import PropTypes from "prop-types";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import requestHeaders from "../../../../utils/restClient";
import useAuth from "../../../../hooks/useAuth";
import { castVote } from "../../../../utils/contractInteraction";
import { useState } from "react";

const Vote = ({ proposal, votes }) => {
  const { isAuthenticated } = useAuth();
  const userId = localStorage.getItem("_id");
  const wallet = localStorage.getItem("walletAddress");
  const token = localStorage.getItem("accessToken");
  const appHeaders = requestHeaders(token);

  function userAlreadyVoted(id) {
    const voters = votes.map((i) => i.voter._id);
    if (voters.includes(id)) {
      return true;
    }
    return false;
  }

  function computeApprovedStatus(startDate, endDate) {
    var now = new Date(); // Current timestamp
    startDate = new Date(startDate); // Convert start date to Date object
    endDate = new Date(endDate); // Convert end date to Date object

    if (now < startDate) {
      return "Upcoming";
    }

    if (now >= startDate && now <= endDate) {
      return "Ongoing";
    }

    if (now > endDate) {
      return "Ended";
    }
  }

  const [noMocError, setNoMocError] = useState(false);
  const [txError, setTxError] = useState(false);

  const voteFor = async () => {
    try {
      setTxError(false);
      setNoMocError(false);
      //Fetch user's MOC balance
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/moc-balance/${wallet}`,
        { headers: appHeaders }
      );
      if (response.data.items.length === 0) {
        setNoMocError(true);
      } else {
        await castVote(wallet, proposal.smartContractId, "For");
        const humanReadableBalance =
          response.data.items[0].balance /
          10 ** response.data.items[0].contract.decimals;
        await axios.post(
          `${import.meta.env.VITE_APP_API_BASE_URL}/vote-proposal/${
            proposal._id
          }`,
          {
            initialMocBalance: humanReadableBalance,
            voter: userId,
            vote: "For",
          },
          appHeaders
        );
        window.location.reload();
      }
    } catch (error) {
      setTxError(true);
      console.log(error);
      //setError(true);
    }
  };

  const voteAgainst = async () => {
    try {
      setTxError(false);
      setNoMocError(false);
      //Fetch user's MOC balance
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/moc-balance/${wallet}`,
        { headers: appHeaders }
      );
      if (response.data.items.length === 0) {
        setNoMocError(true);
      } else {
        await castVote(wallet, proposal.smartContractId, "Against");
        const humanReadableBalance =
          response.data.items[0].balance /
          10 ** response.data.items[0].contract.decimals;
        await axios.post(
          `${import.meta.env.VITE_APP_API_BASE_URL}/vote-proposal/${
            proposal._id
          }`,
          {
            initialMocBalance: humanReadableBalance,
            voter: userId,
            vote: "Against",
          },
          appHeaders
        );
        window.location.reload();
      }
    } catch (error) {
      setTxError(true);
      console.log(error);
      //setError(true);
    }
  };

  const voteAbstain = async () => {
    try {
      setTxError(false);
      setNoMocError(false);
      //Fetch user's MOC balance
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/moc-balance/${wallet}`,
        { headers: appHeaders }
      );
      if (response.data.items.length === 0) {
        setNoMocError(true);
      } else {
        await castVote(wallet, proposal.smartContractId, "Abstain");
        const humanReadableBalance =
          response.data.items[0].balance /
          10 ** response.data.items[0].contract.decimals;
        await axios.post(
          `${import.meta.env.VITE_APP_API_BASE_URL}/vote-proposal/${
            proposal._id
          }`,
          {
            initialMocBalance: humanReadableBalance,
            voter: userId,
            vote: "Abstain",
          },
          appHeaders
        );
        window.location.reload();
      }
    } catch (error) {
      setTxError(true);
      console.log(error);
      //setError(true);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {proposal && (
        <Paper
          elevation={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            border: 1.5,
            bgcolor: "#FFFFFF",
            borderColor: "#000000",
            borderRadius: "10px",
            boxShadow: "4px 4px 0px #000000",
          }}
        >
          <Box
            component="span"
            sx={{
              m: "2px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              background: "linear-gradient(0.25turn, #86FFC6, #DAFFD9)",
              border: 1.5,
              borderColor: "#000000",
              borderRadius: "8px",
            }}
          >
            <Typography
              className="pixelify"
              sx={{
                ml: 1,
                color: "#000000",
                // fontSize: "",
                fontWeight: "bold",
              }}
            >
              Vote
            </Typography>
          </Box>
          <Box
            sx={{
              mx: 0.75,
              my: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {noMocError && (
              <Stack sx={{ maxWidth: "300px" }}>
                <Typography>
                  You have no MOC in your wallet. A non-negative MOC balance is
                  required to cast a vote.
                </Typography>
              </Stack>
            )}
            {txError && (
              <Stack sx={{ maxWidth: "300px" }}>
                <Typography>
                  A transaction error occurred. Please check the console for
                  logs and try again.
                </Typography>
              </Stack>
            )}
            <Button
              disabled={
                userAlreadyVoted(userId) ||
                !isAuthenticated ||
                computeApprovedStatus(proposal.startDate, proposal.endDate) ===
                  "Ended" ||
                computeApprovedStatus(proposal.startDate, proposal.endDate) ===
                  "Upcoming" ||
                proposal.smartContractId === null ||
                proposal.smartContractId === undefined
              }
              onClick={() => voteFor()}
              variant="contained"
              sx={{
                px: 4,
                py: 1,
                color: "#000000",
                background: "#00E024",
                border: 1.5,
                borderColor: "#000000",
                borderRadius: "5px",
                boxShadow: "4px 4px 0px #000000",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  background: "#33E550",
                  boxShadow: "4px 4px 0px #000000",
                },
              }}
            >
              FOR
            </Button>
            <Button
              disabled={
                userAlreadyVoted(userId) ||
                !isAuthenticated ||
                computeApprovedStatus(proposal.startDate, proposal.endDate) ===
                  "Ended" ||
                computeApprovedStatus(proposal.startDate, proposal.endDate) ===
                  "Upcoming" ||
                proposal.smartContractId === null ||
                proposal.smartContractId === undefined
              }
              onClick={() => voteAgainst()}
              variant="contained"
              sx={{
                color: "#000000",
                background: "#FF0000",
                border: 1.5,
                borderColor: "#000000",
                borderRadius: "5px",
                boxShadow: "4px 4px 0px #000000",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  background: "#FF3333",
                  boxShadow: "4px 4px 0px #000000",
                },
              }}
            >
              AGAINST
            </Button>
            <Button
              disabled={
                userAlreadyVoted(userId) ||
                !isAuthenticated ||
                computeApprovedStatus(proposal.startDate, proposal.endDate) ===
                  "Ended" ||
                computeApprovedStatus(proposal.startDate, proposal.endDate) ===
                  "Upcoming" ||
                proposal.smartContractId === null ||
                proposal.smartContractId === undefined
              }
              onClick={() => voteAbstain()}
              variant="contained"
              sx={{
                px: 4,
                py: 1,
                color: "#000000",
                background: "#FCC500",
                border: 1.5,
                borderColor: "#000000",
                borderRadius: "5px",
                boxShadow: "4px 4px 0px #000000",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  background: "#FDD133",
                  boxShadow: "4px 4px 0px #000000",
                },
              }}
            >
              ABSTAIN
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Vote;

Vote.propTypes = {
  proposal: PropTypes.object,
  votes: PropTypes.array,
};
