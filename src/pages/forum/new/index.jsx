import { Box } from "@mui/material";
import requestHeaders from "../../../utils/restClient";
import axios from "axios";
import NewTopic from "./components/newTopic";
import Buttons from "./components/buttons";
import { useEffect, useState } from "react";

import Information from "./components/information";
import Description from "./components/description";

const NewForum = () => {
  const appHeaders = requestHeaders();
  const [admins, setAdmins] = useState(null);
  const [inPreview, setInPreview] = useState(false);

  const [title, setTitle] = useState(null);
  const [forumTags, setForumTags] = useState(null);
  const [descriptionValue, setDescriptionValue] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
        if (forumTags === null) {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/forums/categories`,
            { headers: appHeaders }
          );
          setForumTags(response.data);
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

  const isFormComplete = title && descriptionValue && forumTags;

  return (
    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
      <Box sx={{ flex: 1 }}>
        {inPreview ? (
          <Description
            title={title}
            admins={admins}
            forumTags={forumTags}
            descriptionValue={descriptionValue}
          />
        ) : (
          <NewTopic
            title={title}
            setTitle={setTitle}
            admins={admins}
            forumTags={forumTags}
            setForumTags={setForumTags}
            descriptionValue={descriptionValue}
            setDescriptionValue={setDescriptionValue}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {inPreview && <Information startDate={startDate} endDate={endDate} />}
        <Buttons
          title={title}
          descriptionValue={descriptionValue}
          preview={inPreview}
          setInPreview={setInPreview}
          startDate={startDate}
          endDate={endDate}
          isFormComplete={isFormComplete}
        />
      </Box>
    </Box>
  );
};

export default NewForum;
