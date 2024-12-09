import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CheckPointElement from "./UI/CheckPointElement";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
// import {
//   getUserLocation,
//   getUserLocationInOfflineMode,
//   isNearby,
//   isWithin100Meters,
// } from "../utils/offlineLocationHelper";

// import * as Location from "expo-location";

const MyTourCheckPointsListView = ({
  geoTaggedCheckPoints,
  checkPoints,
  handleGetCheckPoints,
}) => {
  // const [currentUserLocation, setCurrentUserLocation] = useState({});
  // const [location, setLocation] = useState({});
  // const [errorMsg, setErrorMsg] = useState("");

  // console.log("location---->", location);
  // console.log("errror---->", errorMsg);

  // const getLocation = async () => {
  //   try {
  //     const location = await getUserLocation();
  //     const { latitude: lat, longitude: long } = location.coords;
  //     const currentLatLong = { lat, long };
  //     setCurrentUserLocation(currentLatLong);
  //   } catch (error) {
  //     console.error("Failed to get user location:", error);
  //   }
  // };

  // geoTaggedCheckPoints.forEach((element) => {
  //   const checking = isNearby(currentUserLocation, element, 100);
  //   console.log(checking);
  // });

  // useEffect(() => {
  //   async function getCurrentLocation() {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   }

  //   getCurrentLocation();
  //   getLocation();
  // }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 120,
        paddingHorizontal: 5,
      }}
    >
      <View>
        {checkPoints && checkPoints.length > 0 ? (
          checkPoints.map((points, index) => (
            <CheckPointElement
              key={index}
              points={points}
              index={index}
              handleGetCheckPoints={handleGetCheckPoints}
            />
          ))
        ) : (
          <View
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Ionicons
              name="navigate-circle-outline"
              size={48}
              color={"green"}
            />
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 4 }}>
              No checkpoints added yet
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MyTourCheckPointsListView;
