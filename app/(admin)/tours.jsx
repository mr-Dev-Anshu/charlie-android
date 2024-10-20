import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import TourCard from "../../components/admin/UI/TourCard";
import { router } from "expo-router";
import { useSelector } from "react-redux";

const Tours = () => {
  const { tour } = useSelector((state) => state.tour);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 112,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "start",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingBottom: 200,
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full h-fit flex justify-start">
          {tour.map((item) => {
            return <TourCard key={item._id} tour={item} />;
          })}
        </View>
      </ScrollView>
      <View className="absolute bottom-0 w-full px-6 py-3 bg-white">
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full bg-green-700 flex justify-center items-center py-3 rounded-lg"
          onPress={() => router.push("/addTours")}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Create Tour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tours;
