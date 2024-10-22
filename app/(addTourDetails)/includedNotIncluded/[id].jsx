import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
  Alert,
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

  const disableAdd = fetchIncluded.length === 0 && fetchNotIncluded.length === 0 ? false : true;

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

  const handleGet = async () => {
    try {
      const res = await apiRequest(
        `https://trakies-backend.onrender.com/api/included/get?tourId=${id}`,
        "GET"
      );

      setIncludedItems((prevIncludedItems) =>
        prevIncludedItems.map((item) => ({
          ...item,
          checked: res.data.includedItems.item.includes(item.label),
        }))
      );

      setNotIncludedItems((prevNotIncludedItems) =>
        prevNotIncludedItems.map((item) => ({
          ...item,
          checked: res.data.notIncluded.item.includes(item.label),
        }))
      );

      setFetchIncluded(res.data.includedItems.item);
      setFetchNotIncluded(res.data.notIncluded.item);
    } catch (error) {
      console.log("Failed to get included/not-included", error?.message);
    }
  };

  const handleUpdate = async () => {
    const includedItemsArray = includedItems
      .filter((item) => item.checked)
      .map((item) => item.label);
    const notIncludedItemsArray = notIncludedItems
      .filter((item) => item.checked)
      .map((item) => item.label);

    try {
      const payload = {
        tourId: id,
        includedItems: includedItemsArray,
        notIncludedItems: notIncludedItemsArray,
      };

      const res = await apiRequest(
        `https://trakies-backend.onrender.com/api/included/update`,
        "POST",
        payload
      );

      if (res) {
        Alert.alert(
          "Success",
          "Included/Not included items updated successfully"
        );
        handleGet();
      } else {
        Alert.alert("Error", res.message || "Failed to update items");
      }
    } catch (error) {
      console.log("Error updating items", error?.message);
      Alert.alert("Error", "An error occurred while updating items");
    }
  };

  const handleAdd = async () => {
    const includedItemsArray = includedItems
      .filter((item) => item.checked)
      .map((item) => item.label);
    const notIncludedItemsArray = notIncludedItems
      .filter((item) => item.checked)
      .map((item) => item.label);

    try {
      const payload = {
        tourId: id,
        includedItems: includedItemsArray,
        notIncludedItems: notIncludedItemsArray,
      };

      const res = await apiRequest(
        `https://trakies-backend.onrender.com/api/included/add`,
        "POST",
        payload
      );

      if (res) {
        Alert.alert(
          "Success",
          "Included/Not included items added successfully"
        );
        handleGet();
      } else {
        Alert.alert("Error", res.message || "Failed to add items");
      }
    } catch (error) {
      console.log("Error adding items", error?.message);
      Alert.alert("Error", "An error occurred while adding items");
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <View className="h-full px-4">
      <ScrollView>
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
                  status={item.checked ? "checked" : "unchecked"}
                  onPress={() => handleIncludedCheckboxChange(item.id)}
                  color={item.checked ? "green" : "#000"}
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
                  status={item.checked ? "checked" : "unchecked"}
                  onPress={() => handleNotIncludedCheckboxChange(item.id)}
                  color={item.checked ? "green" : "#000"}
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
          onPress={handleAdd} 
          style={{
            width: 165,
            backgroundColor: disableAdd ? "#d3d3d3" : "#414141",
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleUpdate}
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