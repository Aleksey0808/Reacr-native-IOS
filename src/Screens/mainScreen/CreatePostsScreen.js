import React, {useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {View, Text, TextInput, StyleSheet, Image, Button} from "react-native"
import * as Location from 'expo-location';
import { Camera, CameraType } from 'expo-camera';
import { TouchableOpacity } from "react-native-gesture-handler";
import { nanoid } from 'nanoid'
import { getFirestore, collection, addDoc } from "firebase/firestore";

import db from "../../firebase/config";
import app from "../../firebase/config";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";

const storage = getStorage(db);
const getPost = getFirestore(app);

export default function CreatePostsScreen({navigation}) {
  const [camera, setCamera] = useState(null)
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo, setPhoto] = useState(null)
  const [comment, setComment] = useState('')
  const [location, setLocation] = useState(null)

  const { userId, name } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!permission) {

    return <View />;
  }
  if (!permission.granted) {
    
    return (
      <View style={styles.containerPermission}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }


  const takePhoto = async () => {
    const photo = await camera.takePictureAsync()
    let location = await Location.getCurrentPositionAsync({});
    setPhoto(photo.uri)

    console.log('comment',comment)
    console.log('latitude',location.coords.latitude)
    console.log('longitude',location.coords.longitude)
  }

  const sendPhoto = () => {
    uploadPostToServer()
    // uploadPhotoToServer()
    navigation.navigate('DefaultScreen', {photo})
  }

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      await addDoc(collection(getPost, "posts"), {
        photo,
        comment,
        location,
        name, 
        userId,
      });
    } catch (error) {
      console.log(error.massage);
    }
  }

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);

    const file = await response.blob();

    const uniquePostId = nanoid().toString();

    // const data = await storage.ref(`postImage/${uniquePostId}`).put(file);
    const storageRef = ref(storage, `postImage/${uniquePostId}`)

    const data = await uploadBytes(storageRef, file);
    const getStorageRef = await getDownloadURL(storageRef);
    
   return getStorageRef;
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
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputText} onChangeText={setComment}/>
        </View>
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
      containerPermission: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center"
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
      inputContainer: {
        marginTop: 10,
        marginHorizontal: 10,
      },
      inputText: {
        borderWidth: 2,
        borderColor: '#20ba2aa',
        height: 50,
      }
})