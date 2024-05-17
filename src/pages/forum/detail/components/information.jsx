import PropTypes from "prop-types";
import { Box, Paper, Stack, Typography } from "@mui/material";

const Information = ({ topic, topicComments }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
        <Box
          sx={{
            m: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography
              gutterBottom
              sx={{ color: "#808080", fontSize: "14px", fontWeight: "bold" }}
            >
              LIKES
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              {topic.likers.length}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography
              gutterBottom
              sx={{ color: "#808080", fontSize: "14px", fontWeight: "bold" }}
            >
              COMMENTS
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              {topicComments.length}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography
              gutterBottom
              sx={{ color: "#808080", fontSize: "14px", fontWeight: "bold" }}
            >
              VIEWS
            </Typography>
            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              {topic.views}
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default Information;

Information.propTypes = {
  topic: PropTypes.object,
  topicComments: PropTypes.array,
};
