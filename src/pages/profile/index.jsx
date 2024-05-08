import { useState, useEffect } from "react";
import axios from "axios";
import requestHeaders from "../../utils/restClient";

import { Box, CircularProgress } from "@mui/material";
import Information from "./components/information";
import RecentVotes from "./components/recentVotes";
import CreatedProposals from "./components/createdProposals";
import PostedTopics from "./components/postedTopics";

const Profile = () => {
  const id = localStorage.getItem("_id");
  const wallet = localStorage.getItem("walletAddress");

  const appHeaders = requestHeaders();
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
            `${import.meta.env.VITE_APP_API_BASE_URL}/view-profile/${
              id
            }`,
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
          const res = await axios.get(
            `https://api.luniverse.io/mx/v2.0/wallets/${wallet}/balance`,
            { headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_APP_LUNIVERSE_API_KEY}`
            } }
          );
          console.log(res.data)
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
        if (userData === null || userProposals === null || userVotes === null || userTopics === null) {
        const userProfileResponse = axios.get(
          `${import.meta.env.VITE_APP_API_BASE_URL}/user/${id}`,
          { headers: appHeaders }
        );
        const userProposalsResponse = axios.get(
          `${import.meta.env.VITE_APP_API_BASE_URL}/proposals-by-user/${id}`,
          { headers: appHeaders }
        );
        const userVotesResponse = axios.get(
          `${import.meta.env.VITE_APP_API_BASE_URL}/votes-by-user/${id}`,
          { headers: appHeaders }
        );
        const userTopicsResponse = axios.get(
          `${import.meta.env.VITE_APP_API_BASE_URL}/forums-by-user/${id}`,
          { headers: appHeaders }
        );

        const [
          userDataResponse,
          proposalsResponse,
          votesResponse,
          topicsResponse,
        ] = await Promise.all([
          userProfileResponse,
          userProposalsResponse,
          userVotesResponse,
          userTopicsResponse,
        ]);

        setUserData(userDataResponse.data);
        setUserProposals(proposalsResponse.data);
        setUserVotes(votesResponse.data);
        setUserTopics(topicsResponse.data);
      }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, appHeaders]);

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
          <Information user={userData} userTokens={userMocBalance} userStats={{totalVotes: userVotes.length}} />
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
