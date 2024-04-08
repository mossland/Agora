import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";

const OpenProposals = ({ ongoingProposals }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        minWidth: { sm: 500, md: 500 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: 1.5,
        bgcolor: "#C4C4C4",
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
          Open Proposals
        </Typography>
      </Box>
      <Typography>
        Proposals are created by the community and work as the consensus
        mechanism used to outline policies and changes to the Mossland
        ecosystem. Learn more about them here.
      </Typography>

      <List
        aria-labelledby=""
        sx={{
          m: "2px",
          height: "189px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: 1.5,
          borderColor: "#000000",
          borderRadius: "8px",
        }}
      >
        {ongoingProposals && ongoingProposals.length === 0 && <Typography>No ongoing proposals.</Typography>}
        {ongoingProposals && ongoingProposals.map((proposal) => (
          <ListItem
            key={proposal._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              sx={{ color: "black", bgcolor: "#86FFC6" }}
              variant="square"
            >
              M
            </Avatar>
            <Box>
              <Typography><strong>{proposal.title}</strong></Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography>By <strong>{proposal.proponent.nickname}</strong></Typography>
                <Typography>・</Typography>
                <Typography>{"12"} VOTES</Typography>
              </Box>
            </Box>
            <Typography sx={{color: "red"}}>ENDS IN {"9 HOURS"}</Typography>
            <Button
              variant="contained"
              onClick={() => console.log("go to proposal id screen")}
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
      <Box
        sx={{
          mb: 2,
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
          VIEW MORE PROPOSALS
        </Button>
      </Box>
    </Paper>
  );
};

export default OpenProposals;
