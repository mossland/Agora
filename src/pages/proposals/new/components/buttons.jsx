import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import requestHeaders from "../../../../utils/restClient";
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { createNewProposalTx } from "../../../../utils/contractInteraction";

const Buttons = ({
  setInPreview,
  preview,
  title,
  descriptionValue,
  startDate,
  endDate,
  selectedProposalTag,
  ccdAdmins,
  isFormComplete,
}) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("accessToken");
  const wallet = localStorage.getItem("walletAddress");
  const appHeaders = requestHeaders(token);

  const userId = localStorage.getItem("_id");

  const navigate = useNavigate();

  async function postNewProposal() {
    setLoading(true);
    try {
      const adminIds = ccdAdmins.map((i) => i._id);

      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/new-proposal`,
        {
          title: title,
          description: descriptionValue,
          startDate: startDate,
          endDate: endDate,
          tag: selectedProposalTag,
          proponent: userId,
          ccdAdmins: adminIds,
        },
        appHeaders
      );

      // Trigger blockchain tx for new proposal
      try {
        await createNewProposalTx(
          wallet,
          startDate,
          endDate,
          response.data._id
        );
      } catch (e) {
        console.log("Transaction error during proposal creation - auto rejecting proposal")
        // Automatically set proposal status to rejected if the transaction fails or is denied by user
        await axios.patch(
          `${import.meta.env.VITE_APP_API_BASE_URL}/proposals/reject/${
            response.data._id
          }`,
          appHeaders
        );
      }
    } catch (error) {
      console.log("Transaction error during proposal creation 2 - auto rejecting proposal");
      console.log(error);
      //setError(true);
    } finally {
      setLoading(false);
      navigate("/proposals");
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
            onClick={() => postNewProposal()}
            variant="contained"
            // disabled={!isFormComplete}
            disabled={!isFormComplete || loading}
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
            {loading ? (
              <CircularProgress
                size={24}
                sx={{ width: "100%", color: "#FFFFFF" }}
              />
            ) : (
              "Submit"
            )}
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
  selectedProposalTag: PropTypes.string,
  isFormComplete: PropTypes.bool,
};

export default Buttons;
