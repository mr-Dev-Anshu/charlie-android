import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "expo-image";
import download from "../../../assets/download.svg";
import marker from "../../../assets/marker-pin.svg";
import edit from "../../../assets/edit.svg";
import user from "../../../assets/user.svg";
import { Modalize } from "react-native-modalize";
import { Picker } from "@react-native-picker/picker";

const Checkpoints = () => {
  const editCheckPointRef = useRef(null);
  const addCheckPoint = useRef(null);
  const viewMapRef = useRef(null);
  const viewCheckInRef = useRef(null);

  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <>
      <View className="px-2 relative h-full w-full flex justify-start items-center">
        <CheckPointCard
          editRef={editCheckPointRef}
          mapRef={viewMapRef}
          checkInsRef={viewCheckInRef}
        />
        <View className="w-full absolute bottom-0 flex flex-row justify-center items-center h-16 bg-[#ffffff]">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => addCheckPoint.current?.open()}
            style={{
              width: 350,
              backgroundColor: "green",
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>
              Add Check Point
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modalize ref={editCheckPointRef} adjustToContentHeight snapPoint={500}>
        <View className="h-96 px-3 py-4 flex justify-between items-center">
          <View className="w-full flex justify-start items-center">
            <Text className="mt-3 text-xl font-semibold">Edit Check Point</Text>
            <View className="border mt-3 border-gray-500/50 p-1 px-2 rounded-lg w-full">
              <Text className="text-xs text-gray-500/70">Title</Text>
              <TextInput
                placeholder="Enter Title"
                className="text-black text-base mt-1"
              />
            </View>
            <View className="border mt-3 border-gray-500/50 p-1 px-2 rounded-lg w-full">
              <Text className="text-xs text-gray-500/70">Description</Text>
              <TextInput
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                placeholder="Enter description"
                className="text-black text-base mt-1"
              />
            </View>
          </View>
          <View className="w-full flex justify-center items-center mt-4">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => addNotesRef.current?.open()}
              style={{
                width: 350,
                backgroundColor: "green",
                paddingVertical: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Add Notes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
      <Modalize ref={addCheckPoint} adjustToContentHeight snapPoint={500}>
        <View className="px-3 py-4 flex justify-between items-center">
          <View className="w-full flex justify-start items-center">
            <Text className="mt-3 text-xl font-semibold">
              Create Check Point
            </Text>
            <View className="border mt-3 border-gray-500/50 p-1 px-2 rounded-lg w-full">
              <Text className="text-xs text-gray-500/70">Title</Text>
              <TextInput
                placeholder="Enter Title"
                className="text-black text-base mt-1"
              />
            </View>
            <View className="border mt-3 border-gray-500/50 p-1 px-2 rounded-lg w-full">
              <Text className="text-xs text-gray-500/70">Description</Text>
              <TextInput
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                placeholder="Enter description"
                className="text-black text-base mt-1"
              />
            </View>
            <View className=" justify-center w-full mt-3">
              <View className="border border-gray-500/50 rounded-lg w-full">
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue) => setSelectedValue(itemValue)}
                  className="px-3"
                >
                  <Picker.Item label="Geo Tagging" value="geoTagging" />
                  <Picker.Item label="QR Code" value="qrCode" />
                </Picker>
              </View>
            </View>
            <View className="border mt-3 border-gray-500/50 p-1 px-2 rounded-lg w-full relative">
              <Text className="text-xs text-gray-500/70">Location</Text>
              <TextInput
                editable={false}
                placeholder="Pin a location"
                className="text-black text-base mt-1"
              />
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ position: "absolute", top: -36, right: 10 }}
              >
                <Image source={marker} className="h-8 w-8" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full flex justify-center items-center mt-4">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => addNotesRef.current?.open()}
              style={{
                width: 350,
                backgroundColor: "green",
                paddingVertical: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Add Notes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
      <Modalize ref={viewCheckInRef} adjustToContentHeight snapPoint={500}>
        <View className="px-3 py-4 flex justify-between items-center">
          <View className="w-full flex justify-start items-center">
            <Text className="mt-3 text-xl font-semibold">
              Create Check Point
            </Text>
            <View className="border mt-3 border-gray-500/50 p-1 px-2 rounded-lg w-full">
              <Text className="text-xs text-gray-500/70">Title</Text>
              <TextInput
                placeholder="Enter Title"
                className="text-black text-base mt-1"
              />
            </View>
            <View className="border mt-3 border-gray-500/50 p-1 px-2 rounded-lg w-full">
              <Text className="text-xs text-gray-500/70">Description</Text>
              <TextInput
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                placeholder="Enter description"
                className="text-black text-base mt-1"
              />
            </View>
            <View className=" justify-center w-full mt-3">
              <View className="border border-gray-500/50 rounded-lg w-full">
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue) => setSelectedValue(itemValue)}
                  className="px-3"
                >
                  <Picker.Item label="Geo Tagging" value="geoTagging" />
                  <Picker.Item label="QR Code" value="qrCode" />
                </Picker>
              </View>
            </View>
            <View className="border mt-3 border-gray-500/50 p-1 px-2 rounded-lg w-full relative">
              <Text className="text-xs text-gray-500/70">Location</Text>
              <TextInput
                editable={false}
                placeholder="Pin a location"
                className="text-black text-base mt-1"
              />
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ position: "absolute", top: -36, right: 10 }}
              >
                <Image source={marker} className="h-8 w-8" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full flex justify-center items-center mt-4">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => addNotesRef.current?.open()}
              style={{
                width: 350,
                backgroundColor: "green",
                paddingVertical: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Add Notes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
      <Modalize ref={viewMapRef} adjustToContentHeight snapPoint={500}>
        <View className="px-3 py-4 flex justify-between items-center">
          <View className="w-full flex justify-start items-center">
            <Text className="mt-3 text-xl font-semibold">
              Create Check Point
            </Text>
            <View className="border mt-3 border-gray-500/50 p-1 px-2 rounded-lg w-full">
              <Text className="text-xs text-gray-500/70">Title</Text>
              <TextInput
                placeholder="Enter Title"
                className="text-black text-base mt-1"
              />
            </View>
            <View className="border mt-3 border-gray-500/50 p-1 px-2 rounded-lg w-full">
              <Text className="text-xs text-gray-500/70">Description</Text>
              <TextInput
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                placeholder="Enter description"
                className="text-black text-base mt-1"
              />
            </View>
            <View className=" justify-center w-full mt-3">
              <View className="border border-gray-500/50 rounded-lg w-full">
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue) => setSelectedValue(itemValue)}
                  className="px-3"
                >
                  <Picker.Item label="Geo Tagging" value="geoTagging" />
                  <Picker.Item label="QR Code" value="qrCode" />
                </Picker>
              </View>
            </View>
            <View className="border mt-3 border-gray-500/50 p-1 px-2 rounded-lg w-full relative">
              <Text className="text-xs text-gray-500/70">Location</Text>
              <TextInput
                editable={false}
                placeholder="Pin a location"
                className="text-black text-base mt-1"
              />
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ position: "absolute", top: -36, right: 10 }}
              >
                <Image source={marker} className="h-8 w-8" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full flex justify-center items-center mt-4">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => addNotesRef.current?.open()}
              style={{
                width: 350,
                backgroundColor: "green",
                paddingVertical: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Add Notes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </>
  );
};

const CheckPointCard = ({ editRef, mapRef, checkInsRef }) => {
  return (
    <View className="p-1 border border-gray-500/50 rounded-xl py-2 px-2 mt-3">
      <View className="flex flex-row justify-between ">
        <View>
          <Text className="text-xs">Check Point 1</Text>
          <Text className="text-base font-medium">Dinner Stop</Text>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.6}>
            <Ionicons name="ellipsis-vertical" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row justify-between items-center mt-1 py-1">
        <View className="w-[80%]">
          <Text className="text-gray-500 tracking-wide text-justify">
            In this checkpoint, you'll add step-by-step written instructions
            accompanying your photos to create a simple and straightforward
            guide that anyone can follow.
          </Text>
        </View>
        <View className="w-[20%] flex justify-center items-center">
          <Ionicons name="qr-code-outline" color={"green"} size={36} />
          <Text className="text-xs text-green-700 mt-1">Activate</Text>
        </View>
      </View>
      <View className="flex flex-row justify-between items-center mt-1">
        <TouchableOpacity onPress={() => {}}>
          <View className="flex flex-row space-x-1">
            <Image source={download} className="h-4 w-4" />
            <Text className="text-xs text-green-700">Download QR</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => mapRef.current?.open()}>
          <View className="flex flex-row space-x-1">
            <Image source={marker} className="h-4 w-4" />
            <Text className="text-xs text-green-700">Show On Map</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => editRef.current?.open()}>
          <View className="flex flex-row space-x-1">
            <Image source={edit} className="h-4 w-4" />
            <Text className="text-xs text-green-700">Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => checkInsRef.current?.open()}>
          <View className="flex flex-row space-x-1">
            <Image source={user} className="h-4 w-4" />
            <Text className="text-xs text-green-700">View Check-Ins</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Checkpoints;
