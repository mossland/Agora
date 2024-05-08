import { useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import useAuth from "../../hooks/useAuth";
import { fetchProfilePicture } from "../../utils/fetchProfilePicture";

const ChangeCharacterModal = ({
  open,
  handleClose,
  wallet,
  handleCloseNetworkModal,
}) => {
  const { register, login } = useAuth();

  const [nickname, setNickname] = useState(null);
  const [pfpSelected, setPfpSelected] = useState(null);

  const handleAvatarClick = (pfpId) => {
    setPfpSelected(pfpId);
  };

  async function handleRegister() {
    try {
      await register(wallet, nickname, pfpSelected);
      await login(wallet);
      handleCloseNetworkModal();
      handleClose();
    } catch (e) {}
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="select-character-modal-title"
      aria-describedby="select-character-modal-description"
      sx={{
        bgcolor: "rgba(255, 255, 255, 0)",
        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "#FFFFFF",
          border: 1.5,
          borderColor: "#000000",
          borderRadius: "8px",
        }}
      >
        <Box
          component="span"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#C8C4C5",
            borderBottom: 1.5,
            borderColor: "#000000",
            borderTopLeftRadius: "7px",
            borderTopRightRadius: "7px",
          }}
        >
          <Typography
            sx={{
              ml: 1,
              color: "#000000",
              fontWeight: "bold",
            }}
          >
            Select your character
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            p: 0,
            borderLeft: 1.5,
            borderColor: "#000000",
            borderRadius: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ mt: 1, p: 2 }}>
          <Box
            sx={{
              mb: 10,
              display: "flex",
              gap: 3,
            }}
          >
            {[1, 2, 3, 4].map((id) => (
              <Avatar
                key={id}
                src={fetchProfilePicture(id.toString())}
                onClick={() => handleAvatarClick(id.toString())}
                sx={{
                  width: "45px",
                  height: "45px",
                  border: 2,
                  borderColor:
                    pfpSelected === id.toString()
                      ? "#4CAF50"
                      : "#555555",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
                variant="square"
              />
            ))}
          </Box>
          {wallet && (
            <Button
              disabled={
                pfpSelected === null ||
                nickname === null ||
                nickname.trim() === ""
              }
              onClick={() => handleRegister()}
              variant="contained"
              sx={{
                mb: 2,
                width: "100%",
                height: "44px",
                color: "#FFFFFF",
                background: "#343434",
                border: 1.5,
                borderColor: "#000000",
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "18px",
                fontWeight: "bold",
                "&:hover": {
                  background: "#6C6C6C",
                },
              }}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangeCharacterModal;

ChangeCharacterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
