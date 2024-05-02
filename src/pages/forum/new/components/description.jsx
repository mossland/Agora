import PropTypes from "prop-types";
import { Avatar, Box, Button, Chip, Paper, Typography } from "@mui/material";

import MIcon from "../../../../components/icons/mCircleIcon";
import Markdown from "../../../../components/markdown/Markdown";

import { getTimeDifference } from "../../../../utils/getTimeDifference";
import { fetchProfilePicture } from "../../../../utils/fetchProfilePicture";
import { formatDate } from "../../../../utils/formatDate";
import { getStatusStyle } from "../../../../utils/getStatusStyle";
import { getTagStyle } from "../../../../utils/getTagStyle";
import HeartIcon from "../../../../components/icons/hearchIcon";
import DotIcon from "../../../../components/icons/dotIcon";

const Description = ({ title, forumTags, descriptionValue }) => {
  function computeApprovedStatus(startDate, endDate) {
    var now = new Date(); // Current timestamp
    startDate = new Date(startDate); // Convert start date to Date object
    endDate = new Date(endDate); // Convert end date to Date object

    if (now < startDate) {
      return "Upcoming";
    }

    if (now >= startDate && now <= endDate) {
      return "Ongoing";
    }

    if (now > endDate) {
      return "Ended";
    }
  }

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
            <Box>
              <HeartIcon />
              <DotIcon />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              label={forumTags}
              sx={{
                px: 1,
                height: "30px",
                fontSize: "14px",
                background: "#CECECE",
                borderRadius: "4px",
                "& .MuiChip-label": {
                  px: "5px",
                },
                ...getTagStyle(forumTags),
              }}
            />
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
              // src={fetchProfilePicture(proposal.proponent.profilePicture)}
              variant="square"
            />
            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              {/* {proposal.proponent.nickname} */}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ color: "#808080", fontSize: "14px" }}>
              Created
              {/* {formatDate(proposal.startDate)} */}
            </Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Markdown content={descriptionValue} />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Description;
