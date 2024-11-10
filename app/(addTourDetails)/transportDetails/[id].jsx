import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { Modalize } from "react-native-modalize";
import { Checkbox } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const TransportDetails = () => {
  const { id, tourId } = useLocalSearchParams();

  const [boardingPoints, setBoardingPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [allocatedGuests, setAllocatedGuests] = useState([]);

  const [selectedGuests, setSelectedGuests] = useState([]);

  const toggleGuestSelection = (guestId) => {
    setSelectedGuests((prevSelected) => {
      if (prevSelected.includes(guestId)) {
        return prevSelected.filter((id) => id !== guestId);
      } else {
        return [...prevSelected, guestId];
      }
    });
  };

  useEffect(() => {
    console.log(selectedGuests);
  }, [selectedGuests]);

  const handleGetBoardingPoints = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://trakies-backend.onrender.com/api/board/get?transportId=${id}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to get boarding points");
      }
      const result = await response.json();
      setBoardingPoints(result);
    } catch (error) {
      console.log("error:", error);
      Alert.alert("Oops", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getAllAllocations = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://trakies-backend.onrender.com/api/allocated/get?tourId=${tourId}`
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch allocations");
      }

      const result = await response.json();
      setAllocatedGuests(result);
    } catch (error) {
      console.log(error);
      Alert.alert("Something Went Wrong.", "Failed to fetch allocations.");
    } finally {
      setLoading(false);
    }
  };

  const addGuestsRef = useRef();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await handleGetBoardingPoints();
      await getAllAllocations();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <View style={styles.screenContainer}>
        <ScrollView
          style={{ width: "100%", height: "100%", paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["green", "red"]}
            />
          }
        >
          <View style={{ paddingHorizontal: 5 }}>
            {boardingPoints.length > 0 ? (
              <>
                {boardingPoints.map(
                  ({
                    boardingPointName,
                    boardingPointTime,
                    boardingPointDate,
                    location,
                    _id,
                  }) => (
                    <BoardingPointCard
                      name={boardingPointName}
                      date={boardingPointDate}
                      time={boardingPointTime}
                      location={location}
                      id={_id}
                      onRefresh={onRefresh}
                      setRefreshing={setRefreshing}
                    />
                  )
                )}
              </>
            ) : (
              <View
                style={styles.noBoardingContainer}
              >
                <Ionicons name="trash-bin-outline" color={"green"} size={28} />
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 16,
                    fontWeight: "600",
                    color: "green",
                  }}
                >
                  No Boarding Points Added Yet
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.buttons,
              { backgroundColor: "white", borderWidth: 1 },
            ]}
            activeOpacity={0.6}
            onPress={() => addGuestsRef.current?.open()}
          >
            <Text style={styles.buttonText}>Add Guests</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttons, { backgroundColor: "green" }]}
            activeOpacity={0.6}
            onPress={() =>
              router.push(`/(addTourDetails)/addBoardingPoint/${id}`)
            }
          >
            <Text style={[styles.buttonText, { color: "white" }]}>
              Add Boarding Point
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modalize
        ref={addGuestsRef}
        adjustToContentHeight
        modalStyle={{ borderTopEndRadius: 10 }}
      >
        <View style={{ height: 300 }}>
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              paddingVertical: 10,
              fontWeight: "600",
              fontSize: 18,
            }}
          >
            Guests
          </Text>
          <ScrollView nestedScrollEnabled={false} contentContainerStyle={{}}>
            {allocatedGuests.map((item) => (
              <View
                style={styles.guestCardContainer}
                key={item._id}
              >
                <Checkbox
                  status={
                    selectedGuests.includes(item._id) ? "checked" : "unchecked"
                  }
                  onPress={() => toggleGuestSelection(item._id)}
                  color="green"
                />
                <View
                  style={{
                    backgroundColor:
                      item?.bookingData?.gender == "Male" || "male" ? "red" : "green",
                    height: 20,
                    width: 20,
                    borderRadius: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {item?.bookingData?.gender?.charAt(0)}
                  </Text>
                </View>
                <Text>{item?.bookingData?.name}</Text>
                <Text>{item?.bookingData?.age} Yrs</Text>
                <Text>Room No. {item?.roomNumber}</Text>
              </View>
            ))}
          </ScrollView>
          <View
            style={styles.modalizeButtonContainer}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.modalizeButton}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </>
  );
};

const BoardingPointCard = ({
  name,
  location,
  time,
  date,
  id,
  onRefresh,
  setRefreshing,
}) => {
  const handleDelete = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(
        `https://trakies-backend.onrender.com/api/board/delete?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to delete boarding point.");
      }
      Alert.alert("Deleted", "Boarding point successfully deleted.");
      onRefresh();
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Oops", "Something went wrong.\nPlease try again.");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.boardingPointContainer}>
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          paddingBottom: 8,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Boading Point</Text>
        <TouchableOpacity onPress={handleDelete} activeOpacity={0.5}>
          <Ionicons name="trash-outline" color={"red"} size={18} />
        </TouchableOpacity>
      </View>
      <View style={styles.boardingPointFieldBox}>
        <View style={styles.fieldContainer}>
          <Text style={styles.boardingPointFieldPlaceHolderText}>
            Boarding Point Name
          </Text>
          <Text style={styles.boardingPointFieldValueText}>{name}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.boardingPointFieldPlaceHolderText}>
            Boarding Point Location
          </Text>
          <Text style={styles.boardingPointFieldValueText}>{location}</Text>
        </View>
      </View>
      <View style={styles.boardingPointFieldBox}>
        <View style={styles.fieldContainer}>
          <Text style={styles.boardingPointFieldPlaceHolderText}>
            Boarding Date
          </Text>
          <Text style={styles.boardingPointFieldValueText}>
            {format(date, "yy-MM-dd")}
          </Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.boardingPointFieldPlaceHolderText}>
            Boarding time
          </Text>
          <Text style={styles.boardingPointFieldValueText}>
            {format(time, "HH:mm")}
          </Text>
        </View>
      </View>
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
    position: "absolute",
    bottom: 0,
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
  images: {
    width: width * 0.24,
    height: height * 0.12,
    borderRadius: 6,
    marginRight: 8,
  },
  boardingPointContainer: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "white",
    elevation: 8,
    marginBottom: 8,
  },
  boardingPointFieldBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boardingPointFieldPlaceHolderText: {
    fontSize: 12,
    color: "gray",
  },
  boardingPointFieldValueText: {
    fontWeight: "500",
    paddingTop: 5,
  },
  fieldContainer: {
    width: "50%",
    marginBottom: 14,
  },
  modalizeButton:{
    backgroundColor: "green",
    width: width * 0.5,
    height: height * 0.05,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  modalizeButtonContainer:{
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.08,
  },
  guestCardContainer:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "white",
    elevation: 8,
  }, 
  noBoardingContainer:{
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    backgroundColor: "white",
  }
});

export default TransportDetails;
