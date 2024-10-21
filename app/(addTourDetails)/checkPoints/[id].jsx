import { View, Text } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "expo-image";
import download from "../../../assets/download.svg";
import marker from "../../../assets/marker-pin.svg";
import edit from "../../../assets/edit.svg";
import user from "../../../assets/user.svg";
import { Modalize } from "react-native-modalize";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const Checkpoints = () => {
  const editCheckPointRef = useRef(null);
  const addCheckPoint = useRef(null);
  const viewMapRef = useRef(null);
  const viewCheckInRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState("");

  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleLocationSelect = (details) => {
    if (details && details.geometry) {
      const { lat, lng } = details.geometry.location;
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

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
                value={title}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            <View className="border mt-3 border-gray-500/50 p-1 px-2 rounded-lg w-full">
              <Text className="text-xs text-gray-500/70">Description</Text>
              <TextInput
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                onChangeText={(text) => setDescription(text)}
                value={description}
                placeholder="Enter description"
                className="text-black text-base mt-1"
              />
            </View>
            <View className=" justify-center w-full mt-3">
              <View className="border border-gray-500/50 rounded-lg w-full">
                <Picker
                  selectedValue={locationType}
                  onValueChange={(itemValue) => setLocationType(itemValue)}
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
                value={location}
              />
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => viewMapRef.current.open()}
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
                onPress={() => viewMapRef.current.open()}
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
            <Text className="mt-2 text-xl font-semibold">Select Location</Text>
            <View className="w-full py-1 pb-10 z-10 border border-gray-500/40 rounded-xl">
              <GooglePlacesAutocomplete
                placeholder="Search for a location"
                minLength={2}
                fetchDetails={true}
                onPress={(data, details = null) =>
                  handleLocationSelect(details)
                }
                query={{
                  key: "AIzaSyB_EhOLUePnuFPSOSSjRyAWZRUb2jWcQ8s",
                  language: "en",
                }}
                styles={{
                  container: {
                    position: "absolute",
                    width: "100%",
                    zIndex: 1000,
                  },
                  textInput: {
                    height: 44,
                    paddingHorizontal: 10,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 5,
                    color: "black",
                    zIndex: 1000,
                    elevation: 5,
                  },
                }}
              />
            </View>
            <View className="h-[500px] w-full rounded-xl overflow-hidden mt-2 border border-gray-500/50 ">
              <MapView className="h-[500px] w-full rounded-xl" region={region}>
                <Marker
                  coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                />
              </MapView>
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
                Add Location
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
