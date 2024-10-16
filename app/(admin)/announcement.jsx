import {
  View,
  Text,
  ScrollView,
  Switch,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import Announcement from "../../components/UI/Announcement";
import { Ionicons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import DropDownPicker from "react-native-dropdown-picker";
import { useSelector } from "react-redux";
import { Button } from "react-native";

const AnnouncementScreen = () => {
  const { tour } = useSelector((state) => state.tour);
  const { user } = useSelector((state) => state.user);

  const toursData = tour.map((t) => {
    return { label: t.name, value: t._id };
  });

  const addAnnounceMentRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [currentTour, setCurrentTour] = useState(toursData[0]?.value);
  const [tours, setTours] = useState(toursData);

  console.log(currentTour);

  const [content, setContent] = useState("");
  const [sendToAll, setSendToAll] = useState(false);

  return (
    <>
      <View className="mt-14 h-full w-full px-3">
        <View className="flex justify-center items-center py-1">
          <Text className="text-lg font-semibold text-green-800">
            Announcements
          </Text>
        </View>
        <View className="px-3">
          <DropDownPicker
            open={open}
            value={currentTour}
            items={tours}
            setOpen={setOpen}
            setValue={setCurrentTour}
            setItems={setTours}
            closeOnBackPressed={true}
            placeholder="Select Tour"
            zIndex={1000}
            textStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
            arrowIconStyle={{ tintColor: "white" }}
            tickIconStyle={{ tintColor: "white" }}
            style={{ backgroundColor: "#117004", borderColor: "#117004" }}
            dropDownContainerStyle={{
              backgroundColor: "#117004",
              borderColor: "#117004",
            }}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 10 }}
        >
          <View className="mt-1">
            <Announcement />
          </View>
        </ScrollView>
      </View>
      <View className="bottom-32 pb-2 py-2 bg-white w-full flex justify-center items-center px-12">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => addAnnounceMentRef?.current?.open()}
          style={{
            width: "100%",
            height: 48,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#06992d",
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <View className="flex flex-row justify-center items-center space-x-4">
            <Ionicons name="megaphone-outline" size={20} color="white" />
            <Text className="text-white text-lg font-semibold">
              New Announcements
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modalize ref={addAnnounceMentRef} modalHeight={400}>
        <View
          style={{
            padding: 16,
          }}
        >
          <View
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text style={{ marginBottom: 8, fontWeight: "600", fontSize: 20 }}>
              Annoucement
            </Text>
          </View>
          <TextInput
            value={content}
            multiline
            numberOfLines={10}
            textAlign="left"
            textAlignVertical="top"
            onChangeText={setContent}
            placeholder="Enter announcement content..."
            style={{
              borderWidth: 3,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              fontWeight: "600",
              borderStyle: "solid",
              marginBottom: 16,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Switch value={sendToAll} onValueChange={setSendToAll} />
            <Text style={{ marginLeft: 8, fontWeight: "600" }}>
              Send to all users
            </Text>
          </View>
          <Button title="Send" color={"green"} onPress={() => {}} />
        </View>
      </Modalize>
    </>
  );
};

export default AnnouncementScreen;
