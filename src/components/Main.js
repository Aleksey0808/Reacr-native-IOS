import React, {useState, useEffect} from "react";
import {} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../../router";
import db from '../firebase/config'
import { getAuth,} from "firebase/auth";
import {authStateChangeUser} from '../redux/auth/authOperations'

const Main = () => {
    // const [user, setUser] = useState(null)

    const {stateChange} = useSelector(state => state.auth)
    // console.log(state.auth.stateChange)
 
    // const auth = getAuth(db);
    // auth.onAuthStateChanged((user) => setUser(user)) 

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authStateChangeUser())
        },[])

    const route = useRoute(stateChange)

    return <NavigationContainer>
             {route}
        </NavigationContainer>
}

export default Main