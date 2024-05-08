import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import FlagIcon from "../../../components/icons/flagIcon";
import SearchIcon from "../../../assets/icons/search.png";

import { fetchProfilePicture } from "../../../utils/fetchProfilePicture";
import ForumLiking from "./forumLiking";
import useAuth from "../../../hooks/useAuth";
import ForumComments from "./forumComments";

const TopicGeneral = ({ forums, selectedValue }) => {
  const { isAuthenticated } = useAuth();

  function getTimeDifference(timestamp) {
    // Get the current time in milliseconds
    const currentTime = new Date().getTime();

    // Convert the timestamp string to a Date object
    const targetTime = new Date(timestamp);

    // Calculate the time difference in milliseconds
    const timeDifference = currentTime - targetTime;

    // Convert milliseconds to seconds
    const seconds = Math.floor(timeDifference / 1000);

    // Calculate the time elapsed in days, hours, and minutes
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor(((seconds % (3600 * 24)) % 3600) / 60);

    // Construct the output based on the time elapsed
    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  }

  const [sort, setSort] = useState("latest");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  // Search Logic
  const [searchInput, setSearchInput] = useState("");
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };
  const filteredForums = forums.filter(
    (forum) =>
      forum.title.toLowerCase().includes(searchInput) ||
      (forum.author &&
        forum.author.nickname.toLowerCase().includes(searchInput))
  );

  const sortedAndFilteredForums = useMemo(() => {
    const filtered = forums.filter(
      (forum) =>
        forum.title.toLowerCase().includes(searchInput) ||
        (forum.author && forum.author.nickname.toLowerCase().includes(searchInput))
    );

    switch (sort) {
      case 'latest':
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'new-register':
        // Assuming new-register means recently created forums
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'ends-soon':
        // Sort by ending soon (assuming there is an endDate)
        return filtered.filter(a => new Date(a.endDate) > new Date()).sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
      case 'hyped':
        // Sort by a combination of views and likes, assuming both are integers
        return filtered.sort((a, b) => (b.views + b.likers.length) - (a.views + a.likers.length));
      default:
        return filtered;
    }
  }, [forums, searchInput, sort]);


  const [visibleCount, setVisibleCount] = useState(5);
  const handleViewMoreTopics = () => {
    setVisibleCount(forums.length);
  };

  return (
    <Paper
      elevation={5}
      sx={{
        flex: 1,
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
          className="pixelify"
          sx={{
            ml: 1,
            color: "#000000",
            // fontSize: "",
            fontWeight: "bold",
          }}
        >
          Topic: {selectedValue}
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
        <Box>
          <TextField
            value={searchInput}
            onChange={handleSearchChange}
            id="outlined-basic"
            variant="outlined"
            placeholder="Search by forum topic and member nickname"
            sx={{
              minWidth: "400px",
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src={SearchIcon}
                    alt="search"
                    style={{ width: "24px", height: "24px" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <FormControl
            variant="outlined"
            sx={{
              ml: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:focused .MuiOutlinedInput-notchedOutline": {
                background: "#E1E1E1",
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
                boxShadow: "none",
              },
            }}
          >
            <Select
              // labelId="demo-simple-select-outlined-label"
              // id="demo-simple-select-outlined"
              value={sort}
              onChange={handleChange}
              label="Sort By"
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "& .MuiMenuItem-root.Mui-selected": {
                      backgroundColor: "#E1E1E1",
                      "&:hover": {
                        backgroundColor: "#E1E1E1",
                      },
                    },
                    "& .MuiMenuItem-root:hover": {},
                  },
                },
              }}
            >
              <MenuItem
                value="latest"
                sx={{ fontSize: "16px", fontWeight: "bold" }}
              >
                Latest
              </MenuItem>
              <MenuItem
                value="new-register"
                sx={{ fontSize: "16px", fontWeight: "bold" }}
              >
                New Register
              </MenuItem>
              <MenuItem
                value="ends-soon"
                sx={{ fontSize: "16px", fontWeight: "bold" }}
              >
                Ends Soon
              </MenuItem>
              <MenuItem
                value="hyped"
                sx={{ fontSize: "16px", fontWeight: "bold" }}
              >
                Hyped
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {isAuthenticated && (
          <Button
            variant="contained"
            href="/forum/new"
            sx={{
              px: 4,
              py: 1,
              color: "white",
              background: "linear-gradient(#0148FF, #0B89FF)",
              border: 1.5,
              borderColor: "#000000",
              borderRadius: "5px",
              boxShadow: "4px 4px 0px #000000",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                background:
                  "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(#0148FF, #0B89FF)",
                boxShadow: "4px 4px 0px #000000",
              },
            }}
          >
            NEW TOPIC
          </Button>
        )}
      </Box>

      {forums && (
        <List
          aria-labelledby=""
          sx={{
            m: "2px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {sortedAndFilteredForums && sortedAndFilteredForums.length === 0 && (
            <Typography>No active forum topics.</Typography>
          )}
          {sortedAndFilteredForums && sortedAndFilteredForums.slice(0, visibleCount).map((forum) => (
            <ListItem
              key={forum._id}
              sx={{
                bgcolor: "#FFFFFF",
                borderRadius: "8px",
                mb: 0.5,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                      <NavLink
                        to={`/forum/${forum._id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {forum.title}
                      </NavLink>
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "14px" }}>
                        {getTimeDifference(forum.createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    {forum.pinned && <FlagIcon />}
                    <ForumLiking forum={forum} />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      src={fetchProfilePicture(forum.author.profilePicture)}
                      sx={{
                        width: "24px",
                        height: "24px",
                        border: 1,
                        borderColor: "#000000",
                        borderRadius: 1,
                      }}
                      variant="square"
                    />
                    <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                      {forum.author.nickname}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        {forum.views}
                      </Typography>
                      <Typography sx={{ fontSize: "14px" }}>Views</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <ForumComments forum={forum} />
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        {forum.likers.length}
                      </Typography>
                      <Typography sx={{ fontSize: "14px" }}>Likes</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      {sortedAndFilteredForums && sortedAndFilteredForums.length > visibleCount && (
        <Box
          sx={{
            my: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleViewMoreTopics}
            variant="contained"
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
              "&:hover": {
                background: "#6C6C6C",
                boxShadow: "4px 4px 0px #000000",
              },
            }}
          >
            VIEW MORE TOPICS
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default TopicGeneral;

TopicGeneral.propTypes = {
  forums: PropTypes.array,
};
