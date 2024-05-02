import PropTypes from "prop-types";
import { Box, Paper, Stack, Typography } from "@mui/material";

import MIcon from "../../../../components/icons/mSquareIcon";

const CurrentResult = ({ proposal, votes }) => {
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
              Current Result
            </Typography>
          </Box>
          <Box sx={{ m: 2, gap: 1 }}>
            <Stack direction="row">
              <Typography
                sx={{ color: "#808080", fontSize: "14px", fontWeight: "bold" }}
              >
                FOR
              </Typography>
            </Stack>
            <Stack direction="row">
              <Typography
                sx={{ color: "#808080", fontSize: "14px", fontWeight: "bold" }}
              >
                AGAINST
              </Typography>
            </Stack>
            <Stack direction="row">
              <Typography
                sx={{ color: "#808080", fontSize: "14px", fontWeight: "bold" }}
              >
                ABSTAIN
              </Typography>
            </Stack>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default CurrentResult;

CurrentResult.propTypes = {
  proposal: PropTypes.object,
  votes: PropTypes.array,
};
