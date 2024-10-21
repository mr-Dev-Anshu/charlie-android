import React, { useState } from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

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
    <View>
      <View className="rounded-xl overflow-hidden">
        <View className="w-full py-1 pb-10 z-10 border border-gray-500/40 rounded-xl">
          <GooglePlacesAutocomplete
            placeholder="Search for start location"
            minLength={2}
            fetchDetails={true}
            onPress={(data, details = null) => handleLocationSelect(details, true)}
            query={{
              key: "AIzaSyB_EhOLUePnuFPSOSSjRyAWZRUb2jWcQ8s",
              language: "en",
            }}
            styles={{
              container: {
                position: "absolute",
                width: "100%",
                zIndex: 1,
              },
              textInput: {
                height: 44,
                paddingHorizontal: 10,
                backgroundColor: "#FFFFFF",
                borderRadius: 5,
                color: "black",
                elevation: 5,
              },
            }}
          />

          {/* Destination Location Autocomplete */}
          <GooglePlacesAutocomplete
            placeholder="Search for destination"
            minLength={2}
            fetchDetails={true}
            onPress={(data, details = null) => handleLocationSelect(details, false)}
            query={{
              key: "AIzaSyB_EhOLUePnuFPSOSSjRyAWZRUb2jWcQ8s", // Replace with your Google API key
              language: "en",
            }}
            styles={{
              container: {
                position: "absolute",
                width: "100%",
                zIndex: 1,
                marginTop: 60, // Adjust this if needed to avoid overlap
              },
              textInput: {
                height: 44,
                paddingHorizontal: 10,
                backgroundColor: "#FFFFFF",
                borderRadius: 5,
                color: "black",
                elevation: 5,
              },
            }}
          />
        </View>

        <View className="h-[500px] w-full rounded-xl overflow-hidden mt-2 border border-gray-500/50">
          <MapView className="h-[500px] w-full rounded-xl" region={region}>
            {/* Markers for Start and Destination */}
            {startLocation && (
              <Marker
                coordinate={startLocation}
                title="Start"
              />
            )}

            {destination && (
              <Marker
                coordinate={destination}
                title="Destination"
              />
            )}

            {/* Directions */}
            {startLocation && destination && (
              <MapViewDirections
                origin={startLocation}
                destination={destination}
                apikey={"AIzaSyB_EhOLUePnuFPSOSSjRyAWZRUb2jWcQ8s"} // Replace with your Google API key
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

export default MyTourCheckPoints;