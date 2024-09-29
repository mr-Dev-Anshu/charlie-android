import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Link } from "expo-router";
import { tours } from "../../constants/tours.js";
import MyTourCard from "../../components/UI/MyTourCard";
import { ScrollView } from "react-native-gesture-handler";

const mytours = () => {
  return (
    <View className="mt-28 h-full w-full">
      <ScrollView>
        <View className="h-full w-full flex justify-center items-center mt-4 pb-28 px-5">
          {tours.map((tour) => (
            <MyTourCard key={tour.id} tour={tour} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default mytours;
