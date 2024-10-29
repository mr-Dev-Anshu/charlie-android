import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
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

const { width, height } = Dimensions.get("window");

const androidClientId =
  "589470403357-tucvnutjfgbrjimnbiddhuf8q47fn3dv.apps.googleusercontent.com";

WebBrowser.maybeCompleteAuthSession();

const config = {
  androidClientId,
};

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
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
      const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status !== 200) {
        const text = await response.text();
        console.error("Error fetching Google user data:", text);
        throw new Error("Failed to fetch Google user data.");
      }
  
      const user = await response.json();
      dispatch(setUser(user));
      await storeUserData(user);
  
      const userEmail = user.email;
  
      if (userEmail) {
        const roleResponse = await fetch("https://trakies-backend.onrender.com/api/users/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        });
  
        if (roleResponse.status !== 200) {
          const text = await roleResponse.text();
          console.error("Error fetching role data:", text);
          throw new Error("Failed to fetch role data.");
        }
  
        const roleData = await roleResponse.json();
        dispatch(setRole(roleData));
  
        const profileResponse = await fetch("https://trakies-backend.onrender.com/api/users/getProfile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            email: userEmail,
          },
        });
  
        if (profileResponse.status !== 200) {
          const text = await profileResponse.text();
          console.error("Error fetching profile data:", text);
          throw new Error("Failed to fetch profile data.");
        }
  
        const profileData = await profileResponse.json();
        if (profileData && !profileData.error) {
          dispatch(setProfile(profileData));
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
      setSessionActive(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (response?.type === "success" && response.authentication) {
        const { accessToken } = response.authentication;
        await getUserProfile(accessToken);
        router.replace("(tabs)");
      }
    };
    fetchProfile();
  }, [response]);

  const handleLogin = () => {
    if (!sessionActive) {
      setSessionActive(true);
      promptAsync();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <Image
          style={styles.backgroundImage}
          source="https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
      </View>
      <View style={styles.overlay} />
      <View style={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appTitle}>Trekies.</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLogin}
          style={styles.loginButton}
          disabled={sessionActive}
        >
          <View style={styles.loginButtonContent}>
            {loading ? (
              <ActivityIndicator size={24} color="green" />
            ) : (
              <View style={styles.loginButtonTextContainer}>
                <Ionicons name="logo-google" size={20} color="white" />
                <Text style={styles.loginButtonText}>Login with Google</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImageContainer: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    contentFit: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.08,
  },
  welcomeContainer: {
    marginTop: height * 0.15,
    marginLeft: width * 0.05,
  },
  welcomeText: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "white",
  },
  appTitle: {
    fontSize: width * 0.12,
    fontWeight: "bold",
    color: "white",
  },
  loginButton: {
    width: "100%",
    paddingHorizontal: width * 0.01,
    marginBottom: height * 0.05,
  },
  loginButtonContent: {
    backgroundColor: "rgba(96, 96, 96, 0.8)",
    width: "100%",
    borderRadius: 10,
    paddingVertical: height * 0.02,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  loginButtonTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    spaceX: width * 0.02,
  },
  loginButtonText: {
    color: "white",
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginLeft: width * 0.02,
  },
});

export default Login;
