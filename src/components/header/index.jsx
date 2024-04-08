import { NavLink, Outlet } from "react-router-dom";
import { Avatar, Box, Button } from "@mui/material";

const linkStyle = {
  color: "#000000",
  fontSize: "24px",
  textDecoration: "none",
};

const activeStyle = {
  fontWeight: "bold",
};

function Header() {
  return (
    <>
      <Box
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
          <NavLink to="/profile">
            <Avatar
              sx={{
                bgcolor: "#C4C4C4",
                border: 1.5,
                borderColor: "#000000",
                borderRadius: 2,
              }}
              variant="square"
            />
          </NavLink>
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
            onClick={console.log("wallet connect")}
          >
            Connect Wallet
          </Button>
        </Box>
      </Box>
      <Outlet />
    </>
  );
}

export default Header;
