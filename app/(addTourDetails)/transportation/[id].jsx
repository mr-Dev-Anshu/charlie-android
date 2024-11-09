import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

const { width, height } = Dimensions.get("window");

const Transportation = () => {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.screenContainer}>
      <Text>Transportation</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: "white", borderWidth: 1 }]}
          activeOpacity={0.6}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Export Excel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, { backgroundColor: "green" }]}
          activeOpacity={0.6}
          onPress={() =>
            router.push(`/(addTourDetails)/addTransportDetails/${id}`)
          }
        >
          <Text style={[styles.buttonText, { color: "white" }]}>
            Add Transportation
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
  buttonsContainer: {
    width: width,
    position: "absolute",
    bottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
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
});

export default Transportation;
