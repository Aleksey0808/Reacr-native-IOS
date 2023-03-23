import React from "react";

import Registration from "../src/Screens/RegistrationScreen";
import Login from "../src/Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const MainStack = createStackNavigator();

export default function App() {
  
  return (
<NavigationContainer>
     <MainStack.Navigator initialRouteName="Registration">
      <MainStack.Screen name="Registration" component={Registration} />
      <MainStack.Screen name="Login" component={Login} />
    </MainStack.Navigator>
  </NavigationContainer>
    
  )
}
