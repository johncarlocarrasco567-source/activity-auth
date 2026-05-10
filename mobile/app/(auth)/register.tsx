import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image,ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const [image, setImage] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});

  const handleLogin = async () => {
    try {
      await register({
        name,
        email,
        password,
        password_confirmation,
        image: image?.file,
      });

      setErrors({});
    } catch (err: any) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      }
    }
  };
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

return (
  <ScrollView
    showsVerticalScrollIndicator={false}
    className="flex-1 bg-[#050816]"
    contentContainerStyle={{
      flexGrow: 1,
      justifyContent: "center",
      padding: 24,
    }}
  >
    {/* Header */}
    <View className="items-center mb-10">
      <View className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-sky-400 to-blue-600 items-center justify-center shadow-lg">
        <Text className="text-white text-4xl font-extrabold">
          S
        </Text>
      </View>

      <Text className="text-4xl font-extrabold text-white mt-5 tracking-wide">
        BLUE SIGNUP
      </Text>

      <Text className="text-gray-400 mt-2 text-center text-base">
        Create your account and access the system ⚡
      </Text>
    </View>

    {/* Register Card */}
    <View
      className="bg-[#0b1220] rounded-[32px] p-7 border border-sky-900/40"
      style={{
        elevation: 12,
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
      }}
    >
      {/* Title */}
      <View className="mb-8">
        <Text className="text-3xl font-bold text-white">
          Create Account
        </Text>

        <Text className="text-gray-400 mt-2">
          Build your digital profile
        </Text>
      </View>

      {/* Name */}
      <View className="mb-5">
        <Text className="text-gray-300 font-semibold mb-2">
          Full Name
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="System User"
          placeholderTextColor="#64748b"
          className="h-14 px-5 rounded-2xl border border-sky-900 bg-[#050816] text-white"
        />

        {errors.name && (
          <Text className="text-sky-400 text-sm mt-2">
            {errors.name[0]}
          </Text>
        )}
      </View>

      {/* Email */}
      <View className="mb-5">
        <Text className="text-gray-300 font-semibold mb-2">
          Email
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="user@system.com"
          placeholderTextColor="#64748b"
          keyboardType="email-address"
          autoCapitalize="none"
          className="h-14 px-5 rounded-2xl border border-sky-900 bg-[#050816] text-white"
        />

        {errors.email && (
          <Text className="text-sky-400 text-sm mt-2">
            {errors.email[0]}
          </Text>
        )}
      </View>

      {/* Password */}
      <View className="mb-5">
        <Text className="text-gray-300 font-semibold mb-2">
          Password
        </Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          placeholderTextColor="#64748b"
          secureTextEntry
          className="h-14 px-5 rounded-2xl border border-sky-900 bg-[#050816] text-white"
        />

        {errors.password && (
          <Text className="text-sky-400 text-sm mt-2">
            {errors.password[0]}
          </Text>
        )}
      </View>

      {/* Confirm Password */}
      <View className="mb-5">
        <Text className="text-gray-300 font-semibold mb-2">
          Confirm Password
        </Text>

        <TextInput
          value={password_confirmation}
          onChangeText={setPasswordConfirmation}
          placeholder="••••••••"
          placeholderTextColor="#64748b"
          secureTextEntry
          className="h-14 px-5 rounded-2xl border border-sky-900 bg-[#050816] text-white"
        />

        {errors.password_confirmation && (
          <Text className="text-sky-400 text-sm mt-2">
            {errors.password_confirmation[0]}
          </Text>
        )}
      </View>

      {/* Image Picker */}
      <View className="mb-5">
        <Text className="text-gray-300 font-semibold mb-2">
          Profile Image
        </Text>

        <TouchableOpacity
          onPress={pickImage}
          activeOpacity={0.85}
          className="h-14 rounded-2xl bg-sky-500 items-center justify-center"
        >
          <Text className="text-white font-bold">
            Choose Avatar
          </Text>
        </TouchableOpacity>

        {errors.image && (
          <Text className="text-sky-400 text-sm mt-2">
            {errors.image[0]}
          </Text>
        )}
      </View>

      {/* Preview */}
      {image && (
        <View className="mb-6">
          <Image
            source={{ uri: image.uri }}
            className="w-full h-56 rounded-3xl border border-sky-900"
            resizeMode="cover"
          />
        </View>
      )}

      {/* Register Button */}
      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.85}
        className="h-14 rounded-2xl bg-sky-500 items-center justify-center"
      >
        <Text className="text-white font-bold text-base">
          CREATE ACCOUNT
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center my-7">
        <View className="flex-1 h-[1px] bg-sky-900/50" />
        <Text className="mx-3 text-gray-500 font-medium">
          OR
        </Text>
        <View className="flex-1 h-[1px] bg-sky-900/50" />
      </View>

      {/* Login */}
      <View className="flex-row justify-center">
        <Text className="text-gray-400">
          Already a user?{" "}
        </Text>

        <TouchableOpacity>
          <Text className="text-sky-400 font-bold">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
);
}
