import { Box } from "@mui/material";
import requestHeaders from "../../../utils/restClient";

import NewProposal from "./components/newProposal";
import Buttons from "./components/buttons";
import Description from "./components/description";
import Information from "./components/information";
import axios from "axios";
import { useEffect, useState } from "react";

const NewProposalPage = () => {
  const appHeaders = requestHeaders();
  const [inPreview, setInPreview] = useState(false);
  const [admins, setAdmins] = useState(null);
  const [ccdAdmins, setCCdAdmins] = useState([]);
  
  const [title, setTitle] = useState(null);
  const [descriptionValue, setDescriptionValue] = useState(null);
  const [proposalTags, setProposalTags] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedProposalTag, setSelectedProposalTag] = useState(null);

  const handleChangeAdmins = (event, value) => {
    setCCdAdmins(value);
  };

  // GET admins
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (admins === null) {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/users/admin`,
            { headers: appHeaders }
          );
          setAdmins(response.data);
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

  // GET tags
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (proposalTags === null) {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/proposal-tags`,
            { headers: appHeaders }
          );
          setProposalTags(response.data);
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

  const isFormComplete = title && descriptionValue && proposalTags && startDate && endDate;

  return (
    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
      <Box sx={{ flex: 1 }}>
        {inPreview ? (
          <Description title={title} admins={admins} selectedProposalTag={selectedProposalTag} endDate={endDate} descriptionValue={descriptionValue} />
        ) : (
          <NewProposal
            handleChangeAdmins={handleChangeAdmins}
            title={title}
            setTitle={setTitle}
            admins={admins}
            descriptionValue={descriptionValue}
            setDescriptionValue={setDescriptionValue}
            proposalTags={proposalTags}
            selectedProposalTag={selectedProposalTag}
            setSelectedProposalTag={setSelectedProposalTag}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {inPreview && <Information startDate={startDate} endDate={endDate} />}
        <Buttons
          title={title}
          startDate={startDate}
          endDate={endDate}
          descriptionValue={descriptionValue}
          selectedProposalTag={selectedProposalTag}
          setInPreview={setInPreview}
          preview={inPreview}
          ccdAdmins={ccdAdmins}
          isFormComplete={isFormComplete}
        />
      </Box>
    </Box>
  );
};

export default NewProposalPage;
