import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { tours } from "../../constants/tours.js";
import MyTourCard from "../../components/UI/MyTourCard";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import LoginReqCard from "../../components/UI/LoginReqCard.jsx";
import { setBookedTour } from "../../redux/slices/tourSlice";

const mytours = () => {
  const { user } = useSelector((state) => state.user);
  const { bookedTour } = useSelector((state) => state.tour);

  const dispatch = useDispatch();

  const getAllBookedTours = async () => {
    try {
      const res = await fetch(
        `https://trakies-backend.onrender.com/api/booking/get-my-tour?email=${user.email}`
      );

      if (res.status !== 200) {
        console.log("Failed to get my tours", res);
        throw new Error("Failed to get my tour");
      }

      const resData = await res.json();
      dispatch(setBookedTour(resData.data));
    } catch (error) {
      console.log("Failed to get my tours", error);
    }
  };

  useEffect(() => {
    getAllBookedTours();
  }, []);

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
              {bookedTour.map((tour, idx) => (
                <MyTourCard
                  key={idx}
                  tour={tour.tourDetails}
                  status={tour.status}
                />
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
