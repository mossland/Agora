import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import TopicGeneral from "./components/topic";
import Categories from "./components/categories";
import requestHeaders from "../../utils/restClient";
import axios from "axios";

const Forum = () => {

  const appHeaders = requestHeaders();
  const [forumCategories, setForumCategories] = useState(null);
  const [forums, setForums] = useState(null);

  // GET all forum topics to render in table 
  useEffect(() => {
    if (forums === null) {
      getForums();
    }
  }, [forums, appHeaders]);

  const getForums = async () => {
    //setLoadingData(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/agora-forums`,
        appHeaders
      );
      console.log(response.data)
      setForums(response.data);
      //setLoadingData(false);
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  };

  useEffect(() => {
    if (forumCategories === null) {
      getForumCategories();
    }
  }, [forumCategories, appHeaders]);

  const getForumCategories = async () => {
    //setLoadingData(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/forums/categories`,
        appHeaders
      );
      setForumCategories(response.data);
      //setLoadingData(false);
    } catch (error) {
      console.log(error);
      //setError(true);
    }
  };

  return (
    <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 1 }}>
      <Categories categories={forumCategories} />
      <TopicGeneral forums={forums} />
    </Box>
  );
};

export default Forum;
