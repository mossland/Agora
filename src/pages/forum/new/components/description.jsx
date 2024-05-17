import PropTypes from "prop-types";
import { Avatar, Box, Chip, Paper, Typography } from "@mui/material";

import Markdown from "../../../../components/markdown/Markdown";

import { fetchProfilePicture } from "../../../../utils/fetchProfilePicture";
import { formatDate } from "../../../../utils/formatDate";
// import { getStatusStyle } from "../../../../utils/getStatusStyle";
import { getTagStyle } from "../../../../utils/getTagStyle";

const Description = ({ title, forumTags, descriptionValue }) => {
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
              src={fetchProfilePicture(pfp)}
              variant="square"
            />
            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              {nickname}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ color: "#808080", fontSize: "14px" }}>
              Created
              {formatDate(now)}
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

Description.propTypes = {
  title: PropTypes.string,
  forumTags: PropTypes.string,
  descriptionValue: PropTypes.string,
};
