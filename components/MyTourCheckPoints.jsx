import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

const MyTourCheckPoints = () => {
  return (
    <View>
      <View className="rounded-xl overflow-hidden">
        <MapView className="h-[700px] w-[400px] rounded-xl" />
      </View> 
    </View>
  );
};

export default MyTourCheckPoints;
