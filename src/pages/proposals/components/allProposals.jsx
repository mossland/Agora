import {
  Avatar,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const AllProposals = ({ proposals, stats }) => {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
      hour12: false,
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

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
          All Proposals
        </Typography>
      </Box>
      <Box
        component="span"
        sx={{
          m: "2px",
          height: "91px",
          bgcolor: "#FFFFFF",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          border: 1.5,
          borderColor: "#000000",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography>Total</Typography>
          {stats && <Typography>{stats.approved}</Typography>}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography>Pending</Typography>
          {stats && <Typography>{stats.pending}</Typography>}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography>Active</Typography>
          {stats && <Typography>{stats.active}</Typography>}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography>Passed</Typography>
          {stats && (
            <Typography>
              {"/"}
              {stats.approved} ({"50%"})
            </Typography>
          )}
        </Box>
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
          placeholder="Search proposals"
          sx={{
            // maxWidth: "100%",
            backgroundColor: "white",
            borderColor: "#000000",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderWidth: "1.5px",
                borderColor: "#000000",
              },
              "&:hover fieldset": {
                borderColor: "#000000",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#000000",
              },
            },
          }}
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
        <ListItem>PROPOSAL TAG REMAINING</ListItem>
        {proposals &&
          proposals.map((proposal) => (
            <ListItem
              key={proposal._doc_id}
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
                  <Typography>{proposal._doc.title}</Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      label={proposal.votingStatus}
                      sx={{
                        height: "19px",
                        fontSize: "12px",
                        borderRadius: "4px",
                        "& .MuiChip-label": {
                          px: "5px",
                        },
                      }}
                    />
                    <Typography>
                      ・{formatDate(proposal._doc.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Chip
                label={proposal._doc.tag}
                sx={{
                  height: "19px",
                  fontSize: "12px",
                  borderRadius: "4px",
                  "& .MuiChip-label": {
                    px: "5px",
                  },
                }}
              />

              <Typography sx={{ color: "red" }}>REMAINING</Typography>
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

export default AllProposals;
