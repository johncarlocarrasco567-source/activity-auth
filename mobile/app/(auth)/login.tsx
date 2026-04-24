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
    <View className="flex-1 items-center justify-center p-4">
      <View className="bg-white shadow-md p-4 w-full gap-4">
        <Text className="text-xl font-bold text-center">Login</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          className="h-12 px-4 border"
          placeholder="Enter your email"
        />
        {errors.email && (
          <Text className="text-red-500 text-sm">
            {errors.email[0]}
          </Text>
        )}
        <TextInput
          value={password}
          onChangeText={setPassword}
          className="h-12 px-4 border"
          placeholder="Enter your password"
          secureTextEntry
        />
        {errors.password && (
          <Text className="text-red-500 text-sm">
            {errors.password[0]}
          </Text>
        )}
        <TouchableOpacity
          onPress={handleLogin}
          className="h-12 rounded-full bg-blue-500 items-center justify-center"
        >
          <Text className="text-white font-bold">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
