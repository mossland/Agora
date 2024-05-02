import PropTypes from "prop-types";
import { Box, Paper, Typography } from "@mui/material";

import brick from "../../../assets/images/brick.png";

const Overview = ({ proposalStats }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        minWidth: { sm: 500, md: 500 },
        display: "flex",
        flexDirection: "column",
        border: 1.5,
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
            // fontSize: "20px",
            fontFamily: "",
            fontWeight: "bold",
          }}
        >
          Overview
        </Typography>
      </Box>
      <Box
        component="img"
        src={brick}
        sx={{
          m: "2px",
          height: "189px",
          display: "flex",
          alignItems: "center",
          border: 1.5,
          borderColor: "#000000",
          borderRadius: "10px",
        }}
      ></Box>
      <Box
        component="span"
        sx={{
          m: "2px",
          height: "91px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          border: 1.5,
          borderColor: "#000000",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            PROPOSALS:
          </Typography>
          {proposalStats && (
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {proposalStats.approved} proposals
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            VOTES:
          </Typography>
          {proposalStats && (
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {proposalStats.votes} votes
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            TREASURY:
          </Typography>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            ${"259"}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Overview;

Overview.propTypes = {
  proposalStats: PropTypes.object,
};
