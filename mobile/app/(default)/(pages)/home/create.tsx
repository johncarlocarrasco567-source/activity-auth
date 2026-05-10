import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
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
  <ScrollView
    showsVerticalScrollIndicator={false}
    className="flex-1 bg-[#071a12]"
    contentContainerStyle={{
      padding: 18,
      paddingBottom: 60,
    }}
  >
    {/* Header */}
    <View className="mb-8">
      <Text className="text-4xl font-extrabold text-white">
        CREATE BLOG
      </Text>

      <Text className="text-gray-400 mt-2 text-base">
        Laravel-style green admin system 🌿
      </Text>
    </View>

    {/* MAIN PANEL (split layout feel) */}
    <View className="bg-[#0b1f16] rounded-[28px] overflow-hidden border border-emerald-900/40">

      {/* LEFT ACCENT BAR */}
      <View className="h-2 bg-emerald-500" />

      <View className="p-6">

        {/* FORM GRID FEEL */}
        <View className="gap-5">

          {/* Title */}
          <View>
            <Text className="text-emerald-300 font-semibold mb-2">
              TITLE
            </Text>

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter blog title..."
              placeholderTextColor="#6b7280"
              className="h-14 px-4 rounded-2xl bg-[#071a12] border border-emerald-800 text-white"
            />

            {errors.title && (
              <Text className="text-emerald-400 text-sm mt-2">
                {errors.title[0]}
              </Text>
            )}
          </View>

          {/* Description */}
          <View>
            <Text className="text-emerald-300 font-semibold mb-2">
              DESCRIPTION
            </Text>

            <TextInput
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              placeholder="Write something powerful..."
              placeholderTextColor="#6b7280"
              className="min-h-[140px] px-4 py-4 rounded-2xl bg-[#071a12] border border-emerald-800 text-white"
            />

            {errors.description && (
              <Text className="text-emerald-400 text-sm mt-2">
                {errors.description[0]}
              </Text>
            )}
          </View>

          {/* IMAGE SECTION (separated module) */}
          <View className="pt-2 border-t border-emerald-900/40">
            <Text className="text-emerald-300 font-semibold mb-3">
              IMAGE UPLOAD
            </Text>

            <TouchableOpacity
              onPress={pickImage}
              activeOpacity={0.85}
              className="h-14 rounded-2xl bg-[#052e1b] border border-emerald-600 items-center justify-center"
            >
              <Text className="text-emerald-300 font-bold">
                Choose Image
              </Text>
            </TouchableOpacity>

            {errors.image && (
              <Text className="text-emerald-400 text-sm mt-2">
                {errors.image[0]}
              </Text>
            )}
          </View>

          {/* PREVIEW (only if exists) */}
          {image && (
            <View>
              <Text className="text-emerald-300 font-semibold mb-3">
                PREVIEW
              </Text>

              <Image
                source={{ uri: image.uri }}
                className="w-full h-56 rounded-2xl border border-emerald-800"
                resizeMode="cover"
              />
            </View>
          )}

          {/* SUBMIT */}
          <TouchableOpacity
            onPress={handleCreateBlog}
            activeOpacity={0.85}
            className="h-14 rounded-2xl bg-emerald-500 items-center justify-center"
          >
            <Text className="text-white font-bold text-base tracking-widest">
              PUBLISH
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  </ScrollView>
);
}
