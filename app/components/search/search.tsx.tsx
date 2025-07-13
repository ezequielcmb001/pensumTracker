// src/screens/Search.tsx
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Search() {
  return (
    <SafeAreaView>
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-2xl font-bold text-green-600">🔍 Search</Text>
        </View>
    </SafeAreaView>
  );
}
