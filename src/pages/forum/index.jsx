import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

import TopicGeneral from "./components/topic";
import Categories from "./components/categories";
import requestHeaders from "../../utils/restClient";
import axios from "axios";

const Forum = () => {
  const appHeaders = requestHeaders();
  const [forumCategories, setForumCategories] = useState(null);
  const [forums, setForums] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (forums === null || forumCategories == null) {
          const [forumsResponse, categoriesResponse] = await Promise.all([
            axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/agora-forums`, { headers: appHeaders }),
            axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/forums/categories`, { headers: appHeaders })
          ]);
          setForums(forumsResponse.data);
          setForumCategories(categoriesResponse.data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [appHeaders]); 

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 64px)", // Example height, adjust if necessary
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Categories categories={forumCategories} />
          <TopicGeneral forums={forums} />
        </Box>
      )}
    </>
  );
};

export default Forum;
