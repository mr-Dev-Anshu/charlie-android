import { View, Text } from "react-native";
import React, { useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import trash from "../../../assets/trash-04.svg";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Checkbox } from "react-native-paper";
import { Modalize } from "react-native-modalize";

const Mynotes = () => {
  const { id } = useLocalSearchParams();

  const handleDeleteNotes = () => {
    try {
    } catch (error) {}
  };

  const addNotesRef = useRef(null);

  return (
    <>
      <View className="px-3 py-2 flex justify-start items-center w-full h-full relative">
        <View className="w-full">
          <ScrollView
            contentContainerStyle={{ width: "100%", paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
          >
            {notes.map((i) => (
              <NotesCard key={i.id} title={i.title} content={i.content} />
            ))}
          </ScrollView>
        </View>
        <View className="w-full absolute bottom-0 flex flex-row justify-center items-center h-16 bg-[#FFFFFFFF]">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => addNotesRef.current?.open()}
            style={{
              width: 350,
              backgroundColor: "green",
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>
              Add Notes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modalize ref={addNotesRef} adjustToContentHeight snapPoint={500}>
        <View className="h-96 px-3 py-4 flex justify-between items-center">
          <View className="w-full flex justify-start items-center">
            <Text className="mt-3 text-xl font-semibold">Add Note</Text>
            <View className="border mt-3 border-gray-500/50 p-1 px-2 rounded-lg w-full">
              <Text className="text-xs text-gray-500/70">Title</Text>
              <TextInput
                placeholder="Enter Title"
                className="text-black text-base mt-1"
              />
            </View>
            <View className="border mt-3 border-gray-500/50 p-1 px-2 rounded-lg w-full">
              <Text className="text-xs text-gray-500/70">Description</Text>
              <TextInput
                multiline={true}
                numberOfLines={5}
                textAlignVertical="top"
                placeholder="Enter description"
                className="text-black text-base mt-1"
              />
            </View>
          </View>
          <View className="w-full flex justify-center items-center mt-4">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => addNotesRef.current?.open()}
              style={{
                width: 350,
                backgroundColor: "green",
                paddingVertical: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Add Notes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </>
  );
};

const notes = [
  {
    id: 1,
    title: "Food Containers",
    content: "Total required containers are 50. Different sizes.",
  },
  {
    id: 2,
    title: "Food Containers",
    content: "Total required containers are 50. Different sizes.",
  },
];

const NotesCard = ({ title, content }) => {
  const checked = 1;

  return (
    <View className="h-fit w-full border border-gray-500/50 rounded-xl p-2 py-2 mt-2">
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row justify-start items-center">
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {}}
            color={checked ? "green" : "#000"}
          />
          <Text className="text-base font-semibold">{title}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.5}>
          <Image source={trash} className="h-4 w-4" />
        </TouchableOpacity>
      </View>
      <View className="px-2">
        <Text className="mt-1">{content}</Text>
      </View>
    </View>
  );
};

export default Mynotes;
