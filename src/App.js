import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./Screens/components/router";

export default function App() {
  const route = useRoute(true)
  
  return (
<NavigationContainer>
    {route}
</NavigationContainer>
    
  )
}
