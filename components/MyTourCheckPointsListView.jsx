import { View } from "react-native";
import React from "react";
import CheckPointElement from "./UI/CheckPointElement";
import { ScrollView } from "react-native-gesture-handler";

const MyTourCheckPointsListView = ({ checkPoints }) => {
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
          <CheckPointElement key={index} points={points} index={index} tourId />
        ))}
      </View>
    </ScrollView>
  );
};

export default MyTourCheckPointsListView;
