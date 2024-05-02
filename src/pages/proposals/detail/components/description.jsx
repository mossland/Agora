import PropTypes from "prop-types";
import { Avatar, Box, Button, Chip, Paper, Typography } from "@mui/material";

import MIcon from "../../../../components/icons/mCircleIcon";
import Markdown from "../../../../components/markdown/Markdown";

import { getTimeDifference } from "../../../../utils/getTimeDifference";
import { fetchProfilePicture } from "../../../../utils/fetchProfilePicture";
import { formatDate } from "../../../../utils/formatDate";
import { getStatusStyle } from "../../../../utils/getStatusStyle";
import { getTagStyle } from "../../../../utils/getTagStyle";

const Description = ({ proposal }) => {
  function computeApprovedStatus(startDate, endDate) {
    var now = new Date(); // Current timestamp
    startDate = new Date(startDate); // Convert start date to Date object
    endDate = new Date(endDate); // Convert end date to Date object

    if (now < startDate) {
      return "Upcoming";
    }

    if (now >= startDate && now <= endDate) {
      return "Ongoing";
    }

    if (now > endDate) {
      return "Ended";
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {proposal && (
        <Paper
          elevation={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "#C4C4C4",
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
              Description
            </Typography>
          </Box>
          <Box
            sx={{
              m: "2px",
              p: 2,
              bgcolor: "#FFFFFF",
              border: 1.5,
              borderColor: "#000000",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
              textAlign: "left",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Typography
                gutterBottom
                sx={{ fontSize: "24px", fontWeight: "bold" }}
              >
                {proposal.title}
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Chip
                  label={computeApprovedStatus(
                    proposal.startDate,
                    proposal.endDate
                  )}
                  sx={{
                    px: 1,
                    height: "30px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    borderRadius: "4px",
                    "& .MuiChip-label": {
                      px: "5px",
                    },
                    ...getStatusStyle(
                      computeApprovedStatus(
                        proposal.startDate,
                        proposal.endDate
                      )
                    ),
                  }}
                />
                <Chip
                  label={proposal.tag}
                  sx={{
                    px: 1,
                    height: "30px",
                    fontSize: "14px",
                    background: "none",
                    border: 1,
                    borderRadius: "4px",
                    "& .MuiChip-label": {
                      px: "5px",
                    },
                    ...getTagStyle(proposal.tag),
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  width: "24px",
                  height: "24px",
                  border: 1,
                  borderColor: "#000000",
                  borderRadius: 1,
                }}
                src={fetchProfilePicture(proposal.proponent.profilePicture)}
                variant="square"
              />
              <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                {proposal.proponent.nickname}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                sx={{ color: "#FF0000", fontSize: "14px", fontWeight: "bold" }}
              >
                {getTimeDifference(proposal.endDate)}
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                {formatDate(proposal.startDate)}
              </Typography>
            </Box>
            <Markdown content={proposal.description} />
          </Box>
          <Box
            sx={{
              m: "2px",
              mb: 5,
              p: 2,
              bgcolor: "#FFFFFF",
              border: 1.5,
              borderColor: "#000000",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              textAlign: "left",
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <MIcon />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography
                  sx={{
                    color: "#808080",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {"DISCUSSION"}
                </Typography>
                <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                  {proposal.title}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              href={`/forum/${proposal.linkedDiscusion}`}
              sx={{
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
                "&:hover": {
                  background: "#CCCCCC",
                  boxShadow: "4px 4px 0px #000000",
                },
              }}
            >
              Discussion
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Description;

Description.propTypes = {
  proposal: PropTypes.object,
};
