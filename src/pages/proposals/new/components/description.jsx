import {
  Avatar,
  Box,
  Chip,
  Paper,
  Typography,
} from "@mui/material";

import Markdown from "../../../../components/markdown/Markdown";

import { fetchProfilePicture } from "../../../../utils/fetchProfilePicture";
import { formatDate } from "../../../../utils/formatDate";
import { getTagStyle } from "../../../../utils/getTagStyle";

const Description = ({ title, selectedProposalTag, descriptionValue, endDate }) => {
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

  const pfp = localStorage.getItem("profilePicture");
  const nickname = localStorage.getItem("nickname");
  const now = new Date();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#C4C4C4",
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
              // fontSize: "",
              fontWeight: "bold",
            }}
          >
            Description
          </Typography>
        </Box>
        <Box
          sx={{
            m: "2px",
            p: 2,
            bgcolor: "#FFFFFF",
            border: 1.5,
            borderColor: "#000000",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
            textAlign: "left",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              gutterBottom
              sx={{ fontSize: "24px", fontWeight: "bold" }}
            >
              {title}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip
                label="Upcoming"
                sx={{
                  px: 1,
                  height: "30px",
                  fontSize: "14px",
                  background: "none",
                  border: 1,
                  borderRadius: "4px",
                  "& .MuiChip-label": {
                    px: "5px",
                  },
                  ...getTagStyle(selectedProposalTag),
                }}
              />
              <Chip
                label={selectedProposalTag}
                sx={{
                  px: 1,
                  height: "30px",
                  fontSize: "14px",
                  background: "none",
                  border: 1,
                  borderRadius: "4px",
                  "& .MuiChip-label": {
                    px: "5px",
                  },
                  ...getTagStyle(selectedProposalTag),
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                width: "24px",
                height: "24px",
                border: 1,
                borderColor: "#000000",
                borderRadius: 1,
              }}
              src={fetchProfilePicture(pfp)}
              variant="square"
            />
            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              {nickname}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ color: "#FF0000", fontWeight: "bold" }}>
              {getTimeDifference(endDate)}
            </Typography>
            <Typography sx={{ color: "#808080", fontSize: "14px" }}>
              Created {formatDate(now)}
            </Typography>
          </Box>
          <Markdown content={descriptionValue} />
        </Box>
      </Paper>
    </Box>
  );
};

export default Description;
