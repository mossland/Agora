import { Box } from "@mui/material";

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
