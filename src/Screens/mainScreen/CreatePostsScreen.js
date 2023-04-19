import React, {useState} from "react";
import {View, Text, StyleSheet, Image} from "react-native"
import { Camera, CameraType } from 'expo-camera';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CreatePostsScreen({navigation}) {
  const [camera, setCamera] = useState(null)
  const [photo, setPhoto] = useState(null)

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync()
    setPhoto(photo.uri)
    console.log(photo.uri)
  }

  const sendPhoto = () => {
    console.log(navigation)
    navigation.navigate('Posts', {photo})
  }
  
    return <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.previewPhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: 200, width: 200 }}
              />
            </View>
        )}
      
        <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
            <Text style={styles.snap} >SNAP</Text>
        </TouchableOpacity>
        </Camera>
        <TouchableOpacity style={styles.sendBth} onPress={sendPhoto}>
            <Text style={styles.textBth} >Send</Text>
        </TouchableOpacity>
        </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        height: '70%',
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
        width: 90,
        height:60,
        marginBottom: 20,
        borderRadius: 15,
      },
      previewPhotoContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        borderColor: '#fff',
        borderWidth: 2,
        marginTop: 32,
        marginHorizontal: 16,
      },
      sendBth: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: '#20ba2aa',
        height:40,
        marginHorizontal: 30,
        marginTop: 20,
        borderRadius: 10,
      },
      textBth: {
        color: '#0000cd',
        fontSize: 24,
      },
})