import { useState, useEffect } from "react";
import axios from "axios";
import requestHeaders from "../../utils/restClient";

import { Box, CircularProgress } from "@mui/material";
import Information from "./components/information";
import RecentVotes from "./components/recentVotes";
import CreatedProposals from "./components/createdProposals";
import PostedTopics from "./components/postedTopics";
import { isValidToken } from "../../utils/jwt";

const Profile = () => {
  const id = localStorage.getItem("_id");
  const wallet = localStorage.getItem("walletAddress");

  const token = localStorage.getItem("accessToken");
  if (!token || !isValidToken(token)) {
    window.location.href = "/"
  }
  const appHeaders = requestHeaders(token);

  const [userData, setUserData] = useState(null);
  const [userProposals, setUserProposals] = useState(null);
  const [userVotes, setUserVotes] = useState(null);
  const [userTopics, setUserTopics] = useState(null);
  const [userMocBalance, setUserMocBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const viewProfile = async () => {
      try {
        if (id) {
          await axios.patch(
            `${import.meta.env.VITE_APP_API_BASE_URL}/view-profile/${id}`,
            { headers: appHeaders }
          );
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    viewProfile();
  }, [id]);

  useEffect(() => {
    const getMocBalance = async () => {
      try {
        if (wallet) {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/moc-balance/${wallet}`,
            { headers: appHeaders }
          );
          if (response.data.items.length === 0) {
            setUserMocBalance(0)
          } else {
            const humanReadableBalance = response.data.items[0].balance / (10 ** response.data.items[0].contract.decimals)
            setUserMocBalance(humanReadableBalance)
          }
          // const response = await axios.get(
          //   `https://tmetaverse.moss.land/backend/user/630e004b0b00c0b91aae29d3/${wallet}/mmoc`,
          //   { headers: appHeaders }
          // );
          // console.log(response.data)
          if (response.data.items.length === 0) {
            setUserMocBalance(0)
          } else {
            const humanReadableBalance = response.data.items[0].balance / (10 ** response.data.items[0].contract.decimals)
            setUserMocBalance(humanReadableBalance)
          }
          
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getMocBalance();
  }, [wallet]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        if (!isValidToken(token)) {
          window.location.href = "/";
          return;
        }

        if (
          token && 
          (userData === null ||
          userProposals === null ||
          userVotes === null ||
          userTopics === null)
        ) {
          const userProfileResponse = await axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/user/${id}`,
            appHeaders
          );
          const userProposalsResponse = await axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/proposals-by-user/${id}`,
            appHeaders
          );
          const userVotesResponse = await axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/votes-by-user/${id}`,
            appHeaders
          );
          const userTopicsResponse = await axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/forums-by-user/${id}`,
            appHeaders
          );

          setUserData(userProfileResponse.data);
          setUserProposals(userProposalsResponse.data);
          setUserVotes(userVotesResponse.data);
          setUserTopics(userTopicsResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token, userData, userProposals, userVotes, userTopics]);

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
          <Information
            user={userData}
            userTokens={userMocBalance}
            userStats={{ totalVotes: userVotes.length }}
          />
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}
          >
            <RecentVotes votes={userVotes} />
            <CreatedProposals proposals={userProposals} />
            <PostedTopics topics={userTopics} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Profile;
