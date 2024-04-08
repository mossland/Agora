import { Box, Button, Paper, Typography } from "@mui/material";

const Overview = ({proposalStats}) => {
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
          sx={{
            ml: 1,
            color: "#000000",
            // fontSize: "",
            fontWeight: "bold",
          }}
        >
          Overview
        </Typography>
      </Box>
      <Box
        component="span"
        sx={{
          m: "2px",
          height: "189px",
          display: "flex",
          alignItems: "center",
          border: 1.5,
          borderColor: "#000000",
          borderRadius: "8px",
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
          <Typography>PROPOSALS:</Typography>
         {proposalStats && <Typography>{proposalStats.approved} proposals</Typography>}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography>VOTES:</Typography>
          <Typography>{"259"} votes</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography>TREASURY:</Typography>
          <Typography>${"259"}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Overview;
