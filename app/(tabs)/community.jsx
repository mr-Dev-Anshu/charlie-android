import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef } from "react";
import { post } from "../../constants/tours";
import PostComponent from "../../components/UI/PostComponent";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Modalize } from "react-native-modalize";

const community = () => {
  const addPostRef = useRef(null);
  return (
    <>
      <View className="mt-16 relative">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 pt-16">
            {post.map((post, index) => (
              <PostComponent key={index} post={post} />
            ))}
          </View>
        </ScrollView>
        <View className="bottom-4 absolute right-4  flex justify-center items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => addPostRef?.current?.open()}
            className="flex justify-center items-center bg-green-700 rounded-full h-14 w-14"
          >
            <MaterialCommunityIcons name="chat-plus" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Modalize modalHeight={600} ref={addPostRef} handlePosition="inside">
        <View className="bg-green-500 w-full ">
          <Text>Add Post</Text>
        </View>
      </Modalize>
    </>
  );
};

export default community;
