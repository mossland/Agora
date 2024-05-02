import PropTypes from "prop-types";
import { Menu, MenuItem } from "@mui/material";

const ReportKebabMenu = ({
  anchorEl,
  open,
  handleClose,
  handleOpenReportModal,
}) => {

  return (
    <Menu
      elevation={2}
      id="disconnect menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiPaper-root": {
          border: 1.5,
          minWidth: "100px",
        },
      }}
    >
      <MenuItem
        sx={{ fontSize: "16px", fontWeight: "bold" }}
        onClick={() => {
          handleClose();  // Close the menu first
          handleOpenReportModal();  // Then open the report modal
        }}
      >
        Report
      </MenuItem>
    </Menu>
  );
};

export default ReportKebabMenu;

ReportKebabMenu.propTypes = {
  anchorEl: PropTypes.any,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOpenReportModal: PropTypes.func.isRequired,
};