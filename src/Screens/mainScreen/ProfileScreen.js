import React from "react";
import {View, Text, StyleSheet} from "react-native"

export default function ProfileScreens() {
    return <View style={styles.container}><Text>ProfileScreens</Text></View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})