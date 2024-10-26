import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/helpers";

const tourDetails = () => {
  const { id } = useLocalSearchParams();
  const { tour } = useSelector((state) => state.tour);

  const tourDetail = tour.find((item) => item._id === id);

  const handleDeleteTour = () => {};

  return (
    <View className="flex flex-1 flex-col w-full h-full justify-between items-center">
      <StatusBar
        style="dark"
        backgroundColor="#fff"
        translucent={true}
        animated
      />
      <View className="mt-2 w-full px-4">
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["rgba(240, 101, 2, 0.2)", "rgba(0, 174, 255, 0.2)"]}
          className="rounded-xl"
        >
          <View
            className={`flex flex-row justify-between py-3 px-4 rounded-lg `}
          >
            <View className="space-y-2">
              <Text className={`font-semibold `}>{tourDetail.name}</Text>
              <Text>{formatDate(tourDetail.tour_start)}</Text>
            </View>
            <View className="space-y-2">
              <Text
                className={`font-semibold text-right`}
              >{`${tourDetail.total_seats} Seats`}</Text>
              <Text className={`text-right`}>
                {formatDate(tourDetail.tour_end)}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
      <ScrollView
        contentContainerStyle={{
          marginTop: 10,
          width: "100%",
          paddingBottom: 80,
          paddingHorizontal: 25,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex space-y-5 w-full">
          {DetailTitle.map((detail) => (
            <DetailScreenButton
              key={detail.id}
              title={detail.title}
              href={detail.href}
              id={id}
            />
          ))}
        </View>
      </ScrollView>
      <View className="w-full flex flex-row justify-between items-center h-16 bg-transparent px-6">
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: 165,
            backgroundColor: "#414141",
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Unpublish</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: 165,
            paddingVertical: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "red",
          }}
        >
          <Text style={{ textAlign: "center", color: "red" }}>Delete Tour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DetailTitle = [
  {
    id: 1,
    title: "Tour Details",
    href: "/(addTourDetails)/tourDetails",
  },
  {
    id: 2,
    title: "What is included/not-included",
    href: "/(addTourDetails)/includedNotIncluded",
  },
  {
    id: 3,
    title: "Guests Enrolled",
    href: "/(addTourDetails)/guestsEnrolled",
  },
  {
    id: 4,
    title: "Accomodation/Allocation",
    href: "/(addTourDetails)/accomodation",
  },
  {
    id: 5,
    title: "Transportation Details",
    href: "/(addTourDetails)/transportation",
  },
  {
    id: 6,
    title: "Check Points",
    href: "/(addTourDetails)/checkPoints",
  },
  {
    id: 7,
    title: "Allocated Coordinators",
    href: "/(addTourDetails)/allocatedCoordinators",
  },
  {
    id: 8,
    title: "My Notes",
    href: "/(addTourDetails)/myNotes",
  },
  {
    id: 9,
    title: "Bag Pack & Check-in Baggage",
    href: "/(addTourDetails)/luggage",
  },
];

const DetailScreenButton = ({ title, href, id }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push(`${href}/${id}`)}
      className="py-4 rounded-lg mt-3 w-full bg-white shadow-xl shadow-black/50"
    >
      <View className="flex flex-row justify-between items-center px-2 w-full">
        <Text>{title}</Text>
        <Ionicons size={20} name="chevron-forward-outline" color={"green"} />
      </View>
    </TouchableOpacity>
  );
};

export default tourDetails;
