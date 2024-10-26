import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import trashIcon from "../../../assets/trash-04.svg";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";

const { width, height } = Dimensions.get("window");

const Luggage = () => {
  const { id } = useLocalSearchParams();

  console.log("baggage id", id);
  const [backpackItems, setBackpackItems] = useState([
    "Water Bottle",
    "First Aid Kit",
    "Snacks",
  ]);
  const [checkInItems, setCheckInItems] = useState([
    "Laptop",
    "Clothes",
    "Shoes",
  ]);
  const [newItem, setNewItem] = useState("");
  const [isBackpack, setIsBackpack] = useState(true);

  const handleAddItem = () => {
    if (newItem.trim()) {
      if (isBackpack) {
        setBackpackItems([...backpackItems, newItem]);
      } else {
        setCheckInItems([...checkInItems, newItem]);
      }
      setNewItem("");
    }
  };

  const handleUpdateItem = (index, updatedItem) => {
    if (isBackpack) {
      const items = [...backpackItems];
      items[index] = updatedItem;
      setBackpackItems(items);
    } else {
      const items = [...checkInItems];
      items[index] = updatedItem;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setIsBackpack(true)}
          style={isBackpack ? styles.activeTab : styles.tab}
        >
          <Text style={styles.tabText}>Backpack</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsBackpack(false)}
          style={!isBackpack ? styles.activeTab : styles.tab}
        >
          <Text style={styles.tabText}>Check-In Baggage</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.listContainer}>
        {(isBackpack ? backpackItems : checkInItems).map((item, index) => (
          <View key={index} style={styles.listItem}>
            <TextInput
              style={styles.itemText}
              value={item}
              onChangeText={(text) => handleUpdateItem(index, text)}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
              <Image source={trashIcon} className="h-4 w-4" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Add new item"
        value={newItem}
        onChangeText={setNewItem}
      />
      <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: height * 0.02,
    borderRadius: 10,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    padding: height * 0.015,
    backgroundColor: "#787878",
    alignItems: "center",
  },
  activeTab: {
    flex: 1,
    padding: height * 0.015,
    backgroundColor: "green",
    alignItems: "center",
  },
  tabText: {
    color: "white",
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    marginBottom: height * 0.02,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.01,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  itemText: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    padding: height * 0.015,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: height * 0.02,
  },
  addButton: {
    padding: height * 0.015,
    backgroundColor: "green",
    alignItems: "center",
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Luggage;
