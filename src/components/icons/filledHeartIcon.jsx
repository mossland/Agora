import PropTypes from "prop-types";
import { Box } from "@mui/material";

import filledHeartIcon from "../../assets/icons/filledHeart.png";

const FilledHeartIcon = ({ width = "28px", height = "28px", onClick }) => {
  return (
    <Box
      onClick={onClick}
      component="img"
      sx={{
        height: height,
        width: width,
        cursor: "pointer",
      }}
      src={filledHeartIcon}
      alt="Filled Heart Icon"
    />
  );
};

export default FilledHeartIcon;

FilledHeartIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func,
};
