import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

const { width, height } = Dimensions.get("window");

const TransportDetails = () => {
  const { id } = useLocalSearchParams();

  const [busName, setBusName] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [driverName, setDriver] = useState("");
  const [driverContact, setDriverContact] = useState("");
  const [images, setImages] = useState("");
  const [error, setError] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets);
    } else {
      setError("Image not selected! Try again");
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          paddingBottom: 80,
        }}
        style={{
          width: "100%",
        }}
      >
        <View style={styles.formFieldContainer}>
          <Text style={styles.formFieldText}>Bus Name</Text>
          <TextInput style={styles.formFieldInputText} />
        </View>
        <View style={styles.formFieldContainer}>
          <Text style={styles.formFieldText}>Bus Number</Text>
          <TextInput style={styles.formFieldInputText} />
        </View>
        <View style={styles.formFieldContainer}>
          <Text style={styles.formFieldText}>Seating Capacity</Text>
          <TextInput style={styles.formFieldInputText} />
        </View>
        <Text
          style={{
            paddingVertical: 10,
            fontSize: 16,
            fontWeight: 500,
            textAlign: "left",
            width: "100%",
          }}
        >
          Driver Details
        </Text>
        <View style={styles.formFieldContainer}>
          <Text style={styles.formFieldText}>Driver Name</Text>
          <TextInput style={styles.formFieldInputText} />
        </View>
        <View style={styles.formFieldContainer}>
          <Text style={styles.formFieldText}>Driver Contact Number</Text>
          <TextInput style={styles.formFieldInputText} />
        </View>
        <Text
          style={{
            paddingVertical: 10,
            fontSize: 16,
            fontWeight: 500,
            textAlign: "left",
            width: "100%",
          }}
        >
          Photo Gallery
        </Text>
        <View style={styles.busImageContainer}>
          <View>
            {images.length > 0 ? (
              <View style={{ display: "flex", flexDirection: "row" }}>
                {images.map((img) => {
                  return (
                    <Image
                      key={img.fileName}
                      source={{ uri: img.uri }}
                      style={styles.images}
                    />
                  );
                })}
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.buttons, { backgroundColor: "green" }]}
                onPress={pickImage}
              >
                <Text style={{ color: "white" }}>Upload Bus Image</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.buttons,
              { backgroundColor: "white", borderWidth: 1 },
            ]}
            activeOpacity={0.6}
            onPress={() => {
              router.back();
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttons, { backgroundColor: "green" }]}
            activeOpacity={0.6}
            onPress={() =>
              router.push(`/(addTourDetails)/addTransportDetails/${id}`)
            }
          >
            <Text style={[styles.buttonText, { color: "white" }]}>Add</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            paddingVertical: 10,
            fontSize: 16,
            fontWeight: 500,
            textAlign: "left",
            width: "100%",
          }}
        >
          Boarding Point
        </Text>
        <View style={styles.boardingPointFormContainer}>
          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldText}>Boarding Point Name</Text>
            <TextInput style={styles.formFieldInputText} />
          </View>
          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldText}>Location</Text>
            <TextInput style={styles.formFieldInputText} />
          </View>
          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldText}>Date</Text>
            <TextInput style={styles.formFieldInputText} />
          </View>
          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldText}>Time</Text>
            <TextInput style={styles.formFieldInputText} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    width: "100%",
    position: "relative",
    paddingHorizontal: 14,
    paddingTop: 16,
  },
  buttonsContainer: {
    width: width,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  buttons: {
    width: width * 0.4,
    height: height * 0.05,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
  },
  formFieldContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 3,
    borderRadius: 6,
    marginTop: 10,
  },
  formFieldText: {
    color: "gray",
    fontSize: 12,
  },
  formFieldInputText: {
    fontSize: 16,
    fontWeight: "500",
  },
  busImageContainer: {
    width: "100%",
    borderWidth: 2,
    borderColor: "green",
    height: height * 0.15,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  boardingPointFormContainer: {
    width: "100%",
  },
  images: {
    width: width * 0.24,
    height: height * 0.12,
    borderRadius: 6,
    marginRight: 8,
  },
});

export default TransportDetails;
