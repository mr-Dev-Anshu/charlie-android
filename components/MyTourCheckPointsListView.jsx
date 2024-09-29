import { View, Text } from "react-native";
import React from "react";
import { checkPoints } from "../constants/tours";
import CheckPointElement from "./UI/CheckPointElement";
import { ScrollView } from "react-native-gesture-handler";

const MyTourCheckPointsListView = () => {
  return (
    <View className="pb-32">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {checkPoints.map((points, index) => (
            <CheckPointElement key={index} points={points} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyTourCheckPointsListView;
