import PropTypes from "prop-types";
import { Box } from "@mui/material";

import heartIcon from "../../assets/icons/heart.png";

const HeartIcon = ({ width = "28px", height = "28px", onClick }) => {
  return (
    <Box
      onClick={onClick}
      component="img"
      sx={{
        height: height,
        width: width,
        cursor: "pointer",
      }}
      src={heartIcon}
      alt="Heart Icon"
    />
  );
};

export default HeartIcon;

HeartIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func
};
