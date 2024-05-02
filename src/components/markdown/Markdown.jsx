import PropTypes from "prop-types";
import StyledMarkdown from "./styles";
import { Box } from "@mui/material";

export default function Markdown({ content, sx }) {
  return (
    <Box
      sx={{
        // px: 2,
        // py: 1,
        // border: 1,
        // borderColor: "#E4E4E7",
        // borderRadius: 2,
        overflow: "auto",
      }}
    >
      <StyledMarkdown
        dangerouslySetInnerHTML={{ __html: content }}
        sx={sx}
        className="markdownContents"
      />
    </Box>
  );
}

Markdown.propTypes = {
  content: PropTypes.string,
  sx: PropTypes.object,
};
