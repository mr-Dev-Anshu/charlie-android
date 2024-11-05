import { Tabs, router } from "expo-router";
import React, { useEffect } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "@/components/common/Header";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setProfile, setRole, setUser } from "../../redux/slices/userSlice";

export default function TabLayout() {

  const dispatch = useDispatch();
  const loadUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        dispatch(setUser(userData));

        const userEmail = userData?.email;

        if (userEmail) {
          const roleResponse = await fetch(
            "https://trakies-backend.onrender.com/api/users/signin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: userEmail }),
            }
          );
  
          if (roleResponse.status !== 200) {
            console.error("Error fetching role data");
            throw new Error("Failed to fetch role data.");
          }
  
          const roleData = await roleResponse.json();
          dispatch(setRole(roleData));
  
          const profileResponse = await fetch(
            "https://trakies-backend.onrender.com/api/users/getProfile",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                email: userEmail,
              },
            }
          );
  
          if (profileResponse.status !== 200) {
            console.error("Error fetching profile data");
            throw new Error("Failed to fetch profile data.");
          }
  
          const profileData = await profileResponse.json();
          if (profileData && !profileData.error) {
            dispatch(setProfile(profileData));
          }
        }
      } else {
        router.push("/login");
      }
      console.log("User data loaded successfully");
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <Tabs
      screenOptions={() => ({
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        headerShown: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          paddingBottom: 5,
        },
        tabBarStyle: {
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
        },
        header: () => <Header />,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              name={focused ? "house" : "house"}
              size={24}
              color={focused ? "green" : "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="mytours"
        options={{
          title: "My Tours",
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              name="person-hiking"
              size={24}
              color={focused ? "green" : "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={"chatbubbles"}
              size={24}
              color={focused ? "green" : "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ focused }) => (
            <Octicons
              name={"bell-fill"}
              size={24}
              color={focused ? "green" : "black"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
