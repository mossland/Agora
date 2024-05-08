import PropTypes from "prop-types";
import { Avatar, Box, List, ListItem, Paper, Typography } from "@mui/material";

import { fetchProfilePicture } from "../../../utils/fetchProfilePicture";

const RecentActivity = ({ activity }) => {
  function getTimeDifference(timestamp) {
    // Get the current time in milliseconds
    const currentTime = new Date().getTime();

    // Convert the timestamp string to a Date object
    const targetTime = new Date(timestamp);

    // Calculate the time difference in milliseconds
    const timeDifference = currentTime - targetTime;

    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);

    // Calculate the time elapsed in days, hours, and minutes
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor(((seconds % (3600 * 24)) % 3600) / 60);

    // Construct the output based on the time elapsed
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  }

  return (
    <Paper
      elevation={5}
      sx={{
        minWidth: { sm: 250, md: 400 },
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
          Recent Activity
        </Typography>
      </Box>

      {activity && (
        <List
          aria-labelledby=""
          sx={{
            m: "2px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {activity.slice(0, 10).map((a) => (
            <ListItem
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
              }}
              key={a._doc._id}
            >
              {a.type === "Comment" && (
                <>
                  <Avatar
                    src={fetchProfilePicture(a._doc.author.profilePicture)}
                    sx={{
                      width: "32px",
                      height: "32px",
                      border: 1,
                      borderColor: "#000000",
                      borderRadius: 1,
                    }}
                    variant="square"
                  />
                  <Box>
                    <Typography sx={{ fontSize: "16px" }}>
                      <strong>{a._doc.author.nickname}</strong> commented on{" "}
                      {""}
                      <strong>{a._doc.forumTopic.title}</strong>
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      {getTimeDifference(a._doc.createdAt)}
                    </Typography>
                  </Box>
                </>
              )}
              {a.type === "Vote" && (
                <>
                  <Avatar
                    src={fetchProfilePicture(a._doc.voter.profilePicture)}
                    sx={{
                      width: "32px",
                      height: "32px",
                      border: 1,
                      borderColor: "#000000",
                      borderRadius: 1,
                    }}
                    variant="square"
                  />
                  <Box>
                    <Typography sx={{ fontSize: "16px" }}>
                      <strong>{a._doc.voter.nickname}</strong> voted on {""}
                      <strong>{a._doc.associatedProposal.title}</strong>
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      {getTimeDifference(a._doc.createdAt)}
                    </Typography>
                  </Box>
                </>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default RecentActivity;

RecentActivity.propTypes = {
  activity: PropTypes.array,
};
