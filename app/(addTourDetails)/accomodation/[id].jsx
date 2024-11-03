import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

const Accomodation = () => {
  return (
    <View className="px-3 relative h-full w-full flex justify-start items-center">
      <View>
        {hotels.map((i) => {
          return <AccomodationButton key={i.id} {...i} />;
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          width: "100%",
          justifyContent: "space-between",
          position: "absolute",
          bottom: 16,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            flex: 1,
            backgroundColor: "#ccc",
            padding: 12,
            width: 170,
            borderRadius: 5,
            alignItems: "center",
            marginRight: 5,
          }}
        >
          <Text style={{ color: "black", fontWeight: "400" }}>
            Export Details
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            router.push("(addTourDetails)/addAccomodationForm/123")
          }
          style={{
            flex: 1,
            backgroundColor: "green",
            padding: 12,
            width: 170,
            borderRadius: 5,
            alignItems: "center",
            marginLeft: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "400" }}>
            Add Accomodation
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const hotels = [
  {
    id: 1,
    name: "Sai Krupa Hotel",
    occupancy: 40,
    filled: 23,
  },
  {
    id: 2,
    name: "Sai Dwarka Hotel",
    occupancy: 40,
    filled: 23,
  },
  {
    id: 3,
    name: "Sai Nath Hotel",
    occupancy: 40,
    filled: 23,
  },
];

const AccomodationButton = ({ name, occupancy, filled, id }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.push(`(addTourDetails)/showAccomodationDetails/${id}`)
      }
      className="bg-white shadow-xl shadow-black/50 rounded-lg mt-2"
    >
      <View className="flex flex-row w-full justify-between items-center px-4 py-3">
        <Text>{name}</Text>
        <View className="flex flex-row justify-center items-end">
          <Text className="text-green-700 text-base font-medium">{filled}</Text>
          <Text className="text-xs">/{occupancy}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Accomodation;
