import { useState } from "react";
import { Box } from "@mui/material";
import Information from "./components/information";
import RecentVotes from "./components/recentVotes";

const Profile = () => {
  return (
    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
      <Information />
      <RecentVotes />
    </Box>
  );
};

export default Profile;
