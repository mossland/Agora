import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Paper, LinearProgress, Typography } from "@mui/material";
import { getProposalResult } from "../../../../utils/contractInteraction";

function LinearProgressWithLabel({ value, color = "#ff0000", ...props }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          value={value}
          sx={{
            height: 15,
            backgroundColor: "white",
            border: 1.5,
            borderRadius: 0.75,
            "& .MuiLinearProgress-bar": {
              backgroundColor: color,
              m: 0.25,
              borderRadius: 0.5,
            },
          }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography
          sx={{ fontSize: "12px", fontWeight: "bold" }}
        >{`${Math.round(value)}%`}</Typography>
        <Typography
          sx={{ fontSize: "12px", fontWeight: "bold" }}
        >{`MOC`}</Typography>
      </Box>
    </Box>
  );
}

const FinalResult = ({ proposal, votes }) => {

  const wallet = localStorage.getItem("walletAddress");
  const [finalResult, setProposalFinalResult] = useState(null)
  const [resultRetrievalError, setResultRetrievalError] = useState(false)

  useEffect(() => {
    (async () => {
      //setLoading(true);
      try {
        if (wallet && 
          finalResult == null && proposal.votingClosed &&
          proposal.smartContractId !== null &&
          proposal.smartContractId !== undefined
        ) {
          const result = await getProposalResult(proposal.smartContractId); // If positive, passed. If negative, failed. If 0, tie.
          console.log(result);
          setProposalFinalResult(result);
        } else {
          setResultRetrievalError(true)
        }
      } catch (error) {
        console.log(error);
      }
      //setLoading(false); // Set loading to false after all fetches are done
    })();
  }, []);

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
          {resultRetrievalError && <Stack sx={{maxWidth: "300px"}}><Typography>Couldn't fetch the final voting result for this proposal from the Luniverse chain. Have you connected your wallet?</Typography></Stack>}
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
                <LinearProgressWithLabel value={10} color="#00DF24" />
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
                <LinearProgressWithLabel value={10} color="#FF0000" />
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
                <LinearProgressWithLabel value={10} color="#FCC500" />
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default FinalResult;

FinalResult.propTypes = {
  proposal: PropTypes.object,
  votes: PropTypes.array,
};
