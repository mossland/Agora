import PropTypes from "prop-types";
import { Box, Paper, Typography, Stack } from "@mui/material";

import { formatDate } from "../../../../utils/formatDate";

const Information = ({ startDate, endDate }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
              fontWeight: "bold",
            }}
          >
            Information
          </Typography>
        </Box>
        <Box sx={{ m: 2, display: "flex", alignItems: "flex-start", gap: 1 }}>
          <Box sx={{ width: "100%", textAlign: "left" }}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography
                sx={{ color: "#808080", fontSize: "14px", fontWeight: "bold" }}
              >
                START DATE
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                {startDate && formatDate(startDate.toDate())}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography
                sx={{ color: "#808080", fontSize: "14px", fontWeight: "bold" }}
              >
                END DATE
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                {endDate && formatDate(endDate.toDate())}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

Information.propTypes = {
  startDate: PropTypes.object, //to-do: check this
  endDate: PropTypes.object, //to-do: check this
};

export default Information;
