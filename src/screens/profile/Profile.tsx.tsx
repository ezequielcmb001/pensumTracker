// src/screens/Profile.tsx
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  return (
    <SafeAreaView>
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-2xl font-bold text-purple-600">👤 Profile</Text>
        </View>
    </SafeAreaView>
  );
}
