import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useAuth } from "@/contexts/auth-context";

export default function Profile() {
  const { logout,user } = useAuth();

  const imgURl = `http://127.0.0.1:8000/storage/${user?.image}`

  return (
    <View>
      <Text>Name: {user?.name}</Text>
            <Text>Email: {user?.email}</Text>
 <Image
          className="h-40"
          source={{
            uri: imgURl,
          }}
        />
      <TouchableOpacity
        onPress={logout}
        className="h-12 rounded-full bg-blue-500 items-center justify-center"
      >
        <Text className="text-white font-bold">Logout</Text>
      </TouchableOpacity>
      
    </View>
  );
}
