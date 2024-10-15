import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setProfile, setUser, setRole } from "../redux/slices/userSlice";
import { apiRequest } from "../utils/helpers";

const androidClientId =
  "589470403357-tucvnutjfgbrjimnbiddhuf8q47fn3dv.apps.googleusercontent.com";

WebBrowser.maybeCompleteAuthSession();

const config = {
  androidClientId,
};

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const storeUserData = async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log("User stored successfully");
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  const getUserProfile = async (token) => {
    if (!token) return;
    setLoading(true);

    try {
      const user = await apiRequest(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      dispatch(setUser(user));
      await storeUserData(user);

      const userEmail = user.email;

      console.log("email------->", userEmail);

      if (userEmail) {
        const roleData = await apiRequest(
          "https://trakies-backend.onrender.com/api/users/signin",
          "POST",
          { email: userEmail }
        );

        if (roleData) {
          dispatch(setRole(roleData));
        }

        const profileData = await apiRequest(
          "https://trakies-backend.onrender.com/api/users/getProfile",
          "GET",
          null,
          { email: userEmail }
        );

        if (profileData && !profileData.error) {
          dispatch(setProfile(profileData));
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (response?.type === "success" && response.authentication) {
        const { accessToken } = response.authentication;
        await getUserProfile(accessToken);
        router.replace("(tabs)");
      } else {
        console.log("Response not successful or no authentication");
      }
    };
    fetchProfile();
  }, [response]);

  return (
    <View className="h-full w-full flex justify-center items-center ">
      <View className="absolute h-full w-full">
        <Image
          className="h-full w-full"
          source="https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
      </View>
      <View className="absolute top-0 left-0 bg-black/50 z-10 h-full w-full" />
      <View className="h-full w-full z-50 flex justify-between">
        <View className="mt-48 ml-8 space-y-4">
          <Text className="font-bold text-xl text-white">Welcome to</Text>
          <Text className="font-bold text-6xl text-white">Trekies.</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => promptAsync()}
          className="w-full flex justify-center items-center mb-4 px-8"
        >
          <View className="bg-gray-600/80 w-full rounded-xl py-4 flex flex-row space-x-5 justify-center items-center">
            {loading ? (
              <ActivityIndicator size={24} color="white" />
            ) : (
              <View className="flex flex-row justify-center items-center space-x-5">
                <Ionicons name="logo-google" size={24} color="white" />
                <Text className="text-white font-bold">Login with Google</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
