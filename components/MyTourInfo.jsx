import React from "react";
import { Text, View, useColorScheme } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import ListComponent from "./UI/ListComponent";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { accomodationDetails, transportDetails } from "../constants/tours.js";
import AccomodationDetailsElement from "./UI/AccomodationDetailsElement.jsx";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

const MyTourInfo = ({ tour }) => {
  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "text-white" : "text-black";
  const bgColor = colorScheme === "dark" ? "black" : "white";
  const accentBgColor = colorScheme === "dark" ? "bg-gray-800" : "white";

  return (
    <View className={`pb-14 ${bgColor}`}>
      <ScrollView
        className="flex h-full"
        contentContainerStyle={{ paddingBottom: 64 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-5">
          <Text className={`text-base font-bold ${textColor}`}>Tour Name</Text>
          <Text className={`text-md mt-2 tracking-wider ${textColor}`}>
            {tour.name}
          </Text>
        </View>
        <View className="mt-4">
          <Text className={`text-base font-bold ${textColor}`}>
            Description
          </Text>
          <Text className={`text-md mt-2 tracking-wider ${textColor}`}>
            {tour.info}
          </Text>
        </View>
        <View className="mt-3">
          <Text className={`text-base font-bold ${textColor}`}>Date</Text>
          <Text className={`text-md mt-2 tracking-wider ${textColor}`}>
            {tour.date}
          </Text>
        </View>
        <View className="px-2 mt-5">
          <View className="flex flex-row justify-left items-center space-x-3">
            <Ionicons name="thumbs-up-outline" size={24} color={"green"} />
            <Text className={`text-md font-semibold ${textColor}`}>
              What is included ?
            </Text>
          </View>
          <View className="px-1 mt-3 space-y-2">
            <ListComponent
              icon="checkmark-circle"
              text="Food"
              color={"#0e9c02"}
            />
            <ListComponent
              icon="checkmark-circle"
              text="Accomodation"
              color={"#0e9c02"}
            />
            <ListComponent
              icon="checkmark-circle"
              text="Guide"
              color={"#0e9c02"}
            />
            <ListComponent
              icon="checkmark-circle"
              text="Transportation"
              color={"#0e9c02"}
            />
          </View>
        </View>
        <View className="px-2 mt-6">
          <View className="flex flex-row justify-left items-center space-x-3">
            <Ionicons name="thumbs-down-outline" size={24} color={"red"} />
            <Text className={`text-md font-semibold ${textColor}`}>
              What is not included ?
            </Text>
          </View>
          <View className="px-1 mt-3 space-y-2">
            <ListComponent
              icon="close-circle-outline"
              text="Food"
              color={"red"}
            />
            <ListComponent
              icon="close-circle-outline"
              text="Accomodation"
              color={"red"}
            />
            <ListComponent
              icon="close-circle-outline"
              text="Guide"
              color={"red"}
            />
            <ListComponent
              icon="close-circle-outline"
              text="Transportation"
              color={"red"}
            />
          </View>
        </View>
        <View className="px-2 mt-6">
          <View className="flex flex-row justify-left items-center space-x-3">
            <Ionicons name="bag-check-outline" size={24} color={"green"} />
            <Text className={`text-md font-semibold ${textColor}`}>
              Bag Pack
            </Text>
          </View>
          <View className="px-1 mt-3 space-y-2">
            <ListComponent
              icon="checkmark-circle-outline"
              text="Food"
              color={"gray"}
            />
            <ListComponent
              icon="checkmark-circle-outline"
              text="Accomodation"
              color={"gray"}
            />
            <ListComponent
              icon="checkmark-circle-outline"
              text="Guide"
              color={"gray"}
            />
            <ListComponent
              icon="checkmark-circle-outline"
              text="Transportation"
              color={"gray"}
            />
          </View>
        </View>
        <View className="px-2 mt-6">
          <View className="flex flex-row justify-left items-center space-x-3">
            <Ionicons
              name="checkmark-done-circle-outline"
              size={24}
              color={"green"}
            />
            <Text className={`text-md font-semibold ${textColor}`}>
              Check In Baggage
            </Text>
          </View>
          <View className="px-1 mt-3 space-y-2">
            <ListComponent
              icon="checkmark-circle-outline"
              text="Water Bottle"
              color={"gray"}
            />
            <ListComponent
              icon="checkmark-circle-outline"
              text="Trekking Boots"
              color={"gray"}
            />
            <ListComponent
              icon="checkmark-circle-outline"
              text="Rain Coat"
              color={"gray"}
            />
            <ListComponent
              icon="checkmark-circle-outline"
              text="Warm Clothes"
              color={"gray"}
            />
          </View>
        </View>
        <View className="mt-6 px-2">
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={
              colorScheme === "dark"
                ? ["rgba(10, 110, 1, 1)", "rgba(255, 255, 255, 0.2)"]
                : ["rgba(10, 110, 1, 1)", "rgba(0, 0, 0, 1)"]
            }
            className="rounded-l-md"
          >
            <View className="flex flex-row space-x-2 justify-start items-center my-1 ml-2 ">
              <Ionicons name="bus" size={20} color={"white"} />
              <Text className={`font-bold ${textColor}`}>
                Transport Details
              </Text>
            </View>
          </LinearGradient>
          <View className="ml-2 mt-2">
            <View className="mt-2">
              <Text
                className={`${textColor}`}
              >{`From ${transportDetails?.up?.from} to ${transportDetails?.up?.to}`}</Text>
              <Text className={`${textColor} mt-2 font-semibold`}>
                {transportDetails?.up?.busName}
              </Text>
              <Text
                className={`mt-1 ${textColor}`}
              >{`Bus No : ${transportDetails?.up?.busNumber}`}</Text>
            </View>
            <View className="mt-2">
              <Text className={`font-semibold ${textColor}`}>
                Contact Details
              </Text>
              <Text
                className={`mt-1 ${textColor}`}
              >{`Mob No: ${transportDetails?.up?.contact}`}</Text>
            </View>
            <View className="mt-2">
              <Text className={`font-semibold ${textColor}`}>
                Boarding Point
              </Text>
              <Text
                className={`mt-1 ${textColor}`}
              >{`${transportDetails?.up?.boardingPoint}`}</Text>
            </View>
            <View className="mt-2">
              <Text className={`font-semibold ${textColor}`}>
                Boarding Time
              </Text>
              <Text
                className={`mt-1 ${textColor}`}
              >{`${transportDetails?.up?.boardingTime}`}</Text>
            </View>
            <View className="flex flex-row justify-start space-x-4 items-center mt-2">
              <View className="mt-3 flex flex-row justify-start items-center space-x-2">
                <Ionicons
                  name="images"
                  size={16}
                  color={ "green"}
                />
                <Text
                  className={`font-semibold text-green-600`}
                >
                  View Bus Images
                </Text>
              </View>
              <View className="mt-3 flex flex-row justify-start items-center space-x-2">
                <Ionicons
                  name="compass"
                  size={16}
                  color={ "green"}
                />
                <Text
                  className={`font-semibold text-green-600`}
                >
                  View Direction
                </Text>
              </View>
            </View>
            <View
              className="w-full h-[1px] mt-2"
              style={{
                backgroundColor: colorScheme === "dark" ? "white" : "green",
              }}
            />
          </View>
          <View className="ml-2 mt-2">
            <View className="mt-2">
              <Text
                className={`${textColor}`}
              >{`From ${transportDetails?.down?.from} to ${transportDetails?.down?.to}`}</Text>
              <Text className={`mt-2 font-semibold ${textColor}`}>
                {transportDetails?.down?.busName}
              </Text>
              <Text
                className={`mt-1 ${textColor}`}
              >{`Bus No : ${transportDetails?.down?.busNumber}`}</Text>
            </View>
            <View className="mt-2">
              <Text className={`font-semibold ${textColor}`}>
                Contact Details
              </Text>
              <Text
                className={`mt-1 ${textColor}`}
              >{`Mob No: ${transportDetails?.down?.contact}`}</Text>
            </View>
            <View className="mt-2">
              <Text className={`font-semibold ${textColor}`}>
                Boarding Point
              </Text>
              <Text
                className={`mt-1 ${textColor}`}
              >{`${transportDetails?.down?.boardingPoint}`}</Text>
            </View>
            <View className="mt-2">
              <Text className={`font-semibold ${textColor}`}>
                Boarding Time
              </Text>
              <Text
                className={`mt-1 ${textColor}`}
              >{`${transportDetails?.down?.boardingTime}`}</Text>
            </View>
          </View>
        </View>
        <View className="mt-6 px-2">
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["rgba(10, 110, 1, 1)", "rgba(255, 255, 255, 0.2)"]}
            className="rounded-l-md"
          >
            <View className="flex flex-row space-x-2 justify-start items-center my-1 ml-2 ">
              <Ionicons name="bed" size={20} color={"white"} />
              <Text className={`font-bold ${textColor}`}>
                Accomodation Details
              </Text>
            </View>
          </LinearGradient>
          <View className="">
            {accomodationDetails.map((details, index) => (
              <AccomodationDetailsElement key={index} details={details} />
            ))}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/tourmates")}
          activeOpacity={0.7}
          className="mt-4 px-2"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["rgba(17, 117, 8, 1)", "rgba(17, 117, 8, 1)"]}
            className="rounded-md w-full flex flex-row justify-between items-center py-2 px-4"
          >
            <View className="flex flex-row  space-x-4 justify-center items-center">
              <FontAwesome6 name="person-hiking" size={20} color="white" />
              <Text className="font-semibold text-white">
                Know Your Tour-Mates
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="white" />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
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
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MyTourInfo;
