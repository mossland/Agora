import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Box, Paper, Typography } from "@mui/material";
import banner from "../../../assets/images/mosland-banner.webp";
const Overview = ({ proposalStats }) => {
  const [treasury, setTreasuryAmount] = useState(null);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
  });

  useEffect(() => {
    const getMocBalance = async () => {
      try {
        if (treasury === null) {
          const res = await axios.get(
            `https://disclosure.moss.land/api/market`,
            { headers: {} }
          );
          const market = res.data.filter(i => i.market_type === "mossland_marketcap_usd")
          setTreasuryAmount(formatter.format(market[0].number))
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getMocBalance();
  }, [treasury]);

  return (
    <Paper
      elevation={5}
      sx={{
        minWidth: { sm: 500, md: 500 },
        display: "flex",
        flexDirection: "column",
        border: 1.5,
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
            fontFamily: "",
            fontWeight: "bold",
          }}
        >
          Overview
        </Typography>
      </Box>
      <Box
        component="img"
        onClick={()=>{window.location.href = 'https://google.com';}}
        src={banner}
        sx={{
          cursor: "pointer",
          m: "2px",
          height: "189px",
          display: "flex",
          alignItems: "center",
          border: 1.5,
          borderColor: "#000000",
          borderRadius: "10px",
        }}
      ></Box>
      <Box
        component="span"
        sx={{
          m: "2px",
          height: "91px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          border: 1.5,
          borderColor: "#000000",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            PROPOSALS:
          </Typography>
          {proposalStats && (
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {proposalStats.approved} proposals
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            VOTES:
          </Typography>
          {proposalStats && (
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {proposalStats.votes} votes
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            TREASURY:
          </Typography>
          {treasury && <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            {treasury}
          </Typography>}
        </Box>
      </Box>
    </Paper>
  );
};

export default Overview;

Overview.propTypes = {
  proposalStats: PropTypes.object,
};
