import { Avatar, Box, Button, Chip, Paper, Typography } from "@mui/material";

const Information = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Paper
        elevation={5}
        sx={{
          minWidth: { sm: 500, md: 300 },
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
        <Avatar
          sx={{ width: "100%", height: "auto", borderRadius: 2 }}
          variant="rounded"
        ></Avatar>
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
                <Typography>{"Chelsea"}</Typography>
                <Chip
                  label="Edit"
                  component="a"
                  href="#basic-chip"
                  variant="outlined"
                  clickable
                  sx={{
                    height: "19px",
                    fontSize: "12px",
                    borderRadius: "4px",
                    "& .MuiChip-label": {
                      px: "5px",
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography>{"0x349...dk334"}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">JOINED</Typography>
                <Typography variant="body2">{"Nov 29, 2023"}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">TOKENS</Typography>
                <Typography variant="body2">{"992,501"} MOC</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">VIEWS</Typography>
                <Typography variant="body2">{"241"}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">SEEN</Typography>
                <Typography variant="body2">{"18 Hours"} ago</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">VOTED ON</Typography>
                <Typography variant="body2">{"18"} Proposals</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">VOTING POWER</Typography>
                <Typography variant="body2">{"62,152"}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">FIRST VOTE</Typography>
                <Typography variant="body2">{"Jan 02, 2024"}</Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => handleConnectWallet()}
              sx={{
                px: 4,
                py: 1,
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
                "&:hover": {},
              }}
            >
              LUNIVERSE SCAN
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Information;
