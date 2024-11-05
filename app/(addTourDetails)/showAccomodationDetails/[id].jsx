import {
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import AllocatedRoomCard from "../../../components/UI/AllocatedRoomCard";
import ModalBody from "../../../components/UI/ModalBody";
import { transformAllocationData } from "../../../utils/helpers";
import { all } from "axios";

const { width, height } = Dimensions.get("window");

const showAccomodationDetails = () => {
  const { id, tourId } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  const [guests, setGuests] = useState([]);

  const [loading, setLoading] = useState(false);
  const [allocations, setAllocations] = useState([]);

  const getBookedUsers = async () => {
    try {
      const response = await fetch(
        `https://trakies-backend.onrender.com/api/booking/get?id=${tourId}`
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch booked users");
      }

      const result = await response.json();
      setGuests(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllocations = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://trakies-backend.onrender.com/api/allocated/get?tourId=${tourId}`
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch allocations");
      }

      const result = await response.json();
      const data = transformAllocationData(result);
      setAllocations(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Something Went Wrong.", "Failed to fetch allocations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookedUsers();
    getAllocations();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <View className="h-full w-full justify-start items-center relative">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        style={{ width: "100%", paddingHorizontal: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {allocations.length === 0 ? (
          <View className="w-full flex justify-center items-center mt-4">
            <Text className="text-gray-500">No allocations yet.</Text>
          </View>
        ) : (
          <>
            {allocations.map((allocation) => (
              <AllocatedRoomCard
                key={`${allocation.roomNo}-${allocation.roomType}`}
                allocation={allocation}
                getAllocations={getAllocations}
              />
            ))}
          </>
        )}
      </ScrollView>
      <View className="w-full absolute bottom-2 h-12 flex justify-center items-center">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}
          style={{
            width: 270,
            backgroundColor: "green",
            borderRadius: 6,
            paddingVertical: 12,
            display: "flex",
            justifyContentL: "center",
            alignItems: "center",
          }}
        >
          <Text className="text-white font-medium">Allocate Room</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: width * 0.9,
              padding: 16,
              backgroundColor: "white",
              borderRadius: 10,
              elevation: 8,
            }}
          >
            <ModalBody
              guests={guests}
              setModalVisible={setModalVisible}
              tourId={tourId}
              accommodationId={id}
              getAllocations={getAllocations}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default showAccomodationDetails;
