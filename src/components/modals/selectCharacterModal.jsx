import PropTypes from "prop-types";
import { Box, Button, IconButton, Modal, Typography, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const SelectCharacterModal = ({ open, handleClose }) => {
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
          bgcolor: "rgba(255, 255, 255, 0.2)", //to-do: fix
          border: 1.5,
          borderColor: "#000000",
          borderRadius: "8px",
        }}
      >
        <Box
          component="span"
          sx={{
            // height: "38px",
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
          <TextField
            aria-label="Write your name"
            multiline
            rows={8}
            placeholder="Write your name"
            // onChange={}
            variant="outlined"
            required
          />
          <Button
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
                background: "#",
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SelectCharacterModal;

SelectCharacterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};