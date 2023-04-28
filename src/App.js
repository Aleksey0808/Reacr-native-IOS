import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./components/router";
import {singIn} from './Screens/auth/RegistrationScreen';

import { store } from "./redux/store";

export default function App() {
  const route = useRoute(singIn)
  console.log(store)
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        {route}
      </NavigationContainer>
    </Provider>    
  )
}
