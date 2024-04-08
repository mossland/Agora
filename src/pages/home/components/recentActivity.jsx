import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";

import p1 from "../../../assets/profile/profile1.png";
import p2 from "../../../assets/profile/profile2.png";
import p3 from "../../../assets/profile/profile3.png";
import p4 from "../../../assets/profile/profile4.png";

const RecentActivity = ({ activity }) => {
  function fetchProfilePicture(pic) {
    if (pic === "1") {
      return p1;
    }
    if (pic === "2") {
      return p2;
    }
    if (pic === "3") {
      return p3;
    }
    if (pic === "4") {
      return p4;
    }
    return "";
  }

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
          Recent Activity
        </Typography>
      </Box>

      {activity && (
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
          {activity.map((a) => (
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
              key={a._doc._id}
            >
              <Avatar
                sx={{ color: "black", bgcolor: "#86FFC6" }}
                variant="square"
              >
                M
              </Avatar>
              {a.type === "Comment" && <Box>
                <Typography>
                    {a._doc.author.nickname} commented on {a._doc.forumTopic.title}
                </Typography>
                <Typography>{"1 min"} ago</Typography>
              </Box>}
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default RecentActivity;
