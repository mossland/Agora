import PropTypes from "prop-types";
import { Box, LinearProgress, Paper, Typography } from "@mui/material";

const CurrentResult = ({ proposal, votes }) => {
  // Calculate MOC balance
  const calculateTotalForType = (votes, type) => {
    return votes
      .filter((vote) => vote.type === type)
      .reduce((total, vote) => total + vote.initialMocBalance, 0);
  };
  const totalMocFor = calculateTotalForType(votes, "For");
  const totalMocAgainst = calculateTotalForType(votes, "Against");
  const totalMocAbstain = calculateTotalForType(votes, "Abstain");

  // Calculate percentage
  const totalMoc = totalMocFor + totalMocAgainst + totalMocAbstain;
  const percentageFor =
    totalMoc > 0 ? Math.round((totalMocFor / totalMoc) * 100) : 0;
  const percentageAgainst =
    totalMoc > 0 ? Math.round((totalMocAgainst / totalMoc) * 100) : 0;
  const percentageAbstain =
    totalMoc > 0 ? Math.round((totalMocAbstain / totalMoc) * 100) : 0;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {proposal && (
        <Paper
          elevation={5}
          sx={{
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
                fontWeight: "bold",
              }}
            >
              Current Result
            </Typography>
          </Box>
          <Box sx={{ m: 2 }}>
            <Box sx={{ mb: 1, display: "flex" }}>
              <Typography
                sx={{
                  textAlign: "left",
                  width: "120px",
                  color: "#808080",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                FOR
              </Typography>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress
                      variant="determinate"
                      value={percentageFor}
                      sx={{
                        p: 0.5,
                        backgroundColor: "white",
                        border: 1.5,
                        borderRadius: 0.75,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#00DF24",
                          width: "100%",
                          borderRadius: 0.5,
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                      {percentageFor}%
                    </Typography>
                    <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                      {totalMocFor} MOC
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mb: 1, display: "flex" }}>
              <Typography
                sx={{
                  textAlign: "left",
                  width: "120px",
                  color: "#808080",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                AGAINST
              </Typography>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress
                      variant="determinate"
                      value={percentageAgainst}
                      sx={{
                        p: 0.5,
                        backgroundColor: "white",
                        border: 1.5,
                        borderRadius: 0.75,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#FF0000",
                          width: "100%",
                          borderRadius: 0.5,
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                      {percentageAgainst}&
                    </Typography>
                    <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                      {totalMocAgainst} MOC
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  textAlign: "left",
                  width: "120px",
                  color: "#808080",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                ABSTAIN
              </Typography>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress
                      variant="determinate"
                      value={percentageAbstain}
                      sx={{
                        p: 0.5,
                        backgroundColor: "white",
                        border: 1.5,
                        borderRadius: 0.75,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#FCC500",
                          width: "100%",
                          borderRadius: 0.5,
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                      {percentageAbstain}%
                    </Typography>
                    <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                      {totalMocAbstain} MOC
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default CurrentResult;

CurrentResult.propTypes = {
  proposal: PropTypes.object,
  votes: PropTypes.array,
};
