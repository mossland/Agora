import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import requestHeaders from "../../../../utils/restClient";

import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import Markdown from "../../../../components/markdown/Markdown";
import HeartIcon from "../../../../components/icons/hearchIcon";
import DotIcon from "../../../../components/icons/dotIcon";

import ReportKebabMenu from "../../../../components/kebabMenus/reportKebabMenu";
import ReportKebabMenuComment from "../../../../components/kebabMenus/reportKebabMenuComment";

import { formatDate, formatDateTime } from "../../../../utils/formatDate";
import { fetchProfilePicture } from "../../../../utils/fetchProfilePicture";
import FilledHeartIcon from "../../../../components/icons/filledHeartIcon";
import ReportTopicModal from "../../../../components/modals/reportTopicModal";
import ReportCommentModal from "../../../../components/modals/reportCommentModal";
import CommentLiking from "./commentLiking";

const Topic = ({ topic, topicComments }) => {
  console.log("HELLO");
  console.log(topic);

  const pfp = localStorage.getItem("profilePicture");

  const userId = localStorage.getItem("_id");

  const [commentText, setCommentText] = useState(null)

  console.log("MY ID", userId);

  const appHeaders = requestHeaders();

  async function postNewTopicComment() {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/comments/new`,
        {
          comment: commentText,
          commenter: userId,
          forumId: topic._id
        },
        appHeaders
      );
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  }

  const [liked, setLiked] = useState(false);
  const [unliked, setUnliked] = useState(false);

  async function likeForumTopic(id) {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/like-forum/${id}/${userId}`,
        {},
        appHeaders
      );
      setLiked(true);
      setUnliked(false);
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
      setUnliked(true);
      setLiked(false);
    } catch (error) {
      console.log(error);
    }
  }

  // Kebab Menu Logic
  const [generalAnchorEl, setGeneralAnchorEl] = useState(null);
  const generalOpen = Boolean(generalAnchorEl);

  const [reportAnchorEl, setReportAnchorEl] = useState(null);
  const [reportCommentAnchorEl, setReportCommentAnchorEl] = useState(null);
  const reportCommentOpen = Boolean(reportCommentAnchorEl);

  const handleGeneralMenuClick = (event) => {
    setGeneralAnchorEl(event.currentTarget);
  };

  const handleGeneralMenuClose = () => {
    setGeneralAnchorEl(null);
  };

  const handleReportCommentMenuClick = (event) => {
    setReportCommentAnchorEl(event.currentTarget);
  };

  const handleReportCommentMenuClose = () => {
    setReportCommentAnchorEl(null);
  };

  // Modal Logic - report topic
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  // const handleReportModalOpen = () => {
  //   setReportModalOpen(true);
  // };
  const handleOpenReportModal = () => {
    setReportModalOpen(true);
  };

  const handleReportModalClose = () => {
    setReportModalOpen(false);
  };

  // Modal Logic - report comment
  const [isReportCommentModalOpen, setReportCommentModalOpen] = useState(false);
  // const handleReportModalOpen = () => {
  //   setReportModalOpen(true);
  // };
  const handleOpenReportCommentModal = () => {
    setReportCommentModalOpen(true);
  };

  const handleReportCommentModalClose = () => {
    setReportCommentModalOpen(false);
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
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
            Topic
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
            gap: 2,
            textAlign: "left",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              gutterBottom
              sx={{ fontSize: "24px", fontWeight: "bold" }}
            >
              {topic.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {liked === false &&
                (!topic.likers.includes(userId) || unliked) && (
                  <HeartIcon onClick={() => likeForumTopic(topic._id)} />
                )}
              {unliked === false &&
                (topic.likers.includes(userId) || liked) && (
                  <FilledHeartIcon
                    onClick={() => unlikeForumTopic(topic._id)}
                  />
                )}
              <DotIcon onClick={handleGeneralMenuClick} />
              <ReportKebabMenu
                anchorEl={generalAnchorEl}
                open={generalOpen}
                handleClose={handleGeneralMenuClose}
                handleOpenReportModal={handleOpenReportModal}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              src={fetchProfilePicture(topic.author.profilePicture)}
              sx={{
                width: "24px",
                height: "24px",
                border: 1,
                borderColor: "#000000",
                borderRadius: 1,
              }}
              variant="square"
            />
            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              {topic.author.nickname}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip
                label={topic.category}
                variant="outlined"
                sx={{
                  height: "19px",
                  fontSize: "12px",
                  fontWeight: 600,
                  borderRadius: "4px",
                  "& .MuiChip-label": {
                    px: "5px",
                  },
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ fontSize: "14px" }}>
              Created {formatDate(topic.createdAt)}
            </Typography>
          </Box>
          <Markdown content={topic.contents} />
        </Box>

        <Box
          sx={{
            mx: 1,
            my: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <Avatar
              src={fetchProfilePicture(pfp)}
              sx={{
                width: "24px",
                height: "24px",
                mr: 2,
                border: 1,
                borderColor: "#000000",
                borderRadius: 1,
              }}
            />
            <TextField
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Post your comment"
              sx={{
                width: "100%",
                mr: 2,
                backgroundColor: "white",
                borderColor: "#000000",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderWidth: "1.5px",
                    borderColor: "#000000",
                  },
                  "&:hover fieldset": {
                    borderColor: "#000000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#000000",
                  },
                },
              }}
            />
          </Box>
          <Button
            onClick={() => postNewTopicComment()}
            variant="contained"
            disabled={commentText === null || commentText.trim() === ""}
            sx={{
              px: 4,
              py: 1,
              width: "200px",
              color: "white",
              background: "linear-gradient(#0148FF, #0B89FF)",
              border: 1.5,
              borderColor: "#000000",
              borderRadius: "5px",
              boxShadow: "4px 4px 0px #000000",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {},
            }}
          >
            POST
          </Button>
        </Box>

        <Box
          sx={{
            m: "2px",
            mb: 3,
            bgcolor: "#FFFFFF",
            border: 1.5,
            borderColor: "#000000",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            textAlign: "left",
          }}
        >
          {!topicComments && <CircularProgress />}
          {topicComments && topicComments.length === 0 && (
            <Typography sx={{ mt: 3 }}>
              This forum topic does not have any comments
            </Typography>
          )}
          {topicComments && topicComments.length > 0 && (
            <List sx={{ width: "100%" }}>
              {topicComments.map((comment) => (
                <ListItem key={comment._id} sx={{ mb: 0.5 }}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 3,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar
                        src={fetchProfilePicture(comment.author.profilePicture)}
                        sx={{
                          width: "24px",
                          height: "24px",
                          border: 1,
                          borderColor: "#000000",
                          borderRadius: 1,
                        }}
                        variant="square"
                      />

                      <Box>
                        <Typography
                          sx={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          {comment.author.nickname}
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                          <Typography sx={{ fontSize: "14px" }}>
                            {formatDateTime(comment.createdAt)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                          <Typography sx={{ fontSize: "14px" }}>
                            {comment.contents}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        {comment.likers && comment.likers.length}
                      </Typography>
                      <CommentLiking comment={comment} />
                      <DotIcon
                        width="15px"
                        height="15px"
                        onClick={handleReportCommentMenuClick}
                      />
                      <ReportKebabMenuComment
                        anchorEl={reportAnchorEl}
                        open={reportCommentOpen}
                        handleClose={handleReportCommentMenuClose}
                        handleOpenReportModal={handleOpenReportCommentModal}
                      />
                      <ReportCommentModal
                        open={isReportCommentModalOpen}
                        handleClose={handleReportCommentModalClose}
                        comment={comment}
                      />
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Paper>
      <ReportTopicModal
        open={isReportModalOpen}
        handleClose={handleReportModalClose}
        topic={topic}
      />
    </Box>
  );
};

export default Topic;

Topic.propTypes = {
  topic: PropTypes.object,
  topicComments: PropTypes.array,
};
