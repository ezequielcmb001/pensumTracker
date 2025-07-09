// src/navigation/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';


export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <TabNavigator />
      ) : (
        <AuthNavigator onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
}
