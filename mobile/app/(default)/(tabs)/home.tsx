import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import axios from "@/api/axios";

interface blog {
  id: number;
  title: string;
  description: string;
  image: any;
}

export default function Home() {
  const [blog, setBlog] = useState<blog[]>([])

const imgURl = `http://127.0.0.1:8000/storage/`
  const fetchBlog = async () => {
    try {
     const {data} = await axios.get(
        "/blog"
      );
      setBlog(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
fetchBlog()
  }, [])

  return (
    <View>
      
      {blog.map((item) => (
        <View key={item?.id}>
          <Text>{item?.title}</Text>
          <Text>{item?.description}</Text>
           <Image
                    className="h-40"
                    source={{
                      uri: `http://127.0.0.1:8000/storage/${item?.image}`,
                    }}
                  />
          </View>
      ))}
    </View>
  );
}
