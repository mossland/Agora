import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
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
import EditProposalModal from "./editProposalModal";

import { formatDate } from "../../../utils/formatDate";
import requestHeaders from "../../../utils/restClient";

const CreatedProposals = ({ proposals }) => {
  function computeStatusLabel(startDate, endDate, status, proposal) {
    if (status === "In Review") {
      return status.toUpperCase();
    }

    if (status === "Withdrawn") {
      return status.toUpperCase();
    }

    if (status === "Rejected") {
      if (
        proposal &&
        proposal.reviewReason !== undefined &&
        proposal.reviewReason !== null &&
        proposal.reviewReason !== ""
      ) {
        return "REVIEW REQUESTED";
      }
      return "REJECTED";
    }

    if (status === "Approved") {
      var now = new Date();
      startDate = new Date(startDate);
      endDate = new Date(endDate);

      if (now < startDate) {
        return "UPCOMING";
      }

      if (now >= startDate && now <= endDate) {
        return "ONGOING";
      }

      if (now > endDate) {
        return "ENDED"; // to-do: check if extended
      }
    }
  }

  const appHeaders = requestHeaders();

  const withdrawProposal = async (pid) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/proposals/withdraw/${pid}`,
        {},
        appHeaders
      );
      // to-do: refresh the page
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  };

  // Modal Logic
  const [isEditProposalModalOpen, setEditProposalModalOpen] = useState(false);

  const handleEditProposalModalOpen = () => {
    setEditProposalModalOpen(true);
  };

  const handleClose = () => {
    setEditProposalModalOpen(false);
  };

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
            Created Proposals
          </Typography>
        </Box>

        {proposals && proposals.length === 0 ? (
          <Box sx={{ my: 2 }}>
            <Typography>No created proposals.</Typography>
          </Box>
        ) : (
          <TableContainer
            component={Box}
            sx={{
              width: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Table aria-label="proposals-table">
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
                    STATUS
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

              <TableBody>
                {proposals &&
                  proposals.slice(0, 8).map((proposal) => (
                    <TableRow key={proposal._id}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ py: 1.5, border: 0 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
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
                              {proposal.title}
                            </Typography>
                            <Typography sx={{ fontSize: "12px" }}>
                              {formatDate(proposal.createdAt)}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="left" sx={{ py: 1.5, border: 0 }}>
                        <Chip
                          label={computeStatusLabel(
                            proposal.startDate,
                            proposal.endDate,
                            proposal.status
                          )}
                          sx={{
                            height: "19px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            borderRadius: "4px",
                            "& .MuiChip-label": {
                              px: "5px",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="left" sx={{ py: 1.5, border: 0 }}>
                        <Chip
                          label={proposal.tag}
                          variant="outlined"
                          sx={{
                            height: "19px",
                            fontSize: "14px",
                            borderRadius: "4px",
                            "& .MuiChip-label": {
                              px: "5px",
                            },
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
                        <Button
                          variant="contained"
                          onClick={() => handleEditProposalModalOpen(proposal)}
                          sx={{
                            px: 4,
                            py: 1,
                            width: "60px",
                            height: "22px",
                            color: "#000000",
                            background: "#FFFFFF",
                            border: 1.5,
                            borderColor: "#000000",
                            borderRadius: "5px",
                            boxShadow: "4px 4px 0px #000000",
                            textTransform: "none",
                            fontSize: "14px",
                            fontWeight: "bold",
                            "&:hover": {},
                          }}
                        >
                          EDIT
                        </Button>
                        <EditProposalModal
                          proposal={proposal}
                          open={isEditProposalModalOpen}
                          handleClose={handleClose}
                        />
                        {proposal.status === "In Review" && (
                          <Button
                            onClick={() => withdrawProposal(proposal._id)}
                            variant="contained"
                            sx={{
                              px: 4,
                              py: 1,
                              width: "60px",
                              height: "22px",
                              color: "#000000",
                              background: "#FFFFFF",
                              border: 1.5,
                              borderColor: "#000000",
                              borderRadius: "5px",
                              boxShadow: "4px 4px 0px #000000",
                              textTransform: "none",
                              fontSize: "14px",
                              fontWeight: "bold",
                              "&:hover": {},
                            }}
                          >
                            WITHDRAW
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {proposals && proposals.length >= 3 && (
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

export default CreatedProposals;

CreatedProposals.propTypes = {
  proposals: PropTypes.array,
};
