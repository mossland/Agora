import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";

const AgorasHighlights = () => {
  return (
    <Paper
      elevation={5}
      sx={{
        minWidth: { sm: 500, md: 500 },
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
          Agora's Highlights
        </Typography>
      </Box>

      <List
        aria-labelledby=""
        sx={{
          m: "2px",
          height: "189px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ListItem
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ color: "black", bgcolor: "#86FFC6" }} variant="square">
            M
          </Avatar>
          <Box>
            <Typography>{"AI Integration into Mossland"}</Typography>
            <Typography>{"Dec. 21., 2023"}</Typography>
          </Box>
        </ListItem>
      </List>
    </Paper>
  );
};

export default AgorasHighlights;
