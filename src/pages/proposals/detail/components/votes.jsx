import PropTypes from "prop-types";
import { Avatar, Box, List, ListItem, Paper, Typography } from "@mui/material";

import MIcon from "../../../../components/icons/mSquareIcon";

const Votes = ({ proposal, votes }) => {
  console.log(votes);
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
          <Box sx={{ m: 2, display: "flex", flexDirection: "column", gap: 1 }}>
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
                  <Typography>No votes on this proposal.</Typography>
                )}
                {votes.map((vote) => (
                  <ListItem
                    key={vote._id}
                    sx={{
                      bgcolor: "#FFFFFF",
                      borderRadius: "8px",
                    }}
                  >
                    <Avatar />
                    {vote.voter.nickname}
                    {vote.type}
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
