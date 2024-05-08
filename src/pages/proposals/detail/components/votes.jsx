import PropTypes from "prop-types";
import { Avatar, Box, List, ListItem, Paper, Typography } from "@mui/material";

import { fetchProfilePicture } from "../../../../utils/fetchProfilePicture";

const Votes = ({ proposal, votes }) => {
  console.log(votes)
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
              Votes
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {votes && (
              <List
                aria-labelledby=""
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {votes.length === 0 && (
                  <Typography sx={{mb: 1, mt: 1}}>No votes on this proposal.</Typography>
                )}
                {votes.map((vote) => (
                  <ListItem
                    key={vote._id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: "24px",
                        height: "24px",
                        mr: 2,
                        border: 1,
                        borderColor: "#000000",
                        borderRadius: 1,
                      }}
                      src={fetchProfilePicture(proposal.proponent.profilePicture)}
                      variant="square"
                    />
                    <Typography
                      sx={{ flex: 1, fontSize: "14px", fontWeight: "bold" }}
                    >
                      {vote.voter.nickname}
                    </Typography>
                    <Typography
                      sx={{ flex: 1, fontSize: "14px", fontWeight: "bold" }}
                    >
                      {vote.type}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      x MOC
                    </Typography>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Votes;

Votes.propTypes = {
  proposal: PropTypes.object,
  votes: PropTypes.array,
};
