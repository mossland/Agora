import PropTypes from "prop-types";
import { Box, Button, Paper } from "@mui/material";
import axios from "axios";
import requestHeaders from "../../../../utils/restClient";
import { useNavigate } from "react-router-dom";

const Buttons = ({
  setInPreview,
  preview,
  title,
  contents,
  category,
  ccdAdmins,
  isFormComplete
}) => {
   const token = localStorage.getItem("accessToken");
  const appHeaders = requestHeaders(token);

  const userId = localStorage.getItem("_id");
  const navigate = useNavigate();

  async function postNewTopic() {
    try {
      const newTopic = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/forums/new`,
        {
          title: title,
          contents: contents,
          category: category,
          author: userId,
          ccdAdmins: ccdAdmins,
        },
        appHeaders
      );
      navigate(`/forum/${newTopic.data._id}`);
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          border: 1.5,
          bgcolor: "#C4C4C4",
          borderColor: "#000000",
          borderRadius: "10px",
          boxShadow: "4px 4px 0px #000000",
        }}
      >
        <Box sx={{ m: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
        {preview && (
            <Button
              onClick={() => setInPreview(false)}
              variant="contained"
              // disabled={!isFormComplete}
              sx={{
                px: 12,
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
              Back
            </Button>
          )}
          {!preview && (
            <Button
              onClick={() => setInPreview(true)}
              variant="contained"
              disabled={!isFormComplete}
              sx={{
                px: 12,
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
          )}
          <Button
            onClick={() => postNewTopic()}
            variant="contained"
            disabled={!isFormComplete}
            sx={{
              px: 12,
              color: "#FFFFFF",
              background: "linear-gradient(#7D7D7D, #929292)",
              border: 1.5,
              borderColor: "#000000",
              borderRadius: "5px",
              boxShadow: "4px 4px 0px #000000",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                background:
                "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(#7D7D7D, #929292)",
                boxShadow: "4px 4px 0px #000000",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

Buttons.propTypes = {
  setInPreview: PropTypes.func,
  preview: PropTypes.bool,
  title: PropTypes.string,
  contents: PropTypes.string,
  category: PropTypes.string,
  ccdAdmins: PropTypes.array,
  isFormComplete: PropTypes.string,
};

export default Buttons;
