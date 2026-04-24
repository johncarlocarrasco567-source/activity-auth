import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import axios from "@/api/axios";

export default function Create() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<any>(null);
  const [description, setDescription] = useState("");
  
  const [errors, setErrors] = useState<any>({});

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleCreateBlog = async () => {
    try {
     await axios.post(
        "/create/blog",
        { title, image: image?.file, description },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("gaga")
    } catch (err: any) {
      setErrors(err.response.data.errors)
    }
  };

  return (
    <View className="p-4 gap-4">
      <TextInput
        value={title}
        onChangeText={setTitle}
        className="h-12 px-4 border"
      />
      {errors.title && (
          <Text className="text-red-500 text-sm">
            {errors.title[0]}
          </Text>
        )}
      <TextInput
        value={description}
        onChangeText={setDescription}
        className="h-12 px-4 border"
      />
      {errors.description && (
          <Text className="text-red-500 text-sm">
            {errors.description[0]}
          </Text>
        )}
      <View>
        <TouchableOpacity
          onPress={pickImage}
          className="h-12 bg-blue-500 items-center justify-center"
        >
          <Text className="text-white">Browse Image</Text>
        </TouchableOpacity>
      </View>
      {image && (
        <Image
          className="h-40"
          source={{
            uri: image.uri,
          }}
        />
      )}
      {errors.image && (
          <Text className="text-red-500 text-sm">
            {errors.image[0]}
          </Text>
        )}
      <TouchableOpacity
        onPress={handleCreateBlog}
        className="h-12 rounded-full bg-blue-500 items-center justify-center"
      >
        <Text className="text-white font-bold">Create Blog</Text>
      </TouchableOpacity>
    </View>
  );
}
