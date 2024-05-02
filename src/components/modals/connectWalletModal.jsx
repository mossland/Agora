import PropTypes from "prop-types";
import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ConnectWalletModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="connect-wallet-modal-title"
      aria-describedby="connect-wallet-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Network
          </Typography>
          <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
        </Box>
        <Button
          variant="contained"
          //   startIcon={<Icon>add</Icon>}
          sx={{ marginY: 1, justifyContent: "flex-start" }}
        >
          Luniverse mainnet
        </Button>
        <Button
          variant="contained"
          //   startIcon={<Icon>add</Icon>}
          sx={{ marginY: 1, justifyContent: "flex-start" }}
        >
          Klaytn cypress
        </Button>
        <Button
          variant="contained"
          //   startIcon={<Icon>add</Icon>}
          sx={{ marginY: 1, justifyContent: "flex-start" }}
        >
          Ethereum mainnet
        </Button>
      </Box>
    </Modal>
  );
};

export default ConnectWalletModal;

ConnectWalletModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};