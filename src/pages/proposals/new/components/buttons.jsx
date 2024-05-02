import PropTypes from "prop-types";
import { Box, Button, Paper } from "@mui/material";
import axios from "axios";
import requestHeaders from "../../../../utils/restClient";

const Buttons = ({
  setInPreview,
  preview,
  title,
  descriptionValue,
  startDate,
  endDate,
  tag,
  ccdAdmins,
}) => {
  const appHeaders = requestHeaders();
  const userId = localStorage.getItem("_id");

  async function postNewProposal() {
    try {
      // to-do: add validation
      await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/proposals/new`,
        {
          title: title,
          description: descriptionValue,
          startDate: startDate,
          endDate: endDate,
          tag: tag,
          proponent: userId,
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
          {!preview && (
            <Button
              onClick={() => setInPreview(true)}
              variant="contained"
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
            onClick={() => postNewProposal()}
            variant="contained"
            sx={{
              px: 12,
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
  );
};

Buttons.propTypes = {
  setInPreview: PropTypes.func,
  preview: PropTypes.bool,
  title: PropTypes.string,
  descriptionValue: PropTypes.string,
  startDate: PropTypes.object, //to-do: check this
  endDate: PropTypes.object, //to-do: check this
  tag: PropTypes.string,
  ccdAdmins: PropTypes.array,
};

export default Buttons;
