import { View, Text } from "react-native";
import React from "react";
import { createdTours } from "../../constants/tours";
import TourCard from "../../components/admin/UI/TourCard";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

const tours = () => {
  return (
    <View className="mt-28 h-full relative flex justify-center items-center">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {createdTours.map((tour, index) => (
            <TourCard key={index} tour={tour} />
          ))}
          {createdTours.map((tour, index) => (
            <TourCard key={index} tour={tour} />
          ))}
        </View>
      </ScrollView>
      <View
        className={`flex flex-row justify-between items-center w-full px-3 py-2 mx-1 absolute bottom-28`}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/addTours")}
        >
          <View className="bg-green-600 py-2 rounded-xl flex justify-center items-center w-[180px]">
            <Text className="text-white text-lg font-semibold">Add Tour</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/addRoles")}
        >
          <View className="bg-green-600 py-2 rounded-xl flex justify-center items-center w-[180px]">
            <Text className="text-white text-lg font-semibold">Add Roles</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default tours;
