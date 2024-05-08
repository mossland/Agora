import { NavLink, Outlet } from "react-router-dom";
import { Avatar, Box, Button } from "@mui/material";
import { useState } from "react";

// Utils
import { fetchProfilePicture } from "../../utils/fetchProfilePicture";
import { formatWallet } from "../../utils/formatWallet";

import DisconnectKebabMenu from "../kebabMenus/disconnectKebabMenu";
import SelectNetworkModal from "../modals/selectModalNetwork";

const linkStyle = {
  color: "#000000",
  fontSize: "24px",
  textDecoration: "none",
};

const activeStyle = {
  fontWeight: "bold",
};

function Header() {

  const role = localStorage.getItem("role");
  const pfp = localStorage.getItem("profilePicture");
  const wallet = localStorage.getItem("walletAddress");


  // Modal Logic
  const [isNetworkModalOpen, setNetworkModalOpen] = useState(false);
  const handleNetworkModalOpen = () => {
    setNetworkModalOpen(true);
  };
  const handleNetworkModalClose = () => {
    setNetworkModalOpen(false);
  };

  // kebab Menu Logic
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        className="pixelify"
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component="nav"
          sx={{
            display: "flex",
            gap: "35px",
          }}
        >
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/proposals"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            PROPOSALS
          </NavLink>
          <NavLink
            to="/forum"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            FORUM
          </NavLink>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "5px",
          }}
        >
          {role === "Admin" && (
            <Button
              sx={{
                px: 3,

                mr: 2,
                color: "#FFFFFF",
                fontWeight: "bold",
                bgcolor: "#474747",
                border: 1.5,
                borderColor: "#000000",
                borderRadius: 2,
                boxShadow: "3px 3px 0px #000000",
                "&:hover": {
                  background: "#6C6C6C",
                  boxShadow: "3px 3px 0px #000000",
                },
              }}
              onClick={() => console.log("Redirect to admin")}
            >
              Admin
            </Button>
          )}
          {wallet && (
            <NavLink to="/profile">
              <Avatar
                sx={{
                  bgcolor: "#C4C4C4",
                  border: 1.5,
                  borderColor: "#000000",
                  borderRadius: 2,
                }}
                src={fetchProfilePicture(pfp)}
                variant="square"
              />
            </NavLink>
          )}
          {!wallet && (
            <>
              <Button
                sx={{
                  px: 3,
                  color: "#000000",
                  fontWeight: "bold",
                  bgcolor: "#00FFC2",
                  border: 1.5,
                  borderColor: "#000000",
                  borderRadius: 2,
                  boxShadow: "4px 4px 0px #000000",
                }}
                // onClick={() => handleConnectWallet()}
                onClick={handleNetworkModalOpen}
              >
                Connect Wallet
              </Button>
              <SelectNetworkModal
                open={isNetworkModalOpen}
                handleClose={handleNetworkModalClose}
              />
            </>
          )}
          {wallet && (
            <>
              <Button
                sx={{
                  px: 3,
                  color: "#000000",
                  fontWeight: "bold",
                  bgcolor: "#C4C4C4",
                  border: 1.5,
                  borderColor: "#000000",
                  borderRadius: 2,
                }}
                onClick={handleMenuClick}
              >
                {formatWallet(wallet)}
              </Button>
              <DisconnectKebabMenu
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
              />
            </>
          )}
        </Box>
      </Box>
      <Outlet />
    </>
  );
}

export default Header;
