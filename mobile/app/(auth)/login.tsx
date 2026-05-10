import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const handleLogin = async () => {
    try {
      await login({
        
        email,
        password,
      });

      setErrors({});
    } catch (err: any) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      }
    }
  };

  return (
  <View className="flex-1 bg-[#06130d] justify-center px-6">
    {/* Header */}
    <View className="items-center mb-10">
      <View className="w-24 h-24 rounded-[28px] bg-[#0f2e1f] items-center justify-center shadow-lg border border-emerald-500/30">
        <Text className="text-emerald-400 text-4xl font-extrabold">
          S
        </Text>
      </View>

      <Text className="text-4xl font-extrabold text-emerald-300 mt-5 tracking-widest">
        ACCESS NODE
      </Text>

      <Text className="text-gray-400 mt-2 text-center text-base">
        Authenticate to enter the system core 🌿
      </Text>
    </View>

    {/* Login Card */}
    <View
      className="bg-[#0a1a12] rounded-[32px] p-7 border border-emerald-700/40"
      style={{
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.45,
        shadowRadius: 25,
        shadowOffset: { width: 0, height: 12 },
      }}
    >
      {/* Title */}
      <View className="mb-8">
        <Text className="text-3xl font-bold text-emerald-200">
          Sign In
        </Text>

        <Text className="text-gray-400 mt-2">
          Secure login gateway initialized
        </Text>
      </View>

      {/* Email */}
      <View className="mb-5">
        <Text className="text-emerald-300 font-semibold mb-2">
          Email
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="user@system.com"
          placeholderTextColor="#64748b"
          keyboardType="email-address"
          autoCapitalize="none"
          className="h-14 px-5 rounded-2xl border border-emerald-700 bg-[#06130d] text-white"
        />

        {errors.email && (
          <Text className="text-emerald-400 text-sm mt-2">
            {errors.email[0]}
          </Text>
        )}
      </View>

      {/* Password */}
      <View className="mb-3">
        <Text className="text-emerald-300 font-semibold mb-2">
          Password
        </Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          placeholderTextColor="#64748b"
          secureTextEntry
          className="h-14 px-5 rounded-2xl border border-emerald-700 bg-[#06130d] text-white"
        />

        {errors.password && (
          <Text className="text-emerald-400 text-sm mt-2">
            {errors.password[0]}
          </Text>
        )}
      </View>

      {/* Forgot */}
      <TouchableOpacity className="items-end mb-6">
        <Text className="text-emerald-300 font-semibold">
          Forgot password?
        </Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.85}
        className="h-14 rounded-2xl bg-emerald-600 items-center justify-center"
      >
        <Text className="text-white font-bold text-base">
          LOGIN
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center my-7">
        <View className="flex-1 h-[1px] bg-emerald-800/50" />
        <Text className="mx-3 text-gray-500 font-medium">
          OR
        </Text>
        <View className="flex-1 h-[1px] bg-emerald-800/50" />
      </View>

      {/* Register */}
      <View className="flex-row justify-center">
        <Text className="text-gray-400">
          No account yet?{" "}
        </Text>

        <TouchableOpacity>
          <Text className="text-emerald-300 font-bold">
            Create one
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
}
