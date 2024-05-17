import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  Modal,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import axios from "axios";
import requestHeaders from "../../../utils/restClient";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fetchProfilePicture } from "../../../utils/fetchProfilePicture";
import dayjs from "dayjs";

const EditProposalModal = ({
  proposal,
  open,
  handleClose,
  proposalTags,
  admins,
}) => {
   const token = localStorage.getItem("accessToken");
  const appHeaders = requestHeaders(token);


  const [inPreview, setInPreview] = useState(false);

  const [ccdAdmins, setCCdAdmins] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (ccdAdmins === null && proposal && admins) {
          //const filtered = await filterAdmins()
          let filtered = [];
          for await (const admin of proposal.ccdAdmins) {
            const foundAdmin = admins.filter((i) => i._id === admin);
            if (foundAdmin.length > 0) {
              filtered.push(foundAdmin[0]);
            }
           
          }

          setCCdAdmins(filtered);
        }
      } catch (error) {
        console.log(error);
        // Handle the error state appropriately here
      }
    };

    fetchData();
  }, [ccdAdmins, proposal, admins]);

  const [descriptionValue, setDescriptionValue] = useState(
    proposal.description
  );
  const [title, setTitle] = useState(proposal.title);
  const [startDate, setStartDate] = useState(proposal.startDate);
  const [endDate, setEndDate] = useState(proposal.endDate);

  const [selectedProposalTag, setSelectedProposalTag] = useState(proposal.tag);

  const isFormComplete = title && descriptionValue && selectedProposalTag && startDate && endDate;

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeAdmins = (event, value) => {
    setCCdAdmins(value);
  };

  async function editProposal() {
    try {
      const adminIds = ccdAdmins.map((i) => i._id);
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/proposals/edit/${
          proposal._id
        }`,
        {
          title: title,
          description: descriptionValue,
          startDate: startDate,
          endDate: endDate,
          tag: selectedProposalTag,
          ccdAdmins: adminIds,
        },
        appHeaders
      );
      handleClose();
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
      <Paper
        elevation={5}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          border: 1.5,
          borderColor: "#000000",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 750,
          bgcolor: "#C4C4C4",
          borderRadius: 3,
          outline: "none",
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
            value={title}
            onChange={handleChangeTitle}
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
          {admins && ccdAdmins && (
            <Autocomplete
              multiple
              disablePortal
              defaultValue={ccdAdmins}
              id="combo-box-demo"
              options={admins}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onChange={handleChangeAdmins}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "white",
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
              getOptionLabel={(option) => option.nickname} // This tells Autocomplete how to get the option label from each option object
              renderOption={(props, option) => (
                <Box
                  component="li"
                  {...props}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Avatar
                    src={fetchProfilePicture(option.profilePicture)}
                    sx={{
                      width: "24px",
                      height: "24px",
                      mr: 1,
                      border: 1,
                      borderColor: "#000000",
                      borderRadius: 1,
                    }}
                    variant="square"
                  />
                  <Typography>{option.nickname}</Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} placeholder="@mosserve_DAO_ADMIN" />
              )}
            />
          )}
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
            {proposalTags &&
              proposalTags.map((tag) => (
                <Chip
                  variant="outlined"
                  onClick={() => setSelectedProposalTag(tag._id)}
                  key={tag._id}
                  label={tag._id}
                  clickable
                  sx={{
                    height: "22px",
                    fontSize: "14px",
                    fontWeight:
                      selectedProposalTag === tag._id ? "bold" : "normal",
                    bgcolor: "white",
                    color: "black",
                    border: selectedProposalTag === tag._id ? 1 : 0,
                    borderColor: "black",
                    borderRadius: 1,
                  }}
                />
              ))}
          </Box>
          {proposal.reviewReason && (
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
          )}
          {proposal.reviewReason && (
            <TextField
              disabled
              value={proposal.reviewReason}
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
                },
              }}
            />
          )}
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
          <Box>
            <ReactQuill
              theme="snow"
              value={descriptionValue}
              onChange={setDescriptionValue}
              style={{
                backgroundColor: "white",
                border: "none",
                borderRadius: "5px",
              }}
            />
          </Box>
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
          <Stack direction="row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                disablePast
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
                label="Start date"
                value={dayjs(startDate)}
                onChange={(newValue) => setStartDate(newValue)}
              />
            </LocalizationProvider>
            <Typography
              sx={{
                ml: 2,
                mr: 2,
                mt: 2,
                mb: 1,
                color: "#626262",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              to
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                disablePast
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
                label="End date"
                value={dayjs(endDate)}
                onChange={(newValue) => setEndDate(newValue)}
              />
            </LocalizationProvider>
          </Stack>
          {/* <Typography
            sx={{
              mt: 2,
              mb: 1,
              color: "#626262",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            DISCUSSION (created automatically)
          </Typography> */}
        </Box>
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
          {/* <Button
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
          </Button> */}
          <Button
            disabled={!isFormComplete}
            onClick={() => editProposal()}
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
    </Modal>
  );
};

export default EditProposalModal;

EditProposalModal.propTypes = {
  proposal: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
