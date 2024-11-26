import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

const BusMates = () => {
  const { id } = useLocalSearchParams();

  const [mates, setMates] = useState([]);

  const getMates = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/allocatedTransport/getByBus?busNumber=${id}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to get bus mates.");
      }
      const result = await response.json();
      setMates(result);
    } catch (error) {
      console.log("error:", error);
    }
  };

  console.log("mates--->", mates);

  useEffect(() => {
    getMates();
  }, []);

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default BusMates;
