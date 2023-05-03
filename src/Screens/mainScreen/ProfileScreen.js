import React from "react";
import {View, Text, StyleSheet, Button} from "react-native";
import { useDispatch } from "react-redux";
import db from '../../firebase/config';
import { getAuth} from "firebase/auth";
import {authSingOutUser} from '../../redux/auth/authOperations';

// const auth = getAuth(db);

export default function ProfileScreens() {
    const dispatch = useDispatch()

    const signOut = () => {
        dispatch(authSingOutUser())
    }


    return <View style={styles.container}>
        <Text>ProfileScreens</Text>
        <Button title="signOut" onPress={signOut}/>
        </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})