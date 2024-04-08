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

const Categories = ({ categories }) => {
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
          {categories && (
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {categories.map((cat) => (
                <FormControlLabel
                  key={cat._id}
                  value={cat._id}
                  control={<Radio />}
                  label={cat._id}
                />
              ))}
            </RadioGroup>
          )}
        </FormControl>
      </Paper>
      <Button
        variant="contained"
        onClick={() => handleConnectWallet()}
        sx={{
          px: 4,
          py: 1,
          width: "100%",
          height: "44px",
          color: "#000000",
          background: "#FFB800",
          border: 1.5,
          borderColor: "#000000",
          borderRadius: "8px",
          boxShadow: "4px 4px 0px #000000",
          textTransform: "none",
          fontWeight: "bold",
          "&:hover": {},
        }}
      >
        How to join the Agora?
      </Button>
    </Box>
  );
};

export default Categories;
