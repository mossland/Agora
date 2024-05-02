import PropTypes from "prop-types";
import { Box } from "@mui/material";

import dotIcon from "../../assets/icons/dots.png";

const DotIcon = ({ width = "32px", height = "32px", onClick }) => {
  return (
    <Box
      onClick={onClick}
      component="img"
      sx={{
        height: height,
        width: width,
        cursor: "pointer",
      }}
      src={dotIcon}
      alt="Dot Icon"
    />
  );
};

export default DotIcon;

DotIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func
};