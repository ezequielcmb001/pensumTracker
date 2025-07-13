import { useState } from "react";
export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return { isLoggedIn, login: () => setIsLoggedIn(true), logout: () => setIsLoggedIn(false) };
}
