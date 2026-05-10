import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import axios from "@/api/axios";

export default function EditBlog() {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // Fetch blog data
  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/blog/${id}`);

setTitle(response.data.title);
setDescription(response.data.description);
setCurrentImage(response.data.image);
      console.log(response.data.title)
    } catch (error) {
      console.log(error);
      console.log("Error", "Failed to fetch blog data");
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
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

  const handleUpdateBlog = async () => {
  try {
    const response = await axios.post(
      `/blogs/${id}`,
      { title, description, image: image?.file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Success", response.data.message);
    router.back();
  } catch (error: any) {
    setErrors(error.response.data.errors);
  }
};

 return (
  <ScrollView
    style={{
      flex: 1,
      backgroundColor: "#050b08",
    }}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      padding: 20,
      paddingBottom: 60,
    }}
  >
    {/* Header */}
    <View style={{ marginBottom: 28 }}>
      <Text
        style={{
          fontSize: 34,
          fontWeight: "900",
          color: "#22c55e",
        }}
      >
        EDIT MODE
      </Text>

      <Text
        style={{
          marginTop: 6,
          fontSize: 15,
          color: "#9ca3af",
        }}
      >
        Modify your post like a system admin ⚙️
      </Text>
    </View>

    {/* Card */}
    <View
      style={{
        backgroundColor: "#0b1410",
        borderRadius: 28,
        padding: 22,
        borderWidth: 1,
        borderColor: "#14532d",

        shadowColor: "#000",
        shadowOpacity: 0.6,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
      }}
    >
      {/* Title */}
      <View style={{ marginBottom: 18 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "800",
            color: "#22c55e",
            marginBottom: 8,
          }}
        >
          TITLE
        </Text>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title..."
          placeholderTextColor="#64748b"
          style={{
            height: 52,
            borderRadius: 14,
            paddingHorizontal: 14,
            borderWidth: 1,
            borderColor: "#14532d",
            backgroundColor: "#050b08",
            color: "#ffffff",
          }}
        />

        {errors.title && (
          <Text style={{ color: "#f87171", marginTop: 6 }}>
            {errors.title[0]}
          </Text>
        )}
      </View>

      {/* Description */}
      <View style={{ marginBottom: 18 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "800",
            color: "#22c55e",
            marginBottom: 8,
          }}
        >
          DESCRIPTION
        </Text>

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Write something..."
          placeholderTextColor="#64748b"
          multiline
          textAlignVertical="top"
          style={{
            minHeight: 140,
            borderRadius: 14,
            padding: 14,
            borderWidth: 1,
            borderColor: "#14532d",
            backgroundColor: "#050b08",
            color: "#ffffff",
          }}
        />

        {errors.description && (
          <Text style={{ color: "#f87171", marginTop: 6 }}>
            {errors.description[0]}
          </Text>
        )}
      </View>

      {/* Current Image */}
      {!image && currentImage && (
        <View style={{ marginBottom: 18 }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "800",
              color: "#22c55e",
              marginBottom: 8,
            }}
          >
            CURRENT IMAGE
          </Text>

          <Image
            source={{
              uri: `http://127.0.0.1:8000/storage/${currentImage}`,
            }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 18,
              borderWidth: 1,
              borderColor: "#14532d",
            }}
            resizeMode="cover"
          />
        </View>
      )}

      {/* New Image */}
      {image && (
        <View style={{ marginBottom: 18 }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "800",
              color: "#22c55e",
              marginBottom: 8,
            }}
          >
            NEW IMAGE
          </Text>

          <Image
            source={{ uri: image.uri }}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 18,
              borderWidth: 1,
              borderColor: "#14532d",
            }}
            resizeMode="cover"
          />
        </View>
      )}

      {/* Pick Image */}
      <TouchableOpacity
        onPress={pickImage}
        activeOpacity={0.85}
        style={{
          height: 52,
          borderRadius: 16,
          backgroundColor: "#22c55e",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#000", fontWeight: "900" }}>
          {image ? "CHANGE IMAGE" : "BROWSE IMAGE"}
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          textAlign: "center",
          color: "#9ca3af",
          fontSize: 12,
          marginBottom: 16,
        }}
      >
        Leave empty to keep current image
      </Text>

      {/* Buttons */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        {/* Update */}
        <TouchableOpacity
          onPress={handleUpdateBlog}
          disabled={loading}
          style={{
            flex: 1,
            height: 52,
            borderRadius: 16,
            backgroundColor: loading ? "#14532d" : "#22c55e",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#000", fontWeight: "900" }}>
            {loading ? "UPDATING..." : "UPDATE"}
          </Text>
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            flex: 1,
            height: 52,
            borderRadius: 16,
            backgroundColor: "#0b1410",
            borderWidth: 1,
            borderColor: "#22c55e",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#22c55e", fontWeight: "900" }}>
            CANCEL
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
);
}
