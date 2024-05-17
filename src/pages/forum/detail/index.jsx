import { Box, CircularProgress, Typography } from "@mui/material";
import Topic from "./components/topic";
import Information from "./components/information";
import requestHeaders from "../../../utils/restClient";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ForumDetails = () => {
   const token = localStorage.getItem("accessToken");
  const appHeaders = requestHeaders(token);

  const params = useParams();
  const topicId = params.id;

  const [topic, setTopic] = useState(null);
  const [topicComments, setTopicComments] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (topic === null || topicComments === null) {
          const topicResponse = axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/agora-forums/${topicId}`,
            { headers: appHeaders }
          );
          const commentsResponse = axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/agora-comments/${topicId}`,
            { headers: appHeaders }
          );
  
          const [topicData, commentsData] = await Promise.all([
            topicResponse,
            commentsResponse,
          ]);
          setTopic(topicData.data);
          setTopicComments(commentsData.data);
        }
        
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      fetchData();
    }
  }, [appHeaders, topic, topicId, topicComments]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          {topic && <Topic topic={topic} topicComments={topicComments} />}
          {!topic && (
            <Typography sx={{ mt: 10 }}>
              Forum topic not found. Please try again.
            </Typography>
          )}
          {topic && topicComments && (
            <Information topic={topic} topicComments={topicComments} />
          )}
        </Box>
      )}
    </>
  );
};

export default ForumDetails;
