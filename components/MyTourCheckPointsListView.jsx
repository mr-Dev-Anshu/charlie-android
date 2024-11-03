import { Text, View } from "react-native";
import React from "react";
import CheckPointElement from "./UI/CheckPointElement";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const MyTourCheckPointsListView = ({ checkPoints, handleGetCheckPoints }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 120,
        paddingHorizontal: 5,
      }}
    >
      <View>
        {checkPoints && checkPoints.length > 0 ? (
          checkPoints.map((points, index) => (
            <CheckPointElement
              key={index}
              points={points}
              index={index}
              handleGetCheckPoints={handleGetCheckPoints}
            />
          ))
        ) : (
          <View
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Ionicons
              name="navigate-circle-outline"
              size={48}
              color={"green"}
            />
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 4 }}>
              No checkpoints added yet
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MyTourCheckPointsListView;
