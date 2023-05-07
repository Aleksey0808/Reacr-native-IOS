import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Button, FlatList, Image} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAuth} from "firebase/auth";
import {
    getFirestore,
    collection,
    onSnapshot,
    where,
    query,
  } from "firebase/firestore";
import {authSingOutUser} from '../../redux/auth/authOperations';
import app from '../../firebase/config';

const db = getFirestore(app);

export default function ProfileScreens() {
    const [userPosts, setUserPosts] = useState([]);

    const dispatch = useDispatch()
    const {userId} = useSelector((state) => state.auth)

    useEffect(() => {
        getUserPosts()
    }, [])

    const getUserPosts = async () => {
        try {
            const userPostsRef = collection(db, "posts");
            const queryRef = query(userPostsRef, where("userId", "==", userId));
            const unsubscribe = onSnapshot(queryRef, (date) => {
              const userPosts = date.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));
              setUserPosts(userPosts);
      
            //   if (userPosts && userPosts.length > 0) {
            //     userPosts.forEach((post) => {
            //       getCommentsCount(post.id.toString());
            //     });
            //   }
            });
            return () => unsubscribe();
          } catch (error) {
            console.log(error);
          }
    }    

    const signOut = () => {
        dispatch(authSingOutUser())
    }


    return <View style={styles.container}>
        
        <Button title="signOut" onPress={signOut} style={styles.btn}/>
        <View>
        <FlatList data={userPosts} keyExtractor={(item, index) => index.toString()} 
            renderItem={({item}) => (
                <View>
                    <Image source={{uri: item.photo}} style={styles.post}/>
                </View>
            
            )}/>
            </View>
        </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    post: {
        height: 240,
        width: "100%",
        borderRadius: 8,
        marginBottom: 5,
      },
      btn: {
        marginBottom: 60,
      }
})