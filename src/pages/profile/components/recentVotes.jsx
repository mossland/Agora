import PropTypes from "prop-types";
import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import MIcon from "../../../components/icons/mSquareIcon";

import { getStatusStyle } from "../../../utils/getStatusStyle";
import { getTagStyle } from "../../../utils/getTagStyle";
import { formatDate } from "../../../utils/formatDate";

const RecentVotes = ({ votes }) => {
  function fetchVotingStatus(p) {
    const now = new Date();
    if (now >= p.startDate && now <= p.endDate) {
      return "Ongoing";
    }
    if (now >= p.endDate) {
      // to-do: check voting result
      if (p.extended === true && now < p.extendedEndDate) {
        return "Extended";
      }
      return "Ended";
    }
    if (now < p.startDate) {
      return "Ready";
    }
    return "";
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Paper
        elevation={5}
        sx={{
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
          className="pixelify"
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
            Recent Votes
          </Typography>
        </Box>

        <TableContainer
          component={Box}
          sx={{
            width: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Table aria-label="recent-votes-table">
            {votes && votes.length === 0 ? (
              <Box sx={{ my: 2 }}>
                <Typography>No recent votes.</Typography>
              </Box>
            ) : (
              <TableHead>
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
                    align="left"
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
                  ></TableCell>
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {votes &&
                votes.slice(0, 8).map((vote) => (
                  <TableRow key={vote._id}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ py: 1.5, border: 0 }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <MIcon />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5,
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            {vote.associatedProposal.title}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Chip
                              label={fetchVotingStatus(vote.associatedProposal)}
                              sx={{
                                height: "19px",
                                fontSize: "12px",
                                fontWeight: "bold",
                                borderRadius: "4px",
                                "& .MuiChip-label": {
                                  px: "5px",
                                },
                                ...getStatusStyle(
                                  fetchVotingStatus(vote.associatedProposal)
                                ),
                              }}
                            />
                            <Typography sx={{ fontSize: "12px" }}>
                              ・{formatDate(vote.createdAt)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="left" sx={{ py: 1.5, border: 0 }}>
                      <Chip
                        label={vote.associatedProposal.tag}
                        variant="outlined"
                        sx={{
                          height: "19px",
                          fontSize: "14px",
                          borderRadius: "4px",
                          "& .MuiChip-label": {
                            px: "5px",
                          },
                          ...getTagStyle(vote.associatedProposal.tag),
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        py: 1.5,
                        border: 0,
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {"100"} MOC
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {votes && votes.length >= 6 && (
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
              href="/proposals"
              sx={{
                px: 4,
                py: 1,
                color: "#000000",
                background: "#FFFFFF",
                border: 1.5,
                borderColor: "#000000",
                borderRadius: "5px",
                boxShadow: "4px 4px 0px #000000",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  background: "#CCCCCC",
                  boxShadow: "4px 4px 0px #000000",
                },
              }}
            >
              VIEW MORE PROPOSALS
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default RecentVotes;

RecentVotes.propTypes = {
  votes: PropTypes.array,
};
