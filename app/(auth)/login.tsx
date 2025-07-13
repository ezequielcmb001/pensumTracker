import { useRouter } from "expo-router";
import { Button, View, Text } from "react-native";
// import { useAuth } from "../libs/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  // const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    // login();
    router.push("/(tabs)/home");
  };

  return (
    <SafeAreaView>
      <View className="flex-1 items-center justify-center bg-red-400">
        <Text className="text-blue-500">Login in theWWWW QQQQ</Text>
        <Button title="Iniciar sesión" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}
