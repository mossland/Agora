import { Box } from "@mui/material";

import flagIcon from "../../assets/icons/flag.png";

const FlagIcon = () => {
  return (
    <Box
      // onClick={onClick}
      component="img"
      sx={{
        height: "28px",
        width: "28px",
        cursor: "pointer",
      }}
      src={flagIcon}
      alt="Flag Icon"
    />
  );
};

export default FlagIcon;
