import { View } from "react-native";
import React from "react";
import { checkPoints } from "../constants/tours";
import CheckPointElement from "./UI/CheckPointElement";
import { ScrollView } from "react-native-gesture-handler";

const MyTourCheckPointsListView = () => {
  return (
    <View className="pb-14">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:56}}>
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
