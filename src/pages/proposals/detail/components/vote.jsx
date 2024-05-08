import PropTypes from "prop-types";
import { Box, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import requestHeaders from "../../../../utils/restClient";
import useAuth from "../../../../hooks/useAuth";

const Vote = ({ proposal, votes }) => {
  const { isAuthenticated } = useAuth();
  const userId = localStorage.getItem("_id");
  const appHeaders = requestHeaders();

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

  const voteFor = async () => {
    try {
      //to-do: fetch user's MOC balance at time of vote
      await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/vote-proposal/${
          proposal._id
        }`,
        {
          initialMocBalance: null,
          voter: userId,
          vote: "For",
        },
        appHeaders
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  };

  const voteAgainst = async () => {
    try {
      //to-do: fetch user's MOC balance at time of vote
      await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/vote-proposal/${
          proposal._id
        }`,
        {
          initialMocBalance: null,
          voter: userId,
          vote: "Against",
        },
        appHeaders
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  };

  const voteAbstain = async () => {
    try {
      //to-do: fetch user's MOC balance at time of vote
      await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/vote-proposal/${
          proposal._id
        }`,
        {
          initialMocBalance: null,
          voter: userId,
          vote: "Abstain",
        },
        appHeaders
      );
      window.location.reload();
    } catch (error) {
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
            <Button
              disabled={
                userAlreadyVoted(userId) ||
                !isAuthenticated ||
                computeApprovedStatus(proposal.startDate, proposal.endDate) ===
                  "Ended" ||
                computeApprovedStatus(proposal.startDate, proposal.endDate) ===
                  "Upcoming"
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
                  "Upcoming"
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
                  "Upcoming"
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
};
