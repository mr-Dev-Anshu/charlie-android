import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

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
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <TouchableOpacity
        onPress={() => setShowIncludedDropdown(!showIncludedDropdown)}
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
        onPress={() => setShowNotIncludedDropdown(!showNotIncludedDropdown)}
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
