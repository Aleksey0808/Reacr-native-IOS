import React from "react";
import {View, Text, StyleSheet} from "react-native"
import { Camera, CameraType } from 'expo-camera';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CreatePostsScreen() {
    return <View style={styles.container}><Camera style={styles.camera}>
        <TouchableOpacity style={styles.snapContainer} onPress={() => {}}>
            <Text style={styles.snap} >SNAP</Text>
        </TouchableOpacity>
        </Camera></View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        height: 340,
        borderRadius: 8,
        marginTop: 52,
        alignItems: "center",
        justifyContent: "flex-end",
      },
      snap: {
        color: '#fff',
        
       
      },
      snapContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: '#ff0000',
        width: 60,
        height:60,
        marginBottom: 20,
        borderRadius: 50,
      }
})