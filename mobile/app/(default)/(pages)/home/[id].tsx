
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
      const { data } = await axios.get(`/blog/${id}`);
      setTitle(data.title);
      setDescription(data.description);
      setCurrentImage(data.image);
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
        backgroundColor: "#f4f4f4",
      }}
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Edit Blog
        </Text>

        {/* Title Input */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginBottom: 8,
          }}
        >
          Title
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter blog title"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            fontSize: 16,
          }}
        />
        {errors.title && (
          <Text
            style={{
              color: "#ef4444",
              fontSize: 14,
              marginBottom: 16,
            }}
          >
            {errors.title[0]}
          </Text>
        )}

        {/* Description Input */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginBottom: 8,
          }}
        >
          Description
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Enter blog description"
          multiline
          numberOfLines={4}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            fontSize: 16,
            minHeight: 100,
            textAlignVertical: "top",
          }}
        />
        {errors.description && (
          <Text
            style={{
              color: "#ef4444",
              fontSize: 14,
              marginBottom: 16,
            }}
          >
            {errors.description[0]}
          </Text>
        )}

        {/* Current Image */}
        {!image && currentImage && (
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 8,
              }}
            >
              Current Image
            </Text>
            <Image
              style={{
                width: "100%",
                height: 200,
                borderRadius: 8,
              }}
              source={{
                uri: `http://127.0.0.1:8000/storage/${currentImage}`,
              }}
            />
          </View>
        )}

        {/* New Image Preview */}
        {image && (
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 8,
              }}
            >
              New Image
            </Text>
            <Image
              style={{
                width: "100%",
                height: 200,
                borderRadius: 8,
              }}
              source={{
                uri: image.uri,
              }}
            />
          </View>
        )}

        {/* Image Picker Button */}
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: "#3b82f6",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            {image ? "Change Image" : "Browse New Image"}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "#666",
            fontSize: 12,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Leave empty to keep current image
        </Text>

        {errors.image && (
          <Text
            style={{
              color: "#ef4444",
              fontSize: 14,
              marginBottom: 16,
            }}
          >
            {errors.image[0]}
          </Text>
        )}

        {/* Update Button */}
        <TouchableOpacity
          onPress={handleUpdateBlog}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#86efac" : "#22c55e",
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {loading ? "Updating..." : "Update Blog"}
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: "#9ca3af",
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
