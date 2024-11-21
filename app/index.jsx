import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setProfile, setRole, setUser } from "../redux/slices/userSlice";
import Loader from "../components/common/Loader";
import { Redirect } from "expo-router";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const dispatch = useDispatch();

  const fetchUserData = async (email) => {
    try {
      // Fetch role data
      const roleResponse = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/users/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!roleResponse.ok) throw new Error("Failed to fetch role data.");
      const roleData = await roleResponse.json();
      dispatch(setRole(roleData));

      // Fetch profile data
      const profileResponse = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/users/getProfile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            email,
          },
        }
      );

      if (!profileResponse.ok) throw new Error("Failed to fetch profile data.");
      const profileData = await profileResponse.json();
      if (profileData && !profileData.error) dispatch(setProfile(profileData));
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const loadUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        dispatch(setUser(userData));
        setAuthenticated(true);

        const userEmail = userData?.email;
        if (userEmail) {
          await fetchUserData(userEmail);
        }
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  if (loading) return <Loader />;
  return <Redirect href={authenticated ? "(tabs)" : "/login"} />;
};

export default Index;