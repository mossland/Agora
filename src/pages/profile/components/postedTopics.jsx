import { useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";

import FlagIcon from "../../../components/icons/flagIcon";
import axios from "axios";
import requestHeaders from "../../../utils/restClient";

import { fetchProfilePicture } from "../../../utils/fetchProfilePicture";
import ForumLiking from "../../forum/components/forumLiking";
import ForumComments from "../../forum/components/forumComments";

const PostedTopics = ({ topics }) => {
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

  const userId = localStorage.getItem("_id");
  const appHeaders = requestHeaders();

  async function likeForumTopic(id) {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/like-forum/${id}/${userId}`,
        {},
        appHeaders
      );
      // setLiked(true)
      // setUnliked(false)
    } catch (error) {
      console.log(error);
    }
  }

  async function unlikeForumTopic(id) {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/unlike-forum/${id}/${userId}`,
        {},
        appHeaders
      );
      // setUnliked(true)
      // setLiked(false)
    } catch (error) {
      console.log(error);
    }
  }

  const [visibleCount, setVisibleCount] = useState(3); 
  const showMoreTopics = () => {
    setVisibleCount(topics.length);
  };

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
            Posted Topics
          </Typography>
        </Box>
        {topics && topics.length === 0 ? (
          <Box sx={{ my: 2 }}>
            <Typography>No posted topics.</Typography>
          </Box>
        ) : (
          <>
            <List
              aria-labelledby=""
              sx={{
                m: "2px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {topics.slice(0, visibleCount).map((topic) => (
                <ListItem
                  key={topic._id}
                  sx={{
                    bgcolor: "#FFFFFF",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          {topic.title}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography sx={{ fontSize: "14px" }}>
                            {getTimeDifference(topic.createdAt)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1.5 }}>
                        {topic.pinned && <FlagIcon />}
                        <ForumLiking forum={topic} />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: "24px",
                            height: "24px",
                            border: 1,
                            borderColor: "#000000",
                            borderRadius: 1,
                          }}
                          variant="square"
                          src={fetchProfilePicture(topic.author.profilePicture)}
                        />
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          {topic.author.nickname}
                        </Typography>
                        <Chip
                          label={topic.category}
                          variant="outlined"
                          sx={{
                            color: "#999999",
                            height: "19px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            borderColor: "#999999",
                            borderRadius: "4px",
                            "& .MuiChip-label": {
                              px: "5px",
                            },
                          }}
                        />
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 3 }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: "bold" }}
                          >
                            {topic.views}
                          </Typography>
                          <Typography sx={{ fontSize: "14px" }}>
                            Views
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 1 }}>
                         <ForumComments forum={topic}/>
                        </Box>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Typography
                            sx={{ fontSize: "14px", fontWeight: "bold" }}
                          >
                            {topic.likers.length}
                          </Typography>
                          <Typography sx={{ fontSize: "14px" }}>
                            Likes
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
            {topics && visibleCount < topics.length && (
              <Box
                sx={{
                  my: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={showMoreTopics}
                  variant="contained"
                  sx={{
                    px: 4,
                    py: 1,
                    color: "#000000",
                    background: "#FFFFFF",
                    border: 1.5,
                    borderColor: "#000000",
                    borderRadius: "5px",
                    boxShadow: "4px 4px 0px #000000",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      background: "#CCCCCC",
                      boxShadow: "4px 4px 0px #000000",
                    },
                  }}
                >
                  VIEW MORE TOPICS
                </Button>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default PostedTopics;

PostedTopics.propTypes = {
  topics: PropTypes.array,
};
