import { Tabs } from "expo-router";
// import { useAuth } from "../libs/useAuth";

export default function TabsLayout() {
  // const { isLoggedIn } = useAuth();

  // if (!isLoggedIn) {
  //   return <Redirect href="/(auth)/login" />;
  // }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: "Inicio" }} />
      <Tabs.Screen name="history" options={{ title: "Historial" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
