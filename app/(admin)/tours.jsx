import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import TourCard from "../../components/admin/UI/TourCard";
import { router } from "expo-router";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

const Tours = () => {
  const { tour } = useSelector((state) => state.tour);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tourListContainer}>
          {tour.length > 0 ? (
            tour.map((item) => <TourCard key={item?._id} tour={item} />)
          ) : (
            <View style={styles.noToursCard}>
              <Text style={styles.noToursText}>No Tours</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.createButtonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.createButton}
          onPress={() => router.push("/addTours")}
        >
          <Text style={styles.createButtonText}>Create Tour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.13,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    paddingBottom: height * 0.1,
    width: "100%",
  },
  tourListContainer: {
    width: "100%",
    paddingHorizontal: width * 0.04,
    paddingTop: 10,
  },
  noToursCard: {
    backgroundColor: "green",
    borderRadius: 10,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height * 0.02,
  },
  noToursText: {
    color: "white",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  createButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: "white",
  },
  createButton: {
    backgroundColor: "green",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.01,
    borderRadius: 10,
  },
  createButtonText: {
    color: "white",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
});

export default Tours;
