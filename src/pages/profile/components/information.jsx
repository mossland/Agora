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
import ChangeCharacterModal from "../../../components/modals/changeCharacterModal";

const Information = ({ user, userStats, userTokens }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, // No decimal places
    maximumFractionDigits: 2, // No decimal places
  });

  // Function to format number without currency symbol
  function formatWithoutCurrency(value) {
    // Format the value as currency
    let formatted = formatter.format(value);

    // Remove the currency symbol (assumes the currency symbol is at the start)
    formatted = formatted.replace("$", "").trim();

    return formatted;
  }

  // Edit Logic
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user.nickname);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  const isChanged =
    editedUsername !== user.nickname || profilePicture !== user.profilePicture;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleProfilePictureChange = (newProfilePicture) => {
    setProfilePicture(newProfilePicture);
  };

  const handleChipClick = () => {
    if (isEditing) {
      if (isChanged) {
        handleSave();
      } else {
        handleCancel();
      }
    } else {
      handleEditClick();
    }
  };
  const handleCancel = () => {
    setEditedUsername(user.nickname);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (isChanged) {
      await editUserNickname(user._id);
      localStorage.setItem("profilePicture", profilePicture);
      window.location.reload();
    }
    setIsEditing(false);
  };
  const token = localStorage.getItem("accessToken");
  const appHeaders = requestHeaders(token);

  const editUserNickname = async (uid) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/users/edit-nickname/${uid}`,
        { nickname: editedUsername, profilePicture: profilePicture },
        appHeaders
      );
    } catch (error) {
      console.log(error);
      //setError(true);
    }
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

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
              fontWeight: "bold",
            }}
          >
            Information
          </Typography>
        </Box>
        {user && (
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{
                width: "98%",
                height: "auto",
                borderRadius: 2,
                outline: isEditing && "150px solid rgba(250, 250, 250, 0.65)",
                outlineOffset: "-150px",
                bgcolor: "#C4C4C4",
                border: 0.5,
                borderColor: "#000000",
                ml: 0.25,
              }}
              src={fetchProfilePicture(profilePicture)}
              variant="rounded"
            />
            {isEditing && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Button
                  onClick={openModal}
                  sx={{
                    color: "#000000",
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: 1,
                    borderRadius: 1,
                  }}
                >
                  Change My PFP
                </Button>
              </Box>
            )}
          </Box>
        )}
        <ChangeCharacterModal
          open={isModalOpen}
          handleClose={handleClose}
          onProfilePictureChange={handleProfilePictureChange}
        />
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
                    label={
                      isEditing ? (isChanged ? "Confirm" : "Close") : "Edit"
                    }
                    component="button"
                    variant="outlined"
                    clickable
                    onClick={handleChipClick}
                    sx={{
                      height: "19px",
                      fontSize: "12px",
                      color: isEditing ? "#FFFFFF" : "#808080",
                      backgroundColor: isEditing
                        ? isChanged
                          ? "#474747"
                          : "#474747"
                        : "#FFFFFF",
                      border: isEditing && "none",
                      borderRadius: "4px",
                      boxShadow: isEditing && "2px 2px 0px #000000",
                      "& .MuiChip-label": {
                        px: "5px",
                      },
                      "&:hover": {
                        backgroundColor: "#6C6C6C !important",
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
                {userTokens !== undefined && userTokens !== null && (
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
                      TOKENS
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {formatWithoutCurrency(userTokens)} MOC
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
                    VIEWS
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {user.views}
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
                {user.firstVote && (
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
                      {formatDate(user.firstVote)}
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
  userToken: PropTypes.any,
};
