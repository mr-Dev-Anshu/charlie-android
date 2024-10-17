import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Modalize } from "react-native-modalize";
import { post } from "../../constants/tours";
import PostComponent from "../../components/UI/PostComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import LoginReqCard from "../../components/UI/LoginReqCard";
import { useSelector } from "react-redux";

const community = () => {
  const { user } = useSelector((state) => state.user);

  const [images, setImages] = useState([]);

  const handleSelectImages = (existingImages, assets) => {
    setImages([...existingImages, ...assets]);
  };

  const handleUnselect = (uri) => {
    setImages(images.filter((image) => image.uri !== uri));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      handleSelectImages(images, result.assets);
    }
  };

  const addPostRef = useRef(null);

  return (
    <>
      {user ? (
        <>
          <View className="mt-16 relative">
            <ScrollView
              contentContainerStyle={{ paddingBottom: 10 }}
              showsVerticalScrollIndicator={false}
            >
              <View className="px-8 pt-16">
                {post.map((post, index) => (
                  <PostComponent key={index} post={post} />
                ))}
              </View>
            </ScrollView>
            <View className="bottom-4 absolute right-4 flex justify-center items-center">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={(event) => {
                  event.persist();
                  addPostRef?.current?.open();
                }}
                className="flex justify-center items-center bg-green-700 rounded-full h-14 w-14"
              >
                <MaterialCommunityIcons
                  name="chat-plus"
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
          <SafeAreaView style={{ flex: 1, zIndex: 1000 }}>
            <Modalize
              modalHeight={500}
              ref={addPostRef}
              handlePosition="inside"
              modalStyle={{ borderRadius: 20, overflow: "hidden" }}
            >
              <View className="w-full space-y-4 px-4">
                <TextInput
                  placeholder="Write your thoughts...."
                  keyboardType="default"
                  className="text-white text-lg h-12 font-semibold w-full mt-5 outline outline-2 outline-green-600 indent-3 border border-green-600 rounded-[10px] p-2"
                  placeholderTextColor={"gray"}
                />
                {images.length !== 0 && (
                  <View className="flex flex-row flex-wrap space-x-4 justify-center items-center border-2 border-green-600 rounded-lg h-fit p-1">
                    {images.map((img, idx) => (
                      <View className="relative h-fit w-fit">
                        <Image
                          key={idx}
                          source={{ uri: img.uri }}
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: 10,
                            marginBottom: 14,
                          }}
                        />
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => handleUnselect(img.uri)}
                          className="text-white bg-white border-2 border-gray-500 absolute h-5 w-5  rounded-full -top-2 -right-2 text-center flex justify-center items-center "
                        >
                          <Ionicons
                            name="close-outline"
                            size={14}
                            color={"red"}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
                <View className="w-full flex justify-center items-center">
                  <TouchableOpacity
                    onPress={pickImage}
                    className="bg-green-500 px-4 py-2 rounded-lg"
                  >
                    <View>
                      <Text>Add Images</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modalize>
          </SafeAreaView>
        </>
      ) : (
        <LoginReqCard />
      )}
    </>
  );
};

export default community;
