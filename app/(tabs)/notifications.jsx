import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Notifications from "../../components/UI/Notifications";
import { StatusBar } from "expo-status-bar";
import { apiRequest } from "../../utils/helpers";
import { useSelector } from "react-redux";

const notifications = () => {
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await apiRequest(
        `https://trakies-backend.onrender.com/api/notification/get?email=${user.email}`
      );
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);
  return (
    <View className="pt-28 h-full w-full px-3">
      <StatusBar
        style="dark"
        backgroundColor="#fff"
        translucent={true}
        animated
      />
      {loading ? (
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
  );
};

export default notifications;
