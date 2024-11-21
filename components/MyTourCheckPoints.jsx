import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const { width, height } = Dimensions.get("window");

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const MyTourCheckPoints = () => {
  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [startLocation, setStartLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  const handleLocationSelect = (details, isStart) => {
    if (details && details.geometry) {
      const { lat, lng } = details.geometry.location;

      const selectedLocation = {
        latitude: lat,
        longitude: lng,
      };

      if (isStart) {
        setStartLocation(selectedLocation);
      } else {
        setDestination(selectedLocation);
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View className="rounded-xl overflow-hidden">
        <View className="w-full rounded-xl overflow-hidden mt-2 border border-gray-500/50">
          <MapView style={styles.mapViewStyle} region={region}>
            {/* Markers for Start and Destination */}
            {startLocation && (
              <Marker coordinate={startLocation} title="Start" />
            )}

            {destination && (
              <Marker coordinate={destination} title="Destination" />
            )}
            {/* Directions */}
            {startLocation && destination && (
              <MapViewDirections
                origin={startLocation}
                destination={destination}
                apikey={apiKey}
                strokeWidth={3}
                strokeColor="blue"
                optimizeWaypoints={true}
                onReady={(result) => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);
                }}
              />
            )}
          </MapView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    width: "100%",
  },
  mapViewStyle: {
    height: height * 0.75,
    width: "100%",
    borderRadius: 10,
  },
});

export default MyTourCheckPoints;
