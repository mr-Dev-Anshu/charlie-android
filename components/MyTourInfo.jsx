import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ListComponent from "./UI/ListComponent";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { accomodationDetails, transportDetails } from "../constants/tours.js";
import AccomodationDetailsElement from "./UI/AccomodationDetailsElement.jsx";
import { router } from "expo-router";
import { formatDate } from "../utils/helpers.js";

const MyTourInfo = ({ tour }) => {
  const {
    tourDetails,
    backpacks,
    notincludeds,
    includeds,
    checkinbagages,
    allocatedAccommodation,
    allocatedTransport,
    accommodation,
    transport
  } = tour;

  console.log("tour--->", transport);
  return (
    <View className={`pb-14 `}>
      <ScrollView
        className="flex h-full"
        contentContainerStyle={{ paddingBottom: 64 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-5">
          <Text className={`text-md font-bold`}>Tour Name</Text>
          <Text className={`text-base mt-2 tracking-wider`}>
            {tourDetails.name}
          </Text>
        </View>
        <View className="mt-4">
          <Text className={`text-md font-bold`}>Description</Text>
          <Text className={`text-base mt-2 tracking-wide text-justify`}>
            {tourDetails.description}
          </Text>
        </View>
        <View className="mt-3">
          <Text className={`text-md font-bold`}>Date</Text>
          <Text className={`text-base mt-2 tracking-wider`}>{`${formatDate(
            tourDetails.tour_start
          )} - ${formatDate(tourDetails.tour_start)}`}</Text>
        </View>
        <View className="px-2 mt-5">
          <View className="flex flex-row justify-left items-center space-x-3">
            <Ionicons name="thumbs-up-outline" size={24} color={"green"} />
            <Text className={`text-md font-semibold`}>What is included ?</Text>
          </View>
          <View className="px-1 mt-3 space-y-2">
            {includeds &&
              includeds.map((i) => (
                <ListComponent
                  key={i._id}
                  icon="checkmark-circle"
                  text={i.item}
                  color={"#0e9c02"}
                />
              ))}
          </View>
        </View>
        <View className="px-2 mt-6">
          <View className="flex flex-row justify-left items-center space-x-3">
            <Ionicons name="thumbs-down-outline" size={24} color={"red"} />
            <Text className={`text-md font-semibold`}>
              What is not included ?
            </Text>
          </View>
          <View className="px-1 mt-3 space-y-2">
            {notincludeds &&
              notincludeds.map((i) => (
                <ListComponent
                  key={i._id}
                  icon="close-circle-outline"
                  text={i.item}
                  color={"red"}
                />
              ))}
          </View>
        </View>
        <View className="px-2 mt-6">
          <View className="flex flex-row justify-left items-center space-x-3">
            <Ionicons name="bag-check-outline" size={24} color={"green"} />
            <Text className={`text-md font-semibold`}>Bag Pack</Text>
          </View>
          <View className="px-1 mt-3 space-y-2">
            {backpacks &&
              backpacks.map((i) => (
                <ListComponent
                  key={i._id}
                  icon="checkmark-circle-outline"
                  text={i.item}
                  color={"gray"}
                />
              ))}
          </View>
        </View>
        <View className="px-2 mt-6">
          <View className="flex flex-row justify-left items-center space-x-3">
            <Ionicons
              name="checkmark-done-circle-outline"
              size={24}
              color={"green"}
            />
            <Text className={`text-md font-semibold`}>Check In Baggage</Text>
          </View>
          <View className="px-1 mt-3 space-y-2">
            {checkinbagages &&
              checkinbagages.map((i) => (
                <ListComponent
                  key={i._id}
                  icon="checkmark-circle-outline"
                  text={i.item}
                  color={"gray"}
                />
              ))}
          </View>
        </View>
        <View className="mt-6 px-2">
          <View className="flex flex-row space-x-2 justify-start items-center my-1 ml-2 ">
            <Ionicons name="bus" size={20} color={"green"} />
            <Text className={`font-bold`}>Transport Details</Text>
          </View>
          <View className="ml-2 mt-2">
            <View className="mt-2">
              <Text className={` mt-2 font-semibold`}>
                {transport[0].busName}
              </Text>
              <Text
                className={`mt-1`}
              >{`Bus No : ${transport[0].busNumber}`}</Text>
            </View>
            <View className="mt-2">
              <Text className={`font-semibold`}>Contact Details</Text>
              <Text
                className={`mt-1`}
              >{`Mob No: ${transport[0].driverNumber}`}</Text>
            </View>
            <View className="mt-2">
              <Text className={`font-semibold`}>Boarding Point</Text>
              <Text
                className={`mt-1`}
              >{`${transportDetails?.up?.boardingPoint}`}</Text>
            </View>
            <View className="mt-2">
              <Text className={`font-semibold`}>Boarding Time</Text>
              <Text
                className={`mt-1`}
              >{`${transportDetails?.up?.boardingTime}`}</Text>
            </View>
            <View className="flex flex-row justify-start space-x-4 items-center mt-2">
              <View className="mt-3 flex flex-row justify-start items-center space-x-2">
                <Ionicons name="images" size={16} color={"green"} />
                <Text className={`font-semibold text-green-600`}>
                  View Bus Images
                </Text>
              </View>
              <View className="mt-3 flex flex-row justify-start items-center space-x-2">
                <Ionicons name="compass" size={16} color={"green"} />
                <Text className={`font-semibold text-green-600`}>
                  View Direction
                </Text>
              </View>
            </View>
            <View className="w-full h-[1px] mt-2" />
          </View>
        </View>
        <View className="mt-6 px-2">
          <View className="flex flex-row space-x-2 justify-start items-center my-1 ml-2 ">
            <Ionicons name="bed" size={20} color={"green"} />
            <Text className={`font-bold`}>Accomodation Details</Text>
          </View>
          <View className="">
            {allocatedAccommodation.map((details, index) => (
              <AccomodationDetailsElement
                key={index}
                details={details}
                accommodation={accommodation}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/tourmates")}
          activeOpacity={0.7}
          className="mt-4 px-2 mx-2 flex flex-row justify-between items-center py-1 rounded-lg bg-white shadow-xl shadow-black/50"
        >
          <View className="flex flex-row  space-x-4 justify-between items-center">
            <Text className="font-semibold text-green-700">
              Know Your Tour-Mates
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="green" />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {}}
          activeOpacity={0.7}
          className=" mt-4 px-2"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["rgba(17, 117, 8, 1)", "rgba(17, 117, 8, 1)"]}
            className="rounded-md w-full flex flex-row justify-between items-center py-2 px-4"
          >
            <View className="flex flex-row  space-x-4 justify-center items-center">
              <FontAwesome6 name="star" size={20} color="white" />
              <Text className="font-semibold text-white">Rating & Reviews</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="white" />
          </LinearGradient>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default MyTourInfo;
