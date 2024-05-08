import PropTypes from "prop-types";
import { Box, Chip, Paper, TextField, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewTopic = ({
  title,
  setTitle,
  admins,
  forumTags,
  selectedForumTag,
  setSelectedForumTag,
  descriptionValue,
  setDescriptionValue,
}) => {
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
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
            fontWeight: "bold",
          }}
        >
          New Topic
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

        {/* <Typography
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
        /> */}
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
          {forumTags &&
            forumTags.map((tag) => (
              <Chip
                key={tag._id}
                label={tag._id}
                variant="filled"
                clickable
                onClick={() => setSelectedForumTag(tag._id)}
                sx={{
                  height: "22px",
                  fontSize: "14px",
                  fontWeight: selectedForumTag === tag._id ? "bold" : "normal",
                  bgcolor: "white",
                  color: "black",
                  border: selectedForumTag === tag._id ? 1 : 0,
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
      </Box>
    </Paper>
  );
};

export default NewTopic;

NewTopic.propTypes = {
  setDescriptionValue: PropTypes.func,
  setTitle: PropTypes.func,
  title: PropTypes.string,
  descriptionValue: PropTypes.string,
  admins: PropTypes.array,
  tags: PropTypes.array,
};
