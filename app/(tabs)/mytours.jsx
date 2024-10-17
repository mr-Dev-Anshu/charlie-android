import { View } from "react-native";
import React from "react";
import { tours } from "../../constants/tours.js";
import MyTourCard from "../../components/UI/MyTourCard";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import LoginReqCard from "../../components/UI/LoginReqCard.jsx";

const mytours = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {user ? (
        <View className="mt-24 h-full w-full flex justify-center items-center">
          <StatusBar
            style="dark"
            backgroundColor="#fff"
            translucent={true}
            animated
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: "100%",
              display: "flex",
              justifyConten: "center",
              alignItems: "center",
              paddingBottom: 60,
              paddingHorizontal: 4,
            }}
          >
            <View className="h-full w-full flex justify-center items-center mt-4 pb-28">
              {tours.map((tour) => (
                <MyTourCard key={tour.id} tour={tour} />
              ))}
            </View>
          </ScrollView>
        </View>
      ) : (
        <LoginReqCard />
      )}
    </>
  );
};

export default mytours;
