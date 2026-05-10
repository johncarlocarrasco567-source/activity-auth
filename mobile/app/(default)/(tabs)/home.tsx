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
   
            try {
              await axios.delete(`/blog/delete/${id}`);
              fetchBlog();
              
            } catch (error: any) {
              console.log(error);
             
            }
        
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
      backgroundColor: "#0b0f1a",
    }}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      padding: 16,
      paddingBottom: 60,
    }}
  >
    {/* Header */}
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "900",
          color: "#ffffff",
        }}
      >
        BLOG CONTROL
      </Text>

      <Text
        style={{
          color: "#9ca3af",
          marginTop: 4,
        }}
      >
        Admin-style management dashboard ⚙️
      </Text>
    </View>

    {blogs.map((item) => (
      <View
        key={item.id}
        style={{
          flexDirection: "row",
          backgroundColor: "#111827",
          borderRadius: 18,
          marginBottom: 14,
          borderWidth: 1,
          borderColor: "#1f2937",
          overflow: "hidden",

          shadowColor: "#000",
          shadowOpacity: 0.4,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 6,
        }}
      >
        {/* LEFT INDICATOR BAR (new identity) */}
        <View
          style={{
            width: 5,
            backgroundColor: "#6366f1",
          }}
        />

        {/* IMAGE (small thumbnail style) */}
        <Image
          source={{
            uri: `http://127.0.0.1:8000/storage/${item.image}`,
          }}
          style={{
            width: 90,
            height: "100%",
          }}
          resizeMode="cover"
        />

        {/* CONTENT */}
        <View style={{ flex: 1, padding: 12 }}>
          {/* Title */}
          <Text
            numberOfLines={1}
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "800",
            }}
          >
            {item.title}
          </Text>

          {/* Description */}
          <Text
            numberOfLines={2}
            style={{
              color: "#9ca3af",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            {item.description}
          </Text>

          {/* Actions */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              gap: 8,
            }}
          >
            {/* Update */}
            <Pressable
              onPress={() =>
                router.navigate(`/(default)/(pages)/home/${item.id}`)
              }
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: pressed ? "#16a34a" : "#22c55e",
                paddingVertical: 8,
                borderRadius: 10,
                alignItems: "center",
              })}
            >
              <Text style={{ color: "white", fontSize: 12, fontWeight: "800" }}>
                UPDATE
              </Text>
            </Pressable>

            {/* Delete */}
            <Pressable
              onPress={() => deleteBlog(item.id)}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: pressed ? "#991b1b" : "#ef4444",
                paddingVertical: 8,
                borderRadius: 10,
                alignItems: "center",
              })}
            >
              <Text style={{ color: "white", fontSize: 12, fontWeight: "800" }}>
                DELETE
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    ))}
  </ScrollView>
);
}
