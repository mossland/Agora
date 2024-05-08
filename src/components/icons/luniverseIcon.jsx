import { Box } from "@mui/material";

import luniverseIcon from "../../assets/icons/luniverse.svg";

const LuniverseIcon = () => {
  return (
    <Box
      component="img"
      sx={{
        height: "25px",
        width: "25px",
      }}
      src={luniverseIcon}
      alt="MCircle Icon"
    />
  );
};

export default LuniverseIcon;
