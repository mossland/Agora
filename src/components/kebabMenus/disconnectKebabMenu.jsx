import PropTypes from "prop-types";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DisconnectKebabMenu = ({ anchorEl, open, handleClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function logoutt() {
    try {
      // Disconnect from MetaMask provider
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error disconnecting from MetaMask:", error);
    }
  }

  const handleWalletLogout = () => {
    logoutt();
    handleClose();
  };

  return (
    <Menu
      elevation={2}
      id="disconnect-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{
        "& .MuiPaper-root": {
          border: 1.5,
          borderColor: "000000",
          minWidth: "150px",
          px: 1,
        },
      }}
    >
      <MenuItem
        sx={{ color: "red", fontWeight:"bold", borderRadius: "3px" }}
        onClick={() => handleWalletLogout()}
      >
        Disconnect
      </MenuItem>
    </Menu>
  );
};

export default DisconnectKebabMenu;

DisconnectKebabMenu.propTypes = {
  anchorEl: PropTypes.any,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
