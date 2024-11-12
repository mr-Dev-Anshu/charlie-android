import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

const Accomodation = () => {
  const { id } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);

  const [guestHouses, setGuestHouses] = useState([]);

  const getAllGuestHouses = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/accommodation/get?tourId=${id}`
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch guest houses");
      }
      const data = await response.json();
      setGuestHouses(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch guest houses");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getAllGuestHouses();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 12,
        flex: 1,
        alignItems: "center",
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{
          paddingHorizontal: 6,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            width: "100%",
            marginTop: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {guestHouses.map((i) => (
            <AccomodationButton key={i._id} tourId={id} {...i} />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          width: "100%",
          justifyContent: "space-between",
          position: "absolute",
          bottom: 16,
          paddingHorizontal: 12,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            flex: 1,
            backgroundColor: "#ccc",
            paddingVertical: 12,
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
            router.push(`(addTourDetails)/addAccomodationForm/${id}`)
          }
          style={{
            flex: 1,
            backgroundColor: "green",
            paddingVertical: 12,
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
  { id: 1, name: "Sai Krupa Hotel", occupancy: 40, filled: 23 },
  { id: 2, name: "Sai Dwarka Hotel", occupancy: 40, filled: 23 },
  { id: 3, name: "Sai Nath Hotel", occupancy: 40, filled: 23 },
];

const AccomodationButton = ({
  guestHouseName,
  totalOccupancy,
  _id,
  tourId,
  allocatedCount,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.push(
          `(addTourDetails)/showAccomodationDetails/${_id}?tourId=${tourId}`
        )
      }
      style={{
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 8,
        marginTop: 10,
        width: width * 0.9,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Text>{guestHouseName}</Text>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text style={{ color: "green", fontSize: 16, fontWeight: "500" }}>
            {allocatedCount}
          </Text>
          <Text style={{ fontSize: 12 }}>/{totalOccupancy}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Accomodation;
