import PropTypes from "prop-types";
import { Box, List, ListItem, Paper, Typography } from "@mui/material";

import MIcon from "../../../components/icons/mSquareIcon";
import { formatDate } from "../../../utils/formatDate";

const AgorasHighlights = ({ highlights }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        minWidth: { sm: 500, md: 500 },
        display: "flex",
        flexDirection: "column",
        border: 1.5,
        bgcolor: "#FFFFFF",
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
          Agora Highlights
        </Typography>
      </Box>
      {highlights && highlights.length === 0 && (
        <Typography sx={{ mt: 2, mb: 2 }}>
          There are currently no Agora highlights.
        </Typography>
      )}
      {highlights && highlights.length > 0 && (
        <List
          aria-labelledby=""
          sx={{
            m: "2px",
            height: "189px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {highlights.slice(0, 8).map((highlight) => (
            <ListItem
              key={highlight._id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <MIcon />
              <Box>
                <Typography sx={{ fontSize: "16", fontWeight: "bold" }}>
                  {highlight.title}
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  {" "}
                  {formatDate(highlight.createdAt)}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default AgorasHighlights;

AgorasHighlights.propTypes = {
  highlights: PropTypes.array,
};
