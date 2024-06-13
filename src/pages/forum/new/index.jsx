import { useEffect, useState } from "react";
import axios from "axios";
import requestHeaders from "../../../utils/restClient";
import { Box } from "@mui/material";

import NewTopic from "./components/newTopic";
import Buttons from "./components/buttons";
import Information from "./components/information";
import Description from "./components/description";

const NewForum = () => {
   const token = localStorage.getItem("accessToken");
  const appHeaders = requestHeaders(token);

  const [admins, setAdmins] = useState(null);
  const [inPreview, setInPreview] = useState(false);

  const [title, setTitle] = useState("");
  const [forumTags, setForumTags] = useState(null);
  const [selectedForumTag, setSelectedForumTag] = useState(null);
  const [descriptionValue, setDescriptionValue] = useState("");

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
  }, [appHeaders, admins]);

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
  }, [appHeaders, forumTags]);

  const isFormComplete = title && descriptionValue && selectedForumTag;

  return (
    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
      <Box sx={{ flex: 1 }}>
        {inPreview ? (
          <Description
            title={title}
            admins={admins}
            forumTags={selectedForumTag}
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
            selectedForumTag={selectedForumTag}
            setSelectedForumTag={setSelectedForumTag}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {inPreview && <Information/>}
        <Buttons
          title={title}
          contents={descriptionValue}
          category={selectedForumTag}
          preview={inPreview}
          setInPreview={setInPreview}
          isFormComplete={isFormComplete}
        />
      </Box>
    </Box>
  );
};

export default NewForum;
