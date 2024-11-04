import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const RoomDetails = () => {
  const rooms = [
    { id: "1", name: "Room 1" },
    { id: "2", name: "Room 2" },
    { id: "3", name: "Room 3" },
  ];

  const occupancyOptions = [
    { label: "Single", value: "1" },
    { label: "Double", value: "2" },
    { label: "Triple", value: "3" },
  ];

  const roomTypeOptions = [
    { label: "AC", value: "1" },
    { label: "Non-AC", value: "2" },
    { label: "Executive", value: "3" },
    { label: "Dormitory", value: "4" },
  ];

  // Track dropdown states, values, and open states
  const [dropdownState, setDropdownState] = useState({});

  // Toggle a dropdown while ensuring others are closed
  const toggleDropdown = (roomId, dropdownKey) => {
    setDropdownState((prevState) => {
      // Close all dropdowns except the one being opened
      const updatedState = {};
      Object.keys(prevState).forEach((id) => {
        updatedState[id] = {
          occupancy: false,
          guest: false,
          roomType: false,
          ...prevState[id],
        };
      });

      // Toggle the current dropdown's open state
      return {
        ...updatedState,
        [roomId]: {
          ...updatedState[roomId],
          [dropdownKey]: !prevState[roomId]?.[dropdownKey],
        },
      };
    });
  };

  // Set selected value and close dropdown
  const handleSelect = (roomId, dropdownKey, value) => {
    setDropdownState((prev) => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        [`${dropdownKey}Value`]: value,
        [dropdownKey]: false,
      },
    }));
  };

  const renderRoomItem = ({ item }) => (
    <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
      <View style={{ borderWidth: 1, borderColor: "gray", padding: 8, borderRadius: 8 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text>{item.name}</Text>
          <Ionicons name="trash-outline" color={"red"} size={16} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
          <View style={{ padding: 8, backgroundColor: "white", borderRadius: 8, width: "48%", shadowColor: "black", shadowOpacity: 0.2, shadowRadius: 4 }}>
            <Text style={{ fontSize: 12, color: "gray" }}>Room no</Text>
            <TextInput keyboardType="number-pad" placeholder="Number" style={{ marginTop: 4 }} />
          </View>
          <View style={{ padding: 8, backgroundColor: "white", borderRadius: 8, width: "48%", shadowColor: "black", shadowOpacity: 0.2, shadowRadius: 4, zIndex: dropdownState[item.id]?.occupancy ? 1000 : 1 }}>
            <Text style={{ fontSize: 12, color: "gray" }}>Occupancy</Text>
            <DropDownPicker
              open={dropdownState[item.id]?.occupancy || false}
              value={dropdownState[item.id]?.occupancyValue || null}
              items={occupancyOptions}
              setOpen={() => toggleDropdown(item.id, "occupancy")}
              setValue={(value) => handleSelect(item.id, "occupancy", value)}
              style={{ borderWidth: 0, marginTop: 5 }}
              dropDownContainerStyle={{ borderWidth: 0 }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
          <View style={{ padding: 8, backgroundColor: "white", borderRadius: 8, width: "48%", shadowColor: "black", shadowOpacity: 0.2, shadowRadius: 4, zIndex: dropdownState[item.id]?.guest ? 1000 : 1 }}>
            <Text style={{ fontSize: 12, color: "gray" }}>Guest</Text>
            <DropDownPicker
              open={dropdownState[item.id]?.guest || false}
              value={dropdownState[item.id]?.guestValue || null}
              items={roomTypeOptions}
              setOpen={() => toggleDropdown(item.id, "guest")}
              setValue={(value) => handleSelect(item.id, "guest", value)}
              style={{ borderWidth: 0, marginTop: 5 }}
              dropDownContainerStyle={{ borderWidth: 0 }}
            />
          </View>
          <View style={{ padding: 8, backgroundColor: "white", borderRadius: 8, width: "48%", shadowColor: "black", shadowOpacity: 0.2, shadowRadius: 4, zIndex: dropdownState[item.id]?.roomType ? 1000 : 1 }}>
            <Text style={{ fontSize: 12, color: "gray" }}>Room Type</Text>
            <DropDownPicker
              open={dropdownState[item.id]?.roomType || false}
              value={dropdownState[item.id]?.roomTypeValue || null}
              items={roomTypeOptions}
              setOpen={() => toggleDropdown(item.id, "roomType")}
              setValue={(value) => handleSelect(item.id, "roomType", value)}
              style={{ borderWidth: 0, marginTop: 5 }}
              dropDownContainerStyle={{ borderWidth: 0 }}
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
      <View style={{ backgroundColor: "white", padding: 8, borderRadius: 8, shadowColor: "black", shadowOpacity: 0.2, shadowRadius: 4 }}>
        <Text style={{ fontSize: 10, color: "gray" }}>Guest House Name</Text>
        <TextInput style={{ fontSize: 14, marginTop: 4 }} placeholder="Enter guest house name" />
      </View>
      <View style={{ backgroundColor: "white", padding: 8, borderRadius: 8, marginTop: 8, shadowColor: "black", shadowOpacity: 0.2, shadowRadius: 4 }}>
        <Text style={{ fontSize: 10, color: "gray" }}>Location</Text>
        <TextInput style={{ fontSize: 14, marginTop: 4 }} placeholder="Enter location" />
      </View>
      <View style={{ backgroundColor: "white", padding: 8, borderRadius: 8, marginTop: 8, shadowColor: "black", shadowOpacity: 0.2, shadowRadius: 4 }}>
        <Text style={{ fontSize: 10, color: "gray" }}>Number of rooms</Text>
        <TextInput style={{ fontSize: 14, marginTop: 4 }} placeholder="Enter number of rooms" />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          backgroundColor: "green",
          paddingVertical: 12,
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Add Guest House</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: "start", alignItems: "center", width: "100%" }}>
      <FlatList
        data={rooms}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 120 }}
        style={{ width: "100%" }}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RoomDetails;