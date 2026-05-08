import { View, Text, Image, Pressable, ScrollView, Alert } from "react-native";
import { useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import axios from "@/api/axios";

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get("/blog");
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id: number) => {
    Alert.alert(
      "Delete Blog",
      "Are you sure you want to delete this blog?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await axios.delete(`/blog/delete/${id}`);
              fetchBlog();
              Alert.alert("Success", "Blog deleted successfully");
            } catch (error: any) {
              console.log(error);
              Alert.alert("Error", "Failed to delete blog");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  useFocusEffect(
    () => {
      fetchBlog();
      return () => {};
    }
  );

  useEffect(() => {
    fetchBlog();
  }, []);

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
      {blogs.map((item) => (
        <View
          key={item.id}
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            marginBottom: 20,
            overflow: "hidden",
            elevation: 3,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 5,
          }}
        >
          <Image
            source={{
              uri: `http://127.0.0.1:8000/storage/${item.image}`,
            }}
            style={{
              width: "100%",
              height: 200,
            }}
            resizeMode="cover"
          />

          <View
            style={{
              padding: 15,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                color: "#555",
                marginBottom: 10,
              }}
            >
              {item.description}
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 10,
              }}
            >
              {/* Update Button */}
              <Pressable
                onPress={() => router.navigate(`/(default)/(pages)/home/${item.id}`)}
                style={{
                  flex: 1,
                  backgroundColor: "#22c55e",
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Update
                </Text>
              </Pressable>

              {/* Delete Button */}
              <Pressable
                onPress={() => deleteBlog(item.id)}
                style={{
                  flex: 1,
                  backgroundColor: "#ef4444",
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
