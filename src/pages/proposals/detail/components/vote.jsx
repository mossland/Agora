import PropTypes from "prop-types";
import { Box, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import requestHeaders from "../../../../utils/restClient";

const Vote = ({ proposal }) => {
  const userId = localStorage.getItem("_id");
  const appHeaders = requestHeaders();

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
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/vote/${proposal._id}`,
        {
          voter: userId,
          vote: "For",
        },
        appHeaders
      );
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  };

  const voteAgainst = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/vote/${proposal._id}`,
        {
          voter: userId,
          vote: "Against",
        },
        appHeaders
      );
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  };

  const voteAbstain = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/vote-proposal/${
          proposal._id
        }`,
        {
          voter: userId,
          vote: "Against",
        },
        appHeaders
      );
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
          <Box sx={{ mx: .5, my: 1, display: "flex", flexDirection: "column", gap: .5 }}>
            <Button
              disabled={
                computeApprovedStatus(proposal.startDate, proposal.endDate) ===
                "Ended"
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
                "&:hover": {},
              }}
            >
              FOR
            </Button>
            <Button
              disabled={
                computeApprovedStatus(proposal.startDate, proposal.endDate) ===
                "Ended"
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
                "&:hover": {},
              }}
            >
              AGAINST
            </Button>
            <Button
              disabled={
                computeApprovedStatus(proposal.startDate, proposal.endDate) ===
                "Ended"
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
                "&:hover": {},
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
