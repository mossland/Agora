import PropTypes from "prop-types";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import CloseIcon from "@mui/icons-material/Close";
import SelectCharacterModal from "./selectCharacterModal";
import { useState } from "react";

import LuniverseIcon from "../../components/icons/luniverseIcon";

const SelectNetworkModal = ({ open, handleClose }) => {
  const { login } = useAuth();

  const [wallet, setWallet] = useState(null);
  // Modal Logic
  const [isCharModalOpen, setCharModalOpen] = useState(false);
  const handleCharkModalOpen = () => {
    setCharModalOpen(true);
  };
  const handleCharkModalClose = () => {
    setCharModalOpen(false);
    handleClose();
  };

  async function connectLuniverseWallet() {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request access to accounts
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // Add Luniverse Mainnet as a custom network
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x100", // Hexadecimal representation of Chain ID 256
              chainName: "Luniverse Mainnet By Nodit",
              nativeCurrency: {
                name: "LUK",
                symbol: "LUK",
                decimals: 18,
              },
              rpcUrls: [`${import.meta.env.VITE_APP_LUNIVERSE_NODE_URL}`],
              blockExplorerUrls: ["https://scan.luniverse.io"],
            },
          ],
        });

        // Add MOC token
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: "0x878120A5C9828759A250156c66D629219F07C5c6",
              symbol: "MOC",
              decimals: 18,
            },
          },
        });

        // Get the selected address
        const walletAddress = window.ethereum.selectedAddress;
        setWallet(walletAddress);
        // Now you can use walletAddress to interact with Luniverse mainnet
        console.log("Connected to MetaMask with address:", walletAddress);
        const loginResult = await login(walletAddress);

        // if (true) {
        if (loginResult === "NO SUCH USER") {
          // Prompt the registration modal
          handleCharkModalOpen();
        } else {
          handleClose();
        }
      } catch (error) {
        // setError(error.toString());
        console.error(error);
      }
    } else {
      console.error("MetaMask not detected!");
    }
  }
  return (
    <>
      <SelectCharacterModal
        handleCloseNetworkModal={handleClose}
        wallet={wallet}
        open={isCharModalOpen}
        handleClose={handleCharkModalClose}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="select-network-modal-title"
        aria-describedby="select-network-modal-description"
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
            bgcolor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            //   border: 1.5,
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
              Select Network
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
            <Button
              onClick={() => connectLuniverseWallet()}
              variant="contained"
              startIcon={<LuniverseIcon />}
              sx={{
                mb: 2,
                width: "100%",
                height: "44px",
                color: "#FFFFFF",
                background: "#3568F5",
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
              luniverse mainnet
            </Button>
            {/* <Button
            variant="contained"
            sx={{
              mb: 2,
              width: "100%",
              height: "44px",
              color: "#FFFFFF",
              background: "#69583F",
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
            klaytn cypress
          </Button>
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
            ethereum mainnet
          </Button> */}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SelectNetworkModal;

SelectNetworkModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
