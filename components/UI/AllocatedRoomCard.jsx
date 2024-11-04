import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const AllocatedRoomCard = () => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "gray",
        padding: 8,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Room 1</Text>
        <Ionicons name="trash-outline" color={"red"} size={16} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <View
          style={{
            padding: 8,
            backgroundColor: "white",
            borderRadius: 8,
            width: "48%",
            shadowColor: "black",
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 12, color: "gray" }}>Room no</Text>
          <Text style={{ marginTop: 4, fontSize: 14, color: "black" }}>
            101
          </Text>
        </View>
        <View
          style={{
            padding: 8,
            backgroundColor: "white",
            borderRadius: 8,
            width: "48%",
            shadowColor: "black",
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 12, color: "gray" }}>Occupancy</Text>
          <Text style={{ marginTop: 4, fontSize: 14, color: "black" }}>
            Double
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <View
          style={{
            padding: 8,
            backgroundColor: "white",
            borderRadius: 8,
            width: "48%",
            shadowColor: "black",
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 12, color: "gray" }}>Guest</Text>
          <Text style={{ marginTop: 4, fontSize: 14, color: "black" }}>
            Executive
          </Text>
        </View>
        <View
          style={{
            padding: 8,
            backgroundColor: "white",
            borderRadius: 8,
            width: "48%",
            shadowColor: "black",
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 12, color: "gray" }}>Room Type</Text>
          <Text style={{ marginTop: 4, fontSize: 14, color: "black" }}>
            Non-AC
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AllocatedRoomCard;
