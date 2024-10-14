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
          paddingHorizontal:16
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          {createdTours.map((tour, index) => (
            <TourCard key={index} tour={tour} />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 12,
          paddingVertical: 8,
          position: "absolute",
          bottom:0,
          backgroundColor: "white",
          gap:24
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/addTours")}
        >
          <View
            style={{
              backgroundColor: "green",
              paddingVertical: 8,
              borderRadius: 10,
              width: 160,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              Add Tour
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/addRoles")}
        >
          <View
            style={{
              backgroundColor: "green",
              paddingVertical: 8,
              borderRadius: 10,
              width: 160,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              Add Roles
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tours;