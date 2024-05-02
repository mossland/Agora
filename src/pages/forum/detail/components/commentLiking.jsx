import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import requestHeaders from "../../../../utils/restClient";

import HeartIcon from "../../../../components/icons/hearchIcon";
import FilledHeartIcon from "../../../../components/icons/filledHeartIcon";

const CommentLiking = ({ comment }) => {
  const userId = localStorage.getItem("_id");
  const appHeaders = requestHeaders();

  const [liked, setLiked] = useState(false);
  const [unliked, setUnliked] = useState(false);

  async function likeForumTopicComment(id) {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_APP_API_BASE_URL
        }/like-forum-comment/${id}/${userId}`,
        {},
        appHeaders
      );
      setLiked(true);
      setUnliked(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function unlikeForumTopicComment(id) {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_APP_API_BASE_URL
        }/unlike-forum-comment/${id}/${userId}`,
        {},
        appHeaders
      );
      setUnliked(true);
      setLiked(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {liked === false && (!comment.likers.includes(userId) || unliked) && (
        <HeartIcon
          width="15px"
          height="15px"
          onClick={() => likeForumTopicComment(comment._id)}
        />
      )}
      {unliked === false && (comment.likers.includes(userId) || liked) && (
        <FilledHeartIcon onClick={() => unlikeForumTopicComment(comment._id)} />
      )}
    </>
  );
};

export default CommentLiking;

CommentLiking.propTypes = {
  comment: PropTypes.object,
};
