import React, { useState, useRef } from "react";
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

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TourDetails = () => {
  
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

  const handleAdd = ()=>{

  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Included Dropdown */}
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
  );
};

export default TourDetails;
