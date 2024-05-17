import { Box } from "@mui/material";

import filledFlagIcon from '../../assets/icons/filledFlag.png'

const FilledFlagIcon = () => {
  return (
    <Box
      component="img"
      sx={{
        height: "28px",
        width: "28px",
        cursor: "pointer",
      }}
      src={filledFlagIcon}
      alt="Filled Flag Icon"
    />
  );
};

export default FilledFlagIcon;
