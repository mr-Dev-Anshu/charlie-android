import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setProfile, setRole, setUser } from "../redux/slices/userSlice";
import Loader from '../components/common/Loader';
import { Redirect, useRouter } from 'expo-router';

const index = () => {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const router= useRouter()

    const dispatch = useDispatch();
    const loadUserData = async () => {
      setLoading(true)
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          dispatch(setUser(userData));
          setAuthenticated(true)
          const userEmail = userData?.email;
  
          if (userEmail) {
            const roleResponse = await fetch(
              `${process.env.EXPO_PUBLIC_BASE_URL}/api/users/signin`,
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
              `${process.env.EXPO_PUBLIC_BASE_URL}/api/users/getProfile`,
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
          setAuthenticated(false)
        }
        console.log("User data loaded successfully");
      } catch (error) {
        console.error("Error loading user data:", error);
      }finally {
        setLoading(false)
      }
    };

    useEffect(()=> {
        loadUserData()
    }, [])

    if(loading) return <Loader/>

    if(!authenticated) return <Redirect href={"login"}/>

    return <Redirect href={"(tabs)/index"}/>
}

export default index