import {
  Avatar,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const TopicGeneral = ({ forums }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        minWidth: { sm: 500, md: 500 },
        bgcolor: "#C4C4C4",
        display: "flex",
        flexDirection: "column",
        border: 1.5,
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
          Topic: General
        </Typography>
      </Box>

      <Box
        sx={{
          my: 1,
          pl: "3px",
          pr: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="Search by forum topic and member nickname"
        />
        <Button
          variant="contained"
          sx={{
            px: 4,
            py: 1,
            width: "200px",
            color: "white",
            background: "linear-gradient(#0148FF, #0B89FF)",
            border: 1.5,
            borderColor: "#000000",
            borderRadius: "5px",
            boxShadow: "4px 4px 0px #000000",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {},
          }}
        >
          NEW PROPOSAL
        </Button>
      </Box>

      {forums && (
        <List
          aria-labelledby=""
          sx={{
            m: "2px",
            height: "189px",
            bgcolor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 1.5,
            borderColor: "#000000",
            borderRadius: "8px",
          }}
        >
          {forums.length === 0 && <Typography>No active forum topics.</Typography>}
          {forums.map((forum) => (
            <ListItem
              key={forum._id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{ color: "black", bgcolor: "#86FFC6" }}
                  variant="square"
                >
                  M
                </Avatar>
                <Box>
                  <Typography>
                    {
                     forum.title
                    }
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      label="REJECTED"
                      sx={{
                        height: "19px",
                        fontSize: "12px",
                        borderRadius: "4px",
                        "& .MuiChip-label": {
                          px: "5px",
                        },
                      }}
                    />
                    <Typography>・{"Feb 06, 2024"}</Typography>
                  </Box>
                </Box>
              </Box>
              <Button
                variant="contained"
                onClick={() => handleConnectWallet()}
                sx={{
                  px: 4,
                  py: 1,
                  width: "60px",
                  height: "22px",
                  color: "#000000",
                  background: "#DAFFD9",
                  border: 1.5,
                  borderColor: "#000000",
                  borderRadius: "5px",
                  boxShadow: "4px 4px 0px #000000",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {},
                }}
              >
                VOTE
              </Button>
            </ListItem>
          ))}
        </List>
      )}
      <Box
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => handleConnectWallet()}
          sx={{
            px: 4,
            py: 1,
            width: "200px",
            color: "white",
            background: "#474747",
            border: 1.5,
            borderColor: "#000000",
            borderRadius: "5px",
            boxShadow: "4px 4px 0px #000000",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {},
          }}
        >
          VIEW MORE TOPICS
        </Button>
      </Box>
    </Paper>
  );
};

export default TopicGeneral;
