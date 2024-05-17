import { useState } from "react";
import axios from "axios";
import requestHeaders from "../../utils/restClient";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ReportTopicModal = ({ open, handleCloseModal, topic }) => {
  const [reason, setReason] = useState("");

   const token = localStorage.getItem("accessToken");
   const userId = localStorage.getItem("_id");
  const appHeaders = requestHeaders(token);


  const reportTopic = async (fid) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/forums/report/${fid}`,
        {
          reportReason: reason,
          reporter: userId
        },
        appHeaders
      );
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  };

  const handleReportForumComment = async () => {
    await reportTopic(topic._id);
    handleClose();
    setReason("");
  };

  const handleClose = () => {
    setReason("");
    handleCloseModal();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="report-forum-modal-title"
      aria-describedby="report-forum-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "background.paper",
          border: 1.5,
          borderColor: "#000000",
          borderRadius: "8px",
          boxShadow: "4px 4px 0px #000000",
        }}
      >
        <Box
          component="span"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#C8C4C5",
            borderBottom: 1.5,
            borderColor: "#000000",
            borderTopLeftRadius: "7px",
            borderTopRightRadius: "7px",
          }}
        >
          <Typography
            sx={{
              ml: 1,
              color: "#000000",
              fontWeight: "bold",
            }}
          >
            Report
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            p: 0,
            borderLeft: 1.5,
            borderColor: "#000000",
            borderRadius: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            px: 4,
            py: 2,
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            Report Topic
          </Typography>

          <TextField
            value={reason}
            aria-label="Write the reason for reporting this topic."
            multiline
            rows={8}
            placeholder="Write the reason for reporting this topic."
            onChange={(e) => setReason(e.target.value)}
            variant="outlined"
            required
          />
          <Button
            onClick={() => handleReportForumComment()}
            disabled={!reason || reason.trim() === ""}
            variant="contained"
            sx={{
              mb: 2,
              width: "100%",
              height: "44px",
              color: "#FFFFFF",
              background: "#7D7D7D",
              border: 1.5,
              borderColor: "#000000",
              borderRadius: "8px",
              boxShadow: "4px 4px 0px #000000",
              textTransform: "none",
              fontSize: "18px",
              fontWeight: "bold",
              "&:hover": {
                background: "#CCCCCC",
                boxShadow: "4px 4px 0px #000000",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReportTopicModal;

ReportTopicModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  topic: PropTypes.object,
};
