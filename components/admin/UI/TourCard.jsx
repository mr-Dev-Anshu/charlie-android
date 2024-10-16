import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { shorten } from "../../UI/PostComponent";

const TourCard = ({ tour }) => {
  return (
    <Link
      className="w-full flex flex-1 justify-center items-center mt-3"
      push
      href={`/tour/${tour.id}`}
    >
      <View className="flex flex-row justify-between h-[150px] w-[360px] bg-white shadow-xl shadow-black rounded-lg mt-3 p-2 ">
        <View>
          <Text className="text-xl font-medium text-gray-700">
            {shorten(tour.name, 15)}
          </Text>
          <View className="flex flex-row mt-4 space-x-2 justify-start items-center">
            <Ionicons name="calendar-outline" size={16} color="black" />
            <Text className="font-medium">{tour.date}</Text>
          </View>
          <View className="flex flex-row justify-start items-center space ml-4 mt-4">
            {tour.enrolledMemberProfileImgs?.map((image, index) => (
              <Image
                key={index}
                source={image}
                className="h-9 w-9 -ml-3 rounded-full border-2 border-white"
              />
            ))}
            <Text className="ml-2 text-green-700 font-medium">{`+ more`}</Text>
          </View>
        </View>
        <View className="flex justify-start items-end">
          <View>
            <Text className="text-gray-600 font-medium">Seats Booked</Text>
            <View className="flex flex-row justify-end items-center mt-2">
              <Text className="text-3xl font-medium text-green-700">{`${tour.bookedSeats}`}</Text>
              <Text className="-mb-1 text-lg font-medium">{`/${tour.seats}`}</Text>
            </View>
          </View>
          <View className="mt-8 bg-green-700/20 px-4 py-1 rounded-full">
            <Text className="font-medium capitalize text-green-600">
              {tour.status}
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );
};

export default TourCard;
