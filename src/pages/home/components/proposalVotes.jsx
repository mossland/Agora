import PropTypes from "prop-types";
import {
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import requestHeaders from "../../../utils/restClient";

const ProposalVotes = ({ proposal }) => {
  const appHeaders = requestHeaders();
  const [proposalVotes, setProposalVotes] = useState(null);

  // GET proposal votes
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          proposalVotes === null &&
          proposal !== undefined &&
          proposal !== null
        ) {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/proposal-votes/${
              proposal._id
            }`,
            { headers: appHeaders }
          );
          setProposalVotes(response.data);
        }
      } catch (error) {
        console.log(error);
        // Handle the error state appropriately here
      } finally {
        //setLoading(false);
      }
    };

    fetchData();
  }, [appHeaders]);

  return <>{proposalVotes && <Typography sx={{ fontSize: "12px" }}>{proposalVotes.length.toString()} VOTES</Typography>}</>
};

export default ProposalVotes;

ProposalVotes.propTypes = {
  proposal: PropTypes.object,
};