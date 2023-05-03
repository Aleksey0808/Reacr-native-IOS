import React, {useState, useEffect} from "react";
import { Provider, useSelector } from "react-redux";


// import {singIn} from './src/Screens/auth/RegistrationScreen';


import Main from "./src/components/Main"

import { store } from "./src/redux/store";
// console.log(store)

export default function App() {
  // const [iasReady, setIasReady] = useState(false)





  return (
    <Provider store={store}>
      <Main/>
    </Provider>    
  )
}
