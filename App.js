import React, {useState} from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./src/components/router";
import {singIn} from './src/Screens/auth/RegistrationScreen';
import db from './src/firebase/config'
import {
  getAuth,
} from "firebase/auth";

import { store } from "./src/redux/store";
// console.log(store)

export default function App() {
  // const [iasReady, setIasReady] = useState(false)
  const [user, setUser] = useState(null)
 
  const auth = getAuth(db);
  auth.onAuthStateChanged((user) => setUser(user))

  const route = useRoute(user)
  
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        {route}
      </NavigationContainer>
    </Provider>    
  )
}
