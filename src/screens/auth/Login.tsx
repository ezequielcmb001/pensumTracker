import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  return (
    <SafeAreaView>
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-bold mb-4">Login</Text>
            <TouchableOpacity onPress={onLoginSuccess} className="bg-blue-500 px-4 py-2 rounded">
                <Text className="text-white">Entrar</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
