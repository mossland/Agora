import { Box } from "@mui/material";

import mIcon from "../../assets/icons/mSquareIcon.png";

const MIcon = () => {
  return (
    <Box
      component="img"
      sx={{
        height: "32px",
        width: "32px",
      }}
      src={mIcon}
      alt="MSquare Icon"
    />
  );
};

export default MIcon;
