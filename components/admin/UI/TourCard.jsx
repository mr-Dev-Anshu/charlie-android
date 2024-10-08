import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";


const TourCard = ({ tour }) => {
  return (
    <View className="flex flex-row justify-between h-[150px] w-full bg-white shadow-lg shadow-black/20 rounded-lg mt-3 p-2 ">
      <View>
        <Text className="text-xl font-bold text-gray-700">{tour.name}</Text>
        <View className="flex flex-row mt-4 space-x-2 justify-start items-center">
          <Ionicons name="calendar-outline" size={16} color="black" />
          <Text className="font-semibold">{tour.date}</Text>
        </View>
        <View className="flex flex-row justify-start items-center space ml-4 mt-4">
          {tour.enrolledMemberProfileImgs?.map((image, index) => (
            <Image
              key={index}
              source={image}
              className="h-9 w-9 -ml-3 rounded-full border-2 border-white"
            />
          ))}
          <Text className="ml-2 text-green-700 font-semibold">{`+ more`}</Text>
        </View>
      </View>
      <View className="flex justify-start items-end">
        <View>
          <Text className="text-gray-600 font-semibold">Seats Booked</Text>
          <View className="flex flex-row justify-end items-center mt-2">
            <Text className="text-3xl font-semibold text-green-700">{`${tour.bookedSeats}`}</Text>
            <Text className="-mb-1 text-lg font-semibold">{`/${tour.seats}`}</Text>
          </View>
        </View>
        <View className="mt-8 bg-green-700/20 px-4 py-1 rounded-full">
          <Text className="font-semibold capitalize text-green-600">
            {tour.status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TourCard;
