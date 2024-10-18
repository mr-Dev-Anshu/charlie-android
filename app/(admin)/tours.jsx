import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { createdTours } from "../../constants/tours";
import TourCard from "../../components/admin/UI/TourCard";
import { router } from "expo-router";

const Tours = () => {
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
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingBottom: 200,
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          {createdTours.map((tour, index) => (
            <TourCard key={index} tour={tour} />
          ))}
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
