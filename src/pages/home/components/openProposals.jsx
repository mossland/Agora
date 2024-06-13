import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Box, Button, List, ListItem, Paper, Typography } from "@mui/material";

import MIcon from "../../../components/icons/mSquareIcon";
import ProposalVotes from "./proposalVotes";

const OpenProposals = ({ ongoingProposals }) => {
  function getTimeDifference(timestamp) {
    // Get the current time in milliseconds
    const currentTime = new Date().getTime();

    // Convert the timestamp string to a Date object
    const targetTime = new Date(timestamp);

    // Calculate the time difference in milliseconds
    const timeDifference = targetTime - currentTime;

    // Check if the timestamp is in the future
    if (timeDifference > 0) {
      // Convert milliseconds to minutes
      const minutes = Math.floor(timeDifference / 60000);

      // If remaining time is greater than or equal to 1440 minutes (24 hours), show in days
      if (minutes >= 1440) {
        const days = Math.floor(minutes / 1440);
        return `ENDS IN ${days} DAY${days !== 1 ? "S" : ""}`;
      } else if (minutes >= 60) {
        // If remaining time is greater than or equal to 60 minutes, show in hours
        const hours = Math.floor(minutes / 60);
        return `ENDS IN ${hours} HOUR${hours !== 1 ? "S" : ""}`;
      } else {
        // Otherwise, show in minutes
        return `ENDS IN ${minutes} MINUTE${minutes !== 1 ? "S" : ""}`;
      }
    } else {
      return "ENDED";
    }
  }

  return (
    <Paper
      elevation={5}
      sx={{
        minWidth: { sm: 500, md: 500 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: 1.5,
        bgcolor: "#C4C4C4",
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
          Open Proposals
        </Typography>
      </Box>
      <Box sx={{ p: "5px" }}>
        <Typography
          sx={{ textAlign: "left", fontSize: "14px", fontWeight: "bold" }}
        >
          Proposals are created by the community and work as the consensus
          mechanism used to outline policies and changes to the Mossland
          ecosystem. Learn more about them here.
        </Typography>
      </Box>

      <List
        aria-labelledby=""
        sx={{
          m: "2px",
          py: 1,
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: 1.5,
          borderColor: "#000000",
          borderRadius: "8px",
        }}
      >
        {ongoingProposals && ongoingProposals.length === 0 && (
          <Typography>No ongoing proposals.</Typography>
        )}
        {ongoingProposals &&
          ongoingProposals.slice(0, 4).map((proposal) => (
            <ListItem
              key={proposal._id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <MIcon />
                <Box>
                  <Typography sx={{ fontSize: "14px" }}>
                    <strong>{proposal.title}</strong>
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={{ fontSize: "12px" }}>
                      By <strong>{proposal.proponent.nickname}</strong>
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>・</Typography>
                    <ProposalVotes proposal={proposal} />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Typography
                  sx={{
                    color: "#FF0000",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {getTimeDifference(proposal.endDate)}
                </Typography>
                <Button
                  variant="contained"
                  href={`/proposals/${proposal._id}`}
                  sx={{
                    px: 4,
                    py: 1,
                    width: "60px",
                    height: "22px",
                    color: "#000000",
                    background: "#DAFFD9",
                    border: 1.5,
                    borderColor: "#000000",
                    borderRadius: "5px",
                    boxShadow: "4px 4px 0px #000000",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: "bold",
                    "&:hover": {
                      background: "#E1FFE1",
                      boxShadow: "4px 4px 0px #000000",
                    },
                  }}
                >
                  VOTE
                </Button>
              </Box>
            </ListItem>
          ))}
      </List>
      {ongoingProposals && ongoingProposals.length >= 5 && (
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NavLink to="/proposals">
            <Button
              variant="contained"
              sx={{
                px: 4,
                py: 1,
                color: "white",
                background: "linear-gradient(#474747, #646464)",
                border: 1.5,
                borderColor: "#000000",
                borderRadius: "5px",
                boxShadow: "4px 4px 0px #000000",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  background:
                    "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(#474747, #646464)",
                  boxShadow: "4px 4px 0px #000000",
                },
              }}
            >
              VIEW MORE PROPOSALS
            </Button>
          </NavLink>
        </Box>
      )}
    </Paper>
  );
};

export default OpenProposals;

OpenProposals.propTypes = {
  ongoingProposals: PropTypes.array,
};
