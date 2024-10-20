import { View } from "react-native";
import React from "react";
import { checkPoints } from "../constants/tours";
import CheckPointElement from "./UI/CheckPointElement";
import { ScrollView } from "react-native-gesture-handler";

const MyTourCheckPointsListView = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 120,
        paddingHorizontal: 5,
      }}
    >
      <View>
        {checkPoints.map((points, index) => (
          <CheckPointElement key={index} points={points} />
        ))}
      </View>
    </ScrollView>
  );
};

export default MyTourCheckPointsListView;
