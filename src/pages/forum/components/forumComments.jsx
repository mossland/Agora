import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import requestHeaders from "../../../utils/restClient";
import { Typography } from "@mui/material";

const ForumComments = ({ forum }) => {
  const appHeaders = requestHeaders();

  const [topicComments, setTopicComments] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (topicComments === null) {
          const commentsResponse = axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/agora-comments/${
              forum._id
            }`,
            { headers: appHeaders }
          );

          const [commentsData] = await Promise.all([commentsResponse]);
          setTopicComments(commentsData.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        //setLoading(false);
      }
    };

    if (forum) {
      fetchData();
    }
  }, [forum, appHeaders]);

  return (
    <>
      {topicComments && (
        <>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            {topicComments.length}
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>comments</Typography>
        </>
      )}
    </>
  );
};

export default ForumComments;

ForumComments.propTypes = {
  forum: PropTypes.object,
};
