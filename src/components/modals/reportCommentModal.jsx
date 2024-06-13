import PropTypes from "prop-types";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import requestHeaders from "../../utils/restClient";

const ReportCommentModal = ({ open, handleClose, comment }) => {

  const [reason, setReason] = useState("")

   const token = localStorage.getItem("accessToken");
   const userId = localStorage.getItem("_id");
  const appHeaders = requestHeaders(token);


  const reportComment = async (cid) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/comments/report/${cid}`,
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
    await reportComment(comment._id);
    handleClose();
    setReason("");
  };
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="report-comment-modal-title"
      aria-describedby="report-comment-modal-description"
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
            // height: "38px",
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
          sx={{ px: 4, py: 2, display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            Report Comment
          </Typography>

          <TextField
            value={reason}
            aria-label="Write the reason for reporting this comment."
            multiline
            rows={8}
            placeholder="Write the reason for reporting this comment."
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
              background: "linear-gradient(#7D7D7D, #929292)",
              border: 1.5,
              borderColor: "#000000",
              borderRadius: "8px",
              boxShadow: "4px 4px 0px #000000",
              textTransform: "none",
              fontSize: "18px",
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
      </Box>
    </Modal>
  );
};

export default ReportCommentModal;

ReportCommentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  comment: PropTypes.object
};