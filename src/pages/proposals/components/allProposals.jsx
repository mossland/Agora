import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";

import {
  Box,
  Button,
  Chip,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import MIcon from "../../../components/icons/mSquareIcon";

import SearchIcon from "../../../assets/icons/search.png";

import { formatDate } from "../../../utils/formatDate";
import { getStatusStyle } from "../../../utils/getStatusStyle";
import { getTagStyle } from "../../../utils/getTagStyle";
import useAuth from "../../../hooks/useAuth";

const AllProposals = ({ proposals, stats }) => {
  const [sort, setSort] = useState("latest");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  // Search Logic
  const [searchInput, setSearchInput] = useState("");
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };
  const filteredProposals = proposals.filter((proposal) =>
    proposal._doc.title.toLowerCase().includes(searchInput)
  );

  const sortedProposals = useMemo(() => {
    const filtered = proposals.filter((proposal) =>
      proposal._doc.title.toLowerCase().includes(searchInput)
    );

    switch (sort) {
      case "latest":
        return filtered.sort(
          (a, b) => new Date(b._doc.createdAt) - new Date(a._doc.createdAt)
        );
      case "ends-soon":
        return filtered
          .filter((a) => new Date(a._doc.endDate) > new Date())
          .sort((a, b) => new Date(a._doc.endDate) - new Date(b._doc.endDate));
      case "hyped":
        return filtered.sort((a, b) => b.views - ( a.views));
      default:
        return filtered;
    }
  }, [proposals, searchInput, sort]);

  function getTimeDifference(timestamp) {
    // Get the current time in milliseconds
    const currentTime = new Date().getTime();

    // Convert the timestamp string to a Date object
    const targetTime = new Date(timestamp);

    // Calculate the time difference in milliseconds
    const timeDifference = targetTime - currentTime;

    // Check if the timestamp is in the future
    if (timeDifference > 0) {
      // Convert milliseconds to minutes
      const minutes = Math.floor(timeDifference / 60000);

      // If remaining time is greater than or equal to 1440 minutes (24 hours), show in days
      if (minutes >= 1440) {
        const days = Math.floor(minutes / 1440);
        return `${days} DAY${days !== 1 ? "S" : ""} REMAINING`;
      } else if (minutes >= 60) {
        // If remaining time is greater than or equal to 60 minutes, show in hours
        const hours = Math.floor(minutes / 60);
        return `${hours} HOUR${hours !== 1 ? "S" : ""} REMAINING`;
      } else {
        // Otherwise, show in minutes
        return `${minutes} MINUTE${minutes !== 1 ? "S" : ""} REMAINING`;
      }
    } else {
      return "ENDED";
    }
  }

  const [visibleCount, setVisibleCount] = useState(8);
  const handleViewMore = () => {
    setVisibleCount(proposals.length);
  };

  const { isAuthenticated } = useAuth();

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
          className="pixelify"
          sx={{
            ml: 1,
            color: "#000000",
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
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            Total
          </Typography>
          {stats && (
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {stats.approved}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            Upcoming
          </Typography>
          {stats && (
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {stats.pending}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            Active
          </Typography>
          {stats && (
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {stats.active}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            Passed
          </Typography>
          {stats && (
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
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
        <Box>
          <TextField
            value={searchInput}
            onChange={handleSearchChange}
            id="outlined-basic"
            variant="outlined"
            placeholder="Search proposals"
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
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
                boxShadow: "none",
              },
            }}
          >
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={sort}
              onChange={handleChange}
              label="Sort By"
              sx={{ fontSize: "16px", fontWeight: "bold" }}
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
            href="/proposals/new"
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
              transition: "all 0.3s ease", // not working
              "&:hover": {
                background:
                  "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(#0148FF, #0B89FF)",
                boxShadow: "4px 4px 0px #000000",
              },
            }}
          >
            NEW PROPOSAL
          </Button>
        )}
      </Box>

      <TableContainer
        component={Box}
        sx={{
          m: "2px",
          width: "auto",
          bgcolor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: 1.5,
          borderColor: "#000000",
          borderRadius: "8px",
        }}
      >
        <Table aria-label="proposals-table">
          <TableHead>
            {sortedProposals.length <= 0 ? (
              <Box sx={{ my: 2 }}>
                <Typography>No proposals.</Typography>
              </Box>
            ) : (
              <TableRow>
                <TableCell
                  sx={{
                    color: "#808080",
                    fontSize: "14px",
                    fontWeight: "bold",
                    border: 0,
                  }}
                >
                  PROPOSAL
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#808080",
                    fontSize: "14px",
                    fontWeight: "bold",
                    border: 0,
                  }}
                >
                  TAG
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#808080",
                    fontSize: "14px",
                    fontWeight: "bold",
                    border: 0,
                  }}
                >
                  REMAINING
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#808080",
                    fontSize: "14px",
                    fontWeight: "bold",
                    border: 0,
                  }}
                ></TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {sortedProposals &&
              sortedProposals.slice(0, visibleCount).map((proposal) => (
                <TableRow key={proposal._doc?._id || proposal.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ pt: 0, pb: 2, border: 0 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <MIcon />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          <NavLink
                            to={`/proposals/${proposal._doc._id}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            {proposal._doc.title}
                          </NavLink>
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Chip
                            label={proposal.votingStatus}
                            sx={{
                              height: "19px",
                              fontSize: "12px",
                              fontWeight: "bold",
                              borderRadius: "4px",
                              "& .MuiChip-label": {
                                px: "5px",
                              },
                              ...getStatusStyle(proposal.votingStatus),
                            }}
                          />
                          <Typography sx={{ fontSize: "12px" }}>
                            ・{formatDate(proposal._doc.createdAt)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right" sx={{ py: 1.5, border: 0 }}>
                    <Chip
                      label={proposal._doc.tag}
                      sx={{
                        height: "19px",
                        fontSize: "12px",
                        background: "none",
                        border: 1,
                        borderRadius: "4px",
                        "& .MuiChip-label": {
                          px: "5px",
                        },
                        ...getTagStyle(proposal._doc.tag),
                      }}
                    />
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: "#FF0000", fontWeight: "bold", border: 0 }}
                  >
                    {getTimeDifference(proposal._doc.endDate)}
                  </TableCell>
                  <TableCell align="right" sx={{ border: 0 }}>
                    <Button
                      href={`/proposals/${proposal._doc._id}`}
                      variant="contained"
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
                        "&:hover": {
                          background: "#E1FFE1",
                          boxShadow: "4px 4px 0px #000000",
                        },
                      }}
                    >
                      VOTE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {sortedProposals && sortedProposals.length > visibleCount && (
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
            onClick={handleViewMore}
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
            VIEW MORE PROPOSALS
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default AllProposals;

AllProposals.propTypes = {
  stats: PropTypes.object,
  proposals: PropTypes.array,
};
