import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import requestHeaders from "../../../utils/restClient";

import HeartIcon from "../../../components/icons/hearchIcon";
import FilledHeartIcon from "../../../components/icons/filledHeartIcon";

const ForumLiking = ({ forum }) => {
  console.log(forum);
  const userId = localStorage.getItem("_id");
  const appHeaders = requestHeaders();

  const [liked, setLiked] = useState(false);
  const [unliked, setUnliked] = useState(false);
  const [likesCount, setLikesCount] = useState(forum.likers.length);

  async function likeForumTopic(id) {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/like-forum/${id}/${userId}`,
        {},
        appHeaders
      );
      setLiked(true);
      setUnliked(false);
      setLikesCount((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }

  async function unlikeForumTopic(id) {
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/unlike-forum/${id}/${userId}`,
        {},
        appHeaders
      );
      setUnliked(true);
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {liked === false && (!forum.likers.includes(userId) || unliked) && (
        <HeartIcon onClick={() => likeForumTopic(forum._id)} />
      )}
      {unliked === false && (forum.likers.includes(userId) || liked) && (
        <FilledHeartIcon onClick={() => unlikeForumTopic(forum._id)} />
      )}
    </>
  );
};

export default ForumLiking;

ForumLiking.propTypes = {
  forum: PropTypes.object,
};
