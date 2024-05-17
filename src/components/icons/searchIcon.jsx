import { Box } from "@mui/material";
import PropTypes from "prop-types";

import searchIcon from "../assets/icons/search.png";

const SearchIcon = (props) => {
  return (
    <Box
      component="img"
      sx={{
        height: props.size,
        width: props.size,
        ...props.sx,
      }}
      src={searchIcon}
      alt="Search Icon"
    />
  );
};

export default SearchIcon;

SearchIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  sx: PropTypes.object,
};