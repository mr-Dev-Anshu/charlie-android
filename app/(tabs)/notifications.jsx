import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Notifications from "../../components/UI/Notifications";
import { StatusBar } from "expo-status-bar";
import { apiRequest } from "../../utils/helpers";
import { useSelector } from "react-redux";
import LoginReqCard from "../../components/UI/LoginReqCard";

const { width, height } = Dimensions.get("window");

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
        <View style={styles.container}>
          <StatusBar
            style="dark"
            backgroundColor="#fff"
            translucent={true}
            animated
          />
          {initialLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="green" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            >
              <View style={styles.notificationsContainer}>
                {data.map((i, idx) => (
                  <Notifications
                    key={idx}
                    id={i._id}
                    title={i.title}
                    content={i?.content}
                    seen={i.seen}
                  />
                ))}
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

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.1,
    flex: 1,
    width: "100%",
    paddingHorizontal: width * 0.03,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: width * 0.05,
    marginTop: height * 0.01,
    color: "#000",
  },
  scrollContainer: {
    paddingBottom: height * 0.06,
  },
  notificationsContainer: {
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
});

export default NotificationsScreen;
