import PropTypes from "prop-types";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const Categories = ({ categories, selectedValue, handleChange }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Paper
        elevation={5}
        sx={{
          // minWidth: { sm: 500, md: 500 },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          border: 1.5,
          bgcolor: "#FFFFFF",
          borderColor: "#000000",
          borderRadius: "10px",
          boxShadow: "4px 4px 0px #000000",
        }}
      >
        <Box
          component="span"
          sx={{
            m: "2px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            background: "linear-gradient(0.25turn, #86FFC6, #DAFFD9)",
            border: 1.5,
            borderColor: "#000000",
            borderRadius: "8px",
          }}
        >
          <Typography
            className="pixelify"
            sx={{
              ml: 1,
              color: "#000000",
              // fontSize: "",
              fontWeight: "bold",
            }}
          >
            Categories
          </Typography>
        </Box>

        <FormControl sx={{ p: 2 }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="All"
            name="radio-buttons-group"
            value={selectedValue}
            onChange={handleChange}
          >
            <FormControlLabel
              key={"general"}
              value={"All"}
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": { color: "#000000" },
                  }}
                />
              }
              label={"All"}
              componentsProps={{
                typography: { fontWeight: "bold" },
              }}
            />
            {categories.map((cat) => (
              <FormControlLabel
                key={cat._id}
                value={cat._id}
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": { color: "#000000" },
                    }}
                  />
                }
                label={cat._id}
                componentsProps={{
                  typography: { fontWeight: "bold" },
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>
      <Button
        variant="contained"
        href="https://www.moss.land/"
        sx={{
          px: 4,
          py: 1,
          height: "44px",
          color: "#000000",
          background: "#FFB800",
          border: 1.5,
          borderColor: "#000000",
          borderRadius: "10px",
          boxShadow: "4px 4px 0px #000000",
          textTransform: "none",
          fontSize: "16px",
          fontWeight: "bold",
          "&:hover": {
            background: "#FFC633",
            boxShadow: "4px 4px 0px #000000",
          },
        }}
      >
        How to join the Agora?
      </Button>
    </Box>
  );
};

export default Categories;

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
