import { View, Text } from "react-native";
import React, { useRef } from "react";
import PostComponent from "../../components/UI/PostComponent";
import { post } from "../../constants/tours";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";

const community = () => {
  const addPostRef = useRef(null);
  return (
    <>
      <View className="mt-14 relative">
        <View className=" flex justify-center items-center py-1 ">
          <Text className="text-lg font-semibold text-green-800">
            Community Posts
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 28 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 pt-4">
            {post.map((post, index) => (
              <PostComponent key={index} post={post} />
            ))}
          </View>
        </ScrollView>
        <View className="bottom-12 absolute right-4  flex justify-center items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => addPostRef?.current?.open()}
            className="flex justify-center items-center bg-green-600 rounded-full h-14 w-14"
          >
            <MaterialCommunityIcons name="chat-plus" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Modalize modalHeight={600} ref={addPostRef} handlePosition="inside">
        <View>
          <Text>Add Post</Text>
        </View>
      </Modalize>
    </>
  );
};

export default community;
