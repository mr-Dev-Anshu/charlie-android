import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setProfile, setUser } from "../redux/slices/userSlice";
import { setRole } from "../redux/slices/userSlice";
import axios from "axios";

const androidClientId =
  "507567662252-tunpju62sg7cka6gpa42c5he6o6p5ed6.apps.googleusercontent.com";
const iosClientId =
  "507567662252-9cmtsn3bouh0gli81vegohj7n71mhm2p.apps.googleusercontent.com";
const webClientId =
  "507567662252-l7liujl7ntlq3ghuga2q9uigtc4qm5oi.apps.googleusercontent.com";

WebBrowser.maybeCompleteAuthSession();

const config = {
  androidClientId,
  iosClientId,
  webClientId,
};

const Login = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest(config);
  const router = useRouter();

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
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch user profile: ${errorText}`);
      }

      const text = await response.text();
      try {
        const user = JSON.parse(text);
        dispatch(setUser(user));
        await storeUserData(user);
        const role = await fetch(
          "https://trakies-backend.onrender.com/api/users/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email }),
          }
        );
        const roledata = await role.json();
        const profile = await fetch(
          "https://trakies-backend.onrender.com/api/users/getProfile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              email: user.email,
            },
          }
        );
        const profiledata = await profile.json();
        if (profiledata) {
          dispatch(setProfile(profiledata));
        }
        if (roledata) {
          dispatch(setRole(roledata));
        }
      } catch (parseError) {
        throw new Error("Error parsing JSON: " + parseError.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      const { accessToken } = response.authentication;
      getUserProfile(accessToken).then(() => {
        router.replace("(tabs)");
      });
    }
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
        <View className="space-y-4 mb-16 flex justify-center items-center px-6 w-full">
          <TouchableOpacity activeOpacity={0.7} onPress={() => promptAsync()}>
            <View className="bg-gray-600/80 p-3 w-[400px] rounded-xl py-4 flex flex-row space-x-5 justify-center items-center">
              {loading ? (
                <ActivityIndicator size={24} color="white" />
              ) : (
                <View className="flex flex-row justify-center items-center space-x-5">
                  <Ionicons name="logo-google" size={24} color="white" />
                  <Text className="text-white font-bold">
                    Login with Google
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(tabs)")}>
            <View className="bg-gray-600/80 p-3 w-[400px] rounded-xl py-4 flex flex-row space-x-5 justify-center items-center">
              <Ionicons name="person-circle-outline" size={24} color="white" />
              <Text className="text-white font-bold">Login with Role</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
