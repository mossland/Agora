import PropTypes from "prop-types";
import { Box, Stack, Paper, TextField, Typography, Chip } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewProposal = ({
  title,
  setTitle,
  admins,
  descriptionValue,
  setDescriptionValue,
  proposalTags,
  setProposalTags,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  console.log(proposalTags)

  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: 1.5,
        bgcolor: "#C4C4C4",
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
          New Proposal
        </Typography>
      </Box>
      <Box sx={{ p: "5px" }}>
        <Typography
          sx={{ textAlign: "left", fontSize: "14px", fontWeight: "bold" }}
        >
          You need to be a core member of the space in order to submit a
          proposal
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
          placeholder="Proposal Title"
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
          {proposalTags &&
            proposalTags.map((tag) => (
              <Chip
                onClick={() => setProposalTags(tag)}
                key={tag._id}
                label={tag._id}
                sx={{
                  height: "22px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  bgcolor: "white",
                  color: "black",
                  border: proposalTags === tag ? 1 : 0,
                  borderColor: "black",
                  borderRadius: 1,
                }}
              />
            ))}
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
          DESCRIPTION
        </Typography>
        <ReactQuill
          theme="snow"
          value={descriptionValue}
          onChange={setDescriptionValue}
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
        <Stack direction="row">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start date"
              value={startDate}
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
              label="End date"
              value={endDate}
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
    </Paper>
  );
};

NewProposal.propTypes = {
  admins: PropTypes.array,
  tags: PropTypes.array,
  title: PropTypes.string,
  setTitle: PropTypes.func,
  descriptionValue: PropTypes.string,
  setDescriptionValue: PropTypes.func,
  startDate: PropTypes.object, //to-do: check this
  setStartDate: PropTypes.func,
  endDate: PropTypes.object, //to-do: check this
  setEndDate: PropTypes.func,
};

export default NewProposal;
