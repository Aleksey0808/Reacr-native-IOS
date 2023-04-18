import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./components/router";
import {singIn} from './Screens/auth/RegistrationScreen';
console.log(singIn)

export default function App() {
  const route = useRoute(singIn)
  console.log(route)
  
  return (
<NavigationContainer>
    {route}
</NavigationContainer>
    
  )
}
