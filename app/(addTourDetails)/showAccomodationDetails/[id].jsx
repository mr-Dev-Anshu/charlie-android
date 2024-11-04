import { View, Text, TextInput, Modal, Dimensions } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import AllocatedRoomCard from "../../../components/UI/AllocatedRoomCard";
import ModalBody from "../../../components/UI/ModalBody";

const { width, height } = Dimensions.get("window");

const showAccomodationDetails = () => {
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  console.log(id);

  return (
    <View className="h-full w-full justify-start items-center relative">
      <AllocatedRoomCard />
      <View className="w-full absolute bottom-8 h-12 flex justify-center items-center bg-red-600">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}
          style={{
            width: 270,
            backgroundColor: "green",
            borderRadius: 6,
            paddingVertical: 10,
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
              shadowColor: "black",
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 8,
            }}
          >
            <ModalBody setModalVisible={setModalVisible} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 16,
                zIndex: openDropdown === "" ? 1000 : 1,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: "gray",
                  paddingVertical: 10,
                  borderRadius: 8,
                  width: 120,
                  marginHorizontal: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "green",
                  paddingVertical: 10,
                  borderRadius: 8,
                  width: 120,
                  marginHorizontal: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default showAccomodationDetails;
