import PropTypes from "prop-types";
import { Box, Paper, Typography } from "@mui/material";
import { formatDate, formatDateTime } from "../../../../utils/formatDate";

const Information = ({ proposal }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {proposal && (
        <Paper
          elevation={5}
          sx={{
            width: "300px",
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
              Information
            </Typography>
          </Box>
          <Box sx={{ m: 2, display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ textAlign: "left" }}>
              <Typography
                gutterBottom
                sx={{ color: "#808080", fontSize: "14px", fontWeight: "bold" }}
              >
                START DATE
              </Typography>
              <Typography
                gutterBottom
                sx={{ color: "#808080", fontSize: "14px", fontWeight: "bold" }}
              >
                END DATE
              </Typography>
            </Box>
            <Box sx={{}}>
              <Typography
                gutterBottom
                sx={{ fontSize: "14px", fontWeight: "bold" }}
              >
                {formatDateTime(proposal.startDate)}
              </Typography>
              <Typography
                gutterBottom
                sx={{ fontSize: "14px", fontWeight: "bold" }}
              >
                {formatDateTime(proposal.endDate)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Information;

Information.propTypes = {
  proposal: PropTypes.object,
};
