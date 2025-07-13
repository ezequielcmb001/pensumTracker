import { Stack, Redirect } from "expo-router";
import { useAuth } from "../libs/useAuth";

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
