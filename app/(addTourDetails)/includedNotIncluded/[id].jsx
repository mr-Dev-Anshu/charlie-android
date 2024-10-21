import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { apiRequest } from "../../../utils/helpers";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TourDetails = () => {
  const { id } = useLocalSearchParams();

  const [fetchIncluded, setFetchIncluded] = useState([]);
  const [fetchNotIncluded, setFetchNotIncluded] = useState([]);

  const disableAdd = fetchIncluded || fetchNotIncluded ? true : false;

  const [includedItems, setIncludedItems] = useState([
    { id: 1, label: "Food", checked: false },
    { id: 2, label: "Accommodation", checked: false },
    { id: 3, label: "Transport", checked: false },
    { id: 4, label: "Guide", checked: false },
    { id: 5, label: "Insurance", checked: false },
  ]);

  const [notIncludedItems, setNotIncludedItems] = useState([
    { id: 1, label: "Flights", checked: false },
    { id: 2, label: "Personal Expenses", checked: false },
    { id: 3, label: "Visa Fees", checked: false },
    { id: 4, label: "Alcohol", checked: false },
    { id: 5, label: "Extra Activities", checked: false },
  ]);

  const [showIncludedDropdown, setShowIncludedDropdown] = useState(false);
  const [showNotIncludedDropdown, setShowNotIncludedDropdown] = useState(false);

  const handleIncludedDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowIncludedDropdown(!showIncludedDropdown);
  };

  const handleNotIncludedDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowNotIncludedDropdown(!showNotIncludedDropdown);
  };

  const handleIncludedCheckboxChange = (id) => {
    setIncludedItems((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleNotIncludedCheckboxChange = (id) => {
    setNotIncludedItems((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const includedItemsArray = includedItems.filter(
    (item) => item.checked === true
  );

  const notIncludedItemsArray = includedItems.filter(
    (item) => item.checked === true
  );

  console.log(
    "included-notincluded",
    includedItemsArray,
    notIncludedItemsArray
  );

  const handleGet = async () => {
    try {
      const res = await apiRequest(
        `https://trakies-backend.onrender.com/api/included/get?tourId=${id}`,
        "GET"
      );
      setFetchIncluded(res.data.includedItems.item);
      setFetchNotIncluded(res.data.notIncluded.item);
    } catch (error) {
      console.log("Failed to get included/not-included", error?.message);
    }
  };

  const handleAdd = () => {
    try {
    } catch (error) {}
  };

  const handleUpdate = () => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <View className="h-full px-4">
      <ScrollView contentContainerStyle={{}}>
        <TouchableOpacity
          onPress={handleIncludedDropdown}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: "#f0f0f0",
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Included</Text>
          <Ionicons
            name={showIncludedDropdown ? "chevron-up" : "chevron-down"}
            size={24}
          />
        </TouchableOpacity>

        {showIncludedDropdown && (
          <View style={{ marginBottom: 20 }}>
            {includedItems.map((item) => (
              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Checkbox
                  status={
                    fetchIncluded?.includes(item.label)
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => handleIncludedCheckboxChange(item.id)}
                  color={fetchIncluded?.includes(item.label) ? "green" : "#000"}
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
        )}
        <TouchableOpacity
          onPress={handleNotIncludedDropdown}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: "#f0f0f0",
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Not Included</Text>
          <Ionicons
            name={showNotIncludedDropdown ? "chevron-up" : "chevron-down"}
            size={24}
          />
        </TouchableOpacity>

        {showNotIncludedDropdown && (
          <View style={{ marginBottom: 20 }}>
            {notIncludedItems.map((item) => (
              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Checkbox
                  status={
                    fetchNotIncluded?.includes(item.label)
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => handleNotIncludedCheckboxChange(item.id)}
                  color={
                    fetchNotIncluded?.includes(item.label) ? "green" : "#000"
                  }
                />
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <View className="w-full flex flex-row justify-between items-center h-16 bg-transparent">
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={disableAdd}
          style={{
            width: 165,
            backgroundColor: "#414141",
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={{
            width: 165,
            paddingVertical: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "green",
          }}
        >
          <Text style={{ textAlign: "center", color: "green" }}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TourDetails;
