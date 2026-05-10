import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useAuth } from "@/contexts/auth-context";

export default function Profile() {
  const { logout,user } = useAuth();

  const imgURl = `http://127.0.0.1:8000/storage/${user?.image}`

  return (
  <View className="flex-1 bg-[#0b0f1a] px-6 justify-center">
    
    {/* Side Accent Panel */}
    <View className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-purple-500 to-pink-500" />

    {/* Profile Container */}
    <View
      className="bg-[#111827]/90 rounded-[30px] p-6 border border-gray-800"
      style={{
        elevation: 12,
        shadowColor: "#000",
        shadowOpacity: 0.6,
        shadowRadius: 25,
        shadowOffset: { width: 0, height: 12 },
      }}
    >
      {/* Header Row */}
      <View className="flex-row items-center mb-6">
        
        {/* Avatar */}
        <View className="relative mr-4">
          <Image
            source={{ uri: imgURl }}
            className="w-20 h-20 rounded-2xl border-2 border-purple-500"
          />

          {/* small status dot */}
          <View className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#111827]" />
        </View>

        {/* Name + Email */}
        <View className="flex-1">
          <Text className="text-white text-xl font-extrabold">
            {user?.name}
          </Text>

          <Text className="text-gray-400 text-sm mt-1">
            {user?.email}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-[1px] bg-gray-800 mb-5" />

      {/* Info Grid */}
      <View className="flex-row justify-between mb-6">
        
        <View className="bg-[#0b1220] p-3 rounded-2xl flex-1 mr-2 border border-gray-800">
          <Text className="text-gray-400 text-xs">STATUS</Text>
          <Text className="text-green-400 font-bold mt-1">
            ONLINE
          </Text>
        </View>

        <View className="bg-[#0b1220] p-3 rounded-2xl flex-1 ml-2 border border-gray-800">
          <Text className="text-gray-400 text-xs">RANK</Text>
          <Text className="text-white font-bold mt-1">
            Rookie Dev
          </Text>
        </View>
      </View>

      {/* Big Action Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        className="h-14 rounded-2xl bg-[#1f2937] items-center justify-center mb-3 border border-gray-700"
      >
        <Text className="text-white font-bold">
          EDIT PROFILE
        </Text>
      </TouchableOpacity>

      {/* Logout (danger style different from before) */}
      <TouchableOpacity
        onPress={logout}
        activeOpacity={0.85}
        className="h-14 rounded-2xl bg-transparent border border-red-500 items-center justify-center"
      >
        <Text className="text-red-400 font-bold">
          LOGOUT
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
}
