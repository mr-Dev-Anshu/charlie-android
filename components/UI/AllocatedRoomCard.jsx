import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import edit from "../../assets/edit.svg";
import { Image } from "expo-image";

const AllocatedRoomCard = ({ allocation }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "gray",
        padding: 8,
        borderRadius: 8,
        marginTop: 16,
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
        <View className="flex flex-row justify-center items-center space-x-5 pr-2">
          <TouchableOpacity activeOpacity={0.5}>
            <Image source={edit} className="w-4 h-4" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="trash-outline" color={"red"} size={16} />
          </TouchableOpacity>
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
          <Text style={{ fontSize: 12, color: "gray" }}>Room no</Text>
          <Text style={{ marginTop: 4, fontSize: 14, color: "black" }}>
            {allocation?.roomNo}
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
            {allocation?.occupancy}
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
            {allocation?.guestNames
              .map((guest) => guest.split(" ")[0])
              .join(",  ")}
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
            {allocation?.roomType}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AllocatedRoomCard;
