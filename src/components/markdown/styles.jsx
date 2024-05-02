// @mui
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

const MARGIN = {
  marginTop: 0,
  marginBottom: 0,
};

const LINE_HEIGHT = {
  // lineHeight: 0,
  fontSize: "18px",
};

const StyledMarkdown = styled("div", {
  shouldForwardProp: (prop) => prop !== "firstLetter",
})(({ firstLetter, theme }) => ({
  // Heading
  "& h1": { ...MARGIN },
  "& h2": { ...MARGIN },
  "& h3": { ...MARGIN },
  "& h4": { ...MARGIN },
  "& h5": { ...MARGIN },
  "& h6": { ...MARGIN },
  "& p": { ...MARGIN, ...LINE_HEIGHT, fontSize: "14px" },

  // Link
  a: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },

  // Hr
  hr: {
    borderColor: theme.palette.divider,
  },

  // List
  "& ul, & ol": {
    // _paddingLeft: theme.spacing(5),
    get paddingLeft() {
      return this._paddingLeft;
    },
    set paddingLeft(value) {
      this._paddingLeft = value;
    },
    "& li": {
    },
    fontSize: "14px",
  },

  // Blockquote
  "& blockquote": {
    lineHeight: 1.5,
    fontSize: "1.5em",
    margin: "40px auto",
    position: "relative",
    fontFamily: "Georgia, serif",
    padding: theme.spacing(3, 3, 3, 8),
    borderRadius: Number(theme.shape.borderRadius) * 2,
    backgroundColor: theme.palette.background.neutral,
    color: `${theme.palette.text.secondary} !important`,
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
    "& p, & span": {
      marginBottom: "0 !important",
      fontSize: "inherit !important",
      fontFamily: "Georgia, serif !important",
      color: `${theme.palette.text.secondary} !important`,
    },
    "&:before": {
      left: 16,
      top: -8,
      display: "block",
      fontSize: "3em",
      content: '"\\201C"',
      position: "absolute",
      color: theme.palette.text.disabled,
    },
  },

  // Image
  "& img": {
    margin: theme.spacing(5, 0),
    borderRadius: theme.spacing(1),
    width: "100%",
    height: "100%",
  },

  // Table
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: `1px solid ${theme.palette.divider}`,
    "th, td": {
      padding: theme.spacing(1),
      border: `1px solid ${theme.palette.divider}`,
    },
    "tbody tr:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.neutral,
    },
  },

  // Checkbox
  input: {
    "&[type=checkbox]": {
      position: "relative",
      cursor: "pointer",
      "&:before": {
        content: '""',
        top: -2,
        left: -2,
        width: 17,
        height: 17,
        borderRadius: 3,
        position: "absolute",
        backgroundColor:
          theme.palette.grey[theme.palette.mode === "light" ? 300 : 700],
      },
      "&:checked": {
        "&:before": {
          backgroundColor: theme.palette.primary.main,
        },
        "&:after": {
          content: '""',
          top: 1,
          left: 5,
          width: 4,
          height: 9,
          position: "absolute",
          transform: "rotate(45deg)",
          msTransform: "rotate(45deg)",
          WebkitTransform: "rotate(45deg)",
          border: `solid ${theme.palette.common.white}`,
          borderWidth: "0 2px 2px 0",
        },
      },
    },
  },

  // First Letter
  ...(firstLetter && {
    "& > p:first-of-type": {
      "&:first-letter": {
        float: "left",
        fontSize: 80,
        lineHeight: 1,
        paddingRight: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold,
      },
    },
  }),
}));

export default StyledMarkdown;
