import PropTypes from "prop-types";
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
// Utils
import { fetchProfilePicture } from "../../../utils/fetchProfilePicture";
import { formatDate } from "../../../utils/formatDate";
import { formatWallet } from "../../../utils/formatWallet";
import requestHeaders from "../../../utils/restClient";

const Information = ({ user, userStats }) => {
  // Edit Logic
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user.nickname);

  const appHeaders = requestHeaders();

  const editUserNickname = async (uid) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/users/edit-nickname/${uid}`,
        { nickname: editedUsername },
        appHeaders
      );
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  };

  const editUserPFP = async (uid) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/users/edit-pfp/${uid}`,
        // { pfp: newlyChosenPFP },
        appHeaders
      );
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUsername(user.nickname); // Reset the username on cancel
  };

  const handleSave = async () => {
    await editUserNickname(user._id);
    setIsEditing(false);
  };

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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Paper
        elevation={5}
        sx={{
          maxWidth: { sm: 500, md: 300 },
          width: "100%",
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
        {user && (
          <Avatar
            sx={{ width: "100%", height: "auto", borderRadius: 2 }}
            src={fetchProfilePicture(user.profilePicture)}
            variant="rounded"
          ></Avatar>
        )}
        {user && (
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {isEditing ? (
                    <TextField
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                      size="small"
                      variant="outlined"
                    />
                  ) : (
                    <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
                      {user.nickname}
                    </Typography>
                  )}
                  <Chip
                    
                    label={isEditing ? "Confirm" : "Edit"}
                    component="button"
                    variant="outlined"
                    clickable
                    onClick={isEditing ? handleSave : handleEditClick}
                    sx={{
                      height: "19px",
                      fontSize: "12px",
                      color: isEditing ? "#FFFFFF" : "#808080",
                      backgroundColor: isEditing ? "#474747" : "#FFFFFF",
                      border: isEditing && "none",
                      borderRadius: "4px",
                      boxShadow: isEditing && "2px 2px 0px #000000",
                      "& .MuiChip-label": {
                        px: "5px",
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                    {formatWallet(user.walletAddress)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {user.createdAt && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        color: "#808080",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      JOINED
                    </Typography>
                    <Typography
                      sx={{
                        color: "#808080",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {formatDate(user.createdAt)}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{
                      color: "#808080",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    TOKENS
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {"992,501"} MOC
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{
                      color: "#808080",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    VIEWS
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {"241"}
                  </Typography>
                </Box>
                {user.lastSeen && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        color: "#808080",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      SEEN
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {getTimeDifference(user.lastSeen)}
                    </Typography>
                  </Box>
                )}
                {userStats && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        color: "#808080",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      VOTED ON
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {userStats.totalVotes} Proposals
                    </Typography>
                  </Box>
                )}
                {userStats && (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        color: "#808080",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      FIRST VOTE
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {formatDate(userStats.firstVote)}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box>
              <Button
                variant="contained"
                target="_blank"
                href={`https://scan.luniverse.io/accounts/${user.walletAddress}`}
                sx={{
                  mt: 3,
                  mb: 2,
                  width: "100%",
                  height: "44px",
                  color: "#000000",
                  background: "#FFFFFF",
                  border: 1.5,
                  borderColor: "#000000",
                  borderRadius: "8px",
                  boxShadow: "4px 4px 0px #000000",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "#CCCCCC",
                    boxShadow: "4px 4px 0px #000000",
                  },
                }}
              >
                LUNIVERSE SCAN
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Information;

Information.propTypes = {
  user: PropTypes.object,
  userStats: PropTypes.object,
};
