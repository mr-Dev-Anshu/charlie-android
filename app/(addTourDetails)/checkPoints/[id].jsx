import { View, Text } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Image, ImageBackground } from "expo-image";
import marker from "../../../assets/marker-pin.svg";
import edit from "../../../assets/edit.svg";
import user from "../../../assets/user.svg";
import { Modalize } from "react-native-modalize";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker } from "react-native-maps";
import { router, useLocalSearchParams } from "expo-router";
import { shorten } from "../../../components/UI/PostComponent";
import { ActivityIndicator } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";

const Checkpoints = () => {
  const { id } = useLocalSearchParams();
  const [qrUrl, setQrUrl] = useState();
  const [allCheckPoints, setAllCheckPoints] = useState([]);
  const [loading, setLoading] = useState(false);

  const editCheckPointRef = useRef(null);
  const addCheckPoint = useRef(null);
  const viewMapRef = useRef(null);
  const viewCheckInRef = useRef(null);
  const downloadQRref = useRef(null);

  const handleQr = async () => {
    try {
      const qr = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          id
        )}&size=200x200`
      );
      setQrUrl(qr.url);
    } catch (error) {
      console.log("failed to generate qr", error);
    }
  };

  const handleQrModal = async () => {
    await handleQr();
    downloadQRref.current?.open();
  };

  const handleDownloadQr = async () => {
    if (!qrUrl) {
      Alert.alert("No QR Code", "Please generate a QR code first.");
      return;
    }
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "We need access to your media library to save the image."
        );
        return;
      }

      const fileUri = FileSystem.documentDirectory + "qrcode.png";

      const { uri } = await FileSystem.downloadAsync(qrUrl, fileUri);

      const asset = await MediaLibrary.createAssetAsync(uri);

      const album = await MediaLibrary.getAlbumAsync("Download");

      if (album == null) {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      Alert.alert("Success", "QR code downloaded and saved to your gallery!");
    } catch (error) {
      console.log("Failed to download image", error);
      Alert.alert("Error", "Failed to download the image.");
    }
  };

  const handleGetAllCheckPoints = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://trakies-backend.onrender.com/api/get-points?id=${id}`
      );

      if (res.status !== 200) {
        throw new Error("Failed to get checkpoints");
      }
      const data = await res.json();

      setAllCheckPoints(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    handleGetAllCheckPoints();
  }, []);

  if (loading) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator color="green" size={"large"} />
      </View>
    );
  }

  return (
    <>
      <View className="px-4 relative h-full w-full flex justify-start items-center">
        {allCheckPoints.length === 0 ? (
          <View className="h-full w-full flex justify-center items-center -mt-10">
            <Ionicons name="navigate-circle-outline" size={48} color={"green"} />
            <Text className="text-xl font-semibold mt-4">
              No checkpoints added yet
            </Text>
          </View>
        ) : (
          <>
            {allCheckPoints?.map((point, index) => (
              <CheckPointCard
                point={point}
                key={index}
                idx={index}
                editRef={editCheckPointRef}
                mapRef={viewMapRef}
                checkInsRef={viewCheckInRef}
                handleQr={handleQr}
              />
            ))}
          </>
        )}

        <View className="w-full absolute bottom-0 flex flex-row justify-center items-center space-x-5 h-16 bg-transparent">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleQrModal}
            style={{
              width: 180,
              backgroundColor: "gray",
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>
              Download QR code
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push(`/createCheckpoints/${id}`)}
            style={{
              width: 180,
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
        <View className="px-3 py-4 flex justify-between items-center">\</View>
      </Modalize>
      <Modalize
        ref={viewMapRef}
        adjustToContentHeight
        snapPoint={500}
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
      >
        <View className="px-3 py-4 flex justify-between items-center">
          <View className="w-full flex justify-start items-center">
            <View className="h-[500px] w-full rounded-xl overflow-hidden mt-2 border border-gray-500/50 ">
              <MapView
                className="h-[500px] w-full rounded-xl"
                region={region}
                showsUserLocation={true}
                showsMyLocationButton={true}
              >
                <Marker
                  coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                />
              </MapView>
            </View>
          </View>
        </View>
      </Modalize>
      <Modalize
        ref={downloadQRref}
        adjustToContentHeight
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
      >
        <View className="px-3 pb-5 flex justify-between items-center h-fit ">
          <View className="w-full py-6 flex justify-center items-center">
            <Text className="text-base font-semibold">QR Code</Text>
          </View>
          <View className="p-1 border border-green-700 rounded-xl">
            <Image source={qrUrl} className="w-40 h-40 rounded-lg" />
          </View>
          <View className="mt-6">
            <TouchableOpacity
              onPress={handleDownloadQr}
              activeOpacity={0.8}
              className="h-10 w-56 bg-green-700 flex justify-center items-center rounded-lg"
            >
              <Text className="text-white font-semibold">Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </>
  );
};

const CheckPointCard = ({
  editRef,
  mapRef,
  checkInsRef,
  handleQr,
  idx,
  point,
}) => {
  return (
    <View className="p-1 border border-gray-500/50 rounded-lg py-2 px-2 mt-3">
      <View className="flex flex-row justify-between ">
        <View>
          <Text className="text-xs">{`Check Point ${idx + 1}`}</Text>
          <Text className="text-base font-medium">{point.name}</Text>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.6}>
            <Ionicons name="ellipsis-vertical" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row justify-between  mt-1 py-1">
        <View className="w-[80%]">
          <Text className="text-gray-500 tracking-wide text-justify">
            {shorten(point.description, 80)}
          </Text>
        </View>
        <View className="w-[20%] flex justify-center items-center">
          <Ionicons name="qr-code-outline" color={"green"} size={36} />
          <Text className="text-xs text-green-700 mt-1">Activate</Text>
        </View>
      </View>
      <View className="flex flex-row justify-between items-center mt-2 px-4">
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
