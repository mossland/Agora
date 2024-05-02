import { Box } from "@mui/material";

import mIcon from "../../assets/icons/mCircleIcon.png";

const MIcon = () => {
  return (
    <Box
      component="img"
      sx={{
        height: "52px",
        width: "52px",
      }}
      src={mIcon}
      alt="MCircle Icon"
    />
  );
};

export default MIcon;
