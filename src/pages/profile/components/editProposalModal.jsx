import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import requestHeaders from "../../../utils/restClient";

const EditProposalModal = ({ proposal, open, handleClose }) => {
  const appHeaders = requestHeaders();

  const [descriptionValue, setDescriptionValue] = useState(
    proposal.description
  );
  const [title, setTitle] = useState(proposal.title);
  const [tag, setTag] = useState(proposal.tag);
  const [startDate, setStartDate] = useState(proposal.startDate);
  const [endDate, setEndDate] = useState(proposal.endDate);
  const [ccdAdmins, setCCdAdmins] = useState(proposal.ccdAdmins);

  async function editProposal() {
    try {
      // to-do: add validation on the form
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/proposals/edit/${
          proposal._id
        }`,
        {
          title: title,
          description: descriptionValue,
          startDate: startDate,
          endDate: endDate,
          tag: tag,
          ccdAdmins: ccdAdmins,
        },
        appHeaders
      );
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-proposal-modal-title"
      aria-describedby="edit-proposal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 420,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          outline: "none",
        }}
      >
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
              Edit Proposal
            </Typography>
          </Box>

          <Box
            sx={{
              mb: 2,
              px: 1,
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <Typography
              sx={{
                mt: 2,
                mb: 1,
                color: "#626262",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              TITLE
            </Typography>
            <TextField
              // label="Title"
              variant="outlined"
              placeholder="Topic Title"
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

            <Typography
              sx={{
                mt: 2,
                mb: 1,
                color: "#626262",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              CC.
            </Typography>
            <TextField
              variant="outlined"
              placeholder="@mosserve_DAO_ADMIN"
              sx={{
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
            <Typography
              sx={{
                mt: 2,
                mb: 1,
                color: "#626262",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              TAG
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip
                label="Announcement"
                variant="outlined"
                clickable
                sx={{
                  height: "22px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  bgcolor: "white",
                  border: 1,
                  bordercolor: "black",
                  borderRadius: 1,
                }}
              />
              <Chip
                label="Core"
                variant="outlined"
                clickable
                sx={{
                  height: "22px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  bgcolor: "white",
                  border: 1,
                  bordercolor: "black",
                  borderRadius: 1,
                }}
              />
              <Chip
                label="Process"
                variant="outlined"
                clickable
                sx={{
                  height: "22px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  bgcolor: "white",
                  border: 1,
                  bordercolor: "black",
                  borderRadius: 1,
                }}
              />
              <Chip
                label="Information"
                variant="outlined"
                clickable
                sx={{
                  height: "22px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  bgcolor: "white",
                  border: 1,
                  bordercolor: "black",
                  borderRadius: 1,
                }}
              />
              <Chip
                label="Project"
                variant="outlined"
                clickable
                sx={{
                  height: "22px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  bgcolor: "white",
                  border: 1,
                  bordercolor: "black",
                  borderRadius: 1,
                }}
              />
            </Box>
            <Typography
              sx={{
                mt: 2,
                mb: 1,
                color: "#FF0000",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              REQUEST REVIEW
            </Typography>
            <TextField
              variant="outlined"
              placeholder=""
              sx={{
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
            <Typography
              sx={{
                mt: 2,
                mb: 1,
                color: "#626262",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              DESCRIPTION
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Write down here the topic.."
              multiline
              rows={20}
              sx={{
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
            <Typography
              sx={{
                mt: 2,
                mb: 1,
                color: "#626262",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              SCHEDULE
            </Typography>
            <Typography
              sx={{
                mt: 2,
                mb: 1,
                color: "#626262",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              DISCUSSION (created automatically)
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              sx={{
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
              Preview
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "#FFFFFF",
                background: "#7D7D7D",
                border: 1.5,
                borderColor: "#000000",
                borderRadius: "5px",
                boxShadow: "4px 4px 0px #000000",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  background: "#474747",
                  boxShadow: "4px 4px 0px #000000",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default EditProposalModal;

EditProposalModal.propTypes = {
  proposal: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
