import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

const ModalBody = ({ guests, setGuests, setModalVisible }) => {
  const [occupancyValue, setOccupancyValue] = useState("");
  const [occupancyOptions, setOccupancyOptions] = useState([
    { label: "Single", value: "1" },
    { label: "Double", value: "2" },
    { label: "Triple", value: "3" },
  ]);

  const [roomTypeValue, setRoomTypeValue] = useState("");
  const [roomTypeOptions, setRoomTypeOptions] = useState([
    { label: "Single", value: "1" },
    { label: "Double", value: "2" },
    { label: "Triple", value: "3" },
  ]);

  const [guestsValue, setGuestsValue] = useState("");
  const [guestsOptions, setGuestsOptions] = useState([
    { label: "Single", value: "1" },
    { label: "Double", value: "2" },
    { label: "Triple", value: "3" },
  ]);

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleOpen = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <View
      style={{
        backgroundColor: "white",
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
          zIndex: openDropdown === "occupancy" ? 1000 : 1,
        }}
      >
        <View
          style={{
            padding: 8,
            backgroundColor: "white",
            borderRadius: 8,
            width: "48%",
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 12, color: "gray" }}>Room no</Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="Number"
            style={{ marginTop: 4 }}
          />
        </View>
        <View
          style={{
            padding: 8,
            backgroundColor: "white",
            borderRadius: 8,
            width: "48%",
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 12, color: "gray" }}>Occupancy</Text>
          <DropDownPicker
            open={openDropdown === "occupancy"}
            setOpen={() => toggleOpen("occupancy")}
            value={occupancyValue}
            items={occupancyOptions}
            setItems={setOccupancyOptions}
            setValue={setOccupancyValue}
            style={{ borderWidth: 0, marginTop: 5 }}
            dropDownContainerStyle={{
              borderWidth: 0,
              zIndex: 1000,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
          zIndex: openDropdown === "guest" ? 1000 : 1,
        }}
      >
        <View
          style={{
            padding: 8,
            backgroundColor: "white",
            borderRadius: 8,
            width: "48%",
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 12, color: "gray" }}>Guest</Text>
          <DropDownPicker
            open={openDropdown === "guest"}
            setOpen={() => toggleOpen("guest")}
            value={guestsValue}
            items={guestsOptions}
            setItems={setGuestsOptions}
            setValue={setGuestsValue}
            style={{ borderWidth: 0, marginTop: 5 }}
            dropDownContainerStyle={{
              borderWidth: 0,
              zIndex: 1000,
            }}
          />
        </View>
        <View
          style={{
            padding: 8,
            backgroundColor: "white",
            borderRadius: 8,
            width: "48%",
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 12, color: "gray" }}>Room Type</Text>
          <DropDownPicker
            open={openDropdown === "roomType"}
            setOpen={() => toggleOpen("roomType")}
            value={roomTypeValue}
            items={roomTypeOptions}
            setItems={setRoomTypeOptions}
            setValue={setRoomTypeValue}
            style={{ borderWidth: 0, marginTop: 5 }}
            dropDownContainerStyle={{
              borderWidth: 0,
              zIndex: 1000,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ModalBody;
