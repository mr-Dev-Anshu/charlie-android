import { View, useColorScheme } from "react-native";
import React from "react";
import { tours } from "../../constants/tours.js";
import MyTourCard from "../../components/UI/MyTourCard";
import { ScrollView } from "react-native-gesture-handler";

const mytours = () => {
  const colorScheme = useColorScheme();

  console.log(colorScheme);
  return (
    <View className="mt-24 h-full w-full flex justify-center items-center">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: "100%",
          display: "flex",
          justifyConten: "center",
          alignItems: "center",
        }}
      >
        <View className="h-full w-full flex justify-center items-center mt-4 pb-28">
          {tours.map((tour) => (
            <MyTourCard key={tour.id} tour={tour} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default mytours;
