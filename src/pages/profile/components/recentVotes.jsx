import {
  Avatar,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

const RecentVotes = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Paper
        elevation={5}
        sx={{
          minWidth: { sm: 500, md: 500 },
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
            Recent Votes
          </Typography>
        </Box>

        <List>
          {/* {proposals.map((proposal, index) => ( */}
          <ListItem key={"index"} divider>
            <ListItemText
              primary={
                <Typography variant="subtitle1">
                  {"AI Integration into Mossland"}
                </Typography>
              }
              secondary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                  <Typography variant="body2" color="text.secondary">
                    · {"Feb 06, 2024"}
                  </Typography>
                </Box>
              }
            />
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
            <Typography variant="body1" sx={{ marginLeft: "auto" }}>
              {"amount"}
            </Typography>
          </ListItem>
          {/* ))} */}
        </List>
      </Paper>
    </Box>
  );
};

export default RecentVotes;
