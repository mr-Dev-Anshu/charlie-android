import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const CustomBackButton = ({ icon }) => {
  return (
    <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
      <Ionicons name={icon} size={24} color={"green"} />
    </TouchableOpacity>
  );
};

export default CustomBackButton;
