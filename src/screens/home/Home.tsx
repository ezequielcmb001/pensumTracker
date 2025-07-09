// src/screens/Home.tsx
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView>
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-2xl font-bold text-yellow-600">📜 Home</Text>
        </View>
    </SafeAreaView>
  );
}
