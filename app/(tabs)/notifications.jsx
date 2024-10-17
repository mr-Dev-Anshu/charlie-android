import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Notifications from "../../components/UI/Notifications";
import { StatusBar } from "expo-status-bar";
import { apiRequest } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import LoginReqCard from "../../components/UI/LoginReqCard";

const NotificationsScreen = () => {
  const { user } = useSelector((state) => state.user);

  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const intervalRef = useRef(null);

  const fetchData = async (isInitialFetch = false) => {
    if (isInitialFetch) {
      setInitialLoading(true);
    }
    try {
      const newData = await apiRequest(
        `https://trakies-backend.onrender.com/api/notification/get?email=${user.email}`
      );
      setData(() => {
        const updatedData = [...newData];
        return updatedData;
      });
      if (isInitialFetch) setInitialLoading(false);
    } catch (error) {
      console.log(error);
      setError(error?.message);
    } finally {
      if (isInitialFetch) setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true);

    intervalRef.current = setInterval(() => fetchData(false), 10000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <>
      {user ? (
        <View className="pt-28 h-full w-full px-3">
          <StatusBar
            style="dark"
            backgroundColor="#fff"
            translucent={true}
            animated
          />
          {initialLoading ? (
            <View className="h-full w-full flex justify-center items-center">
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Loading...</Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 44 }}
              className="h-full w-full"
            >
              <View className="mt-1 px-4">
                {data.map((i, idx) => {
                  return (
                    <Notifications
                      key={idx}
                      id={i._id}
                      title={i.title}
                      content={i?.content}
                      seen={i.seen}
                    />
                  );
                })}
              </View>
            </ScrollView>
          )}
        </View>
      ) : (
        <LoginReqCard />
      )}
    </>
  );
};

export default NotificationsScreen;
