import React,{useState, useEffect} from "react";
import { useSelector } from "react-redux";
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button} from "react-native"
import app from "../../firebase/config";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore(app);

    const DefaultPostsScreen = ({route, navigation}) => {
    const [posts, setPosts] = useState([])

    const { userId } = useSelector((state) => state.auth);

    const getAllPost = async () => {
        const userPostsRef = collection(db, "posts");
        const unsubscribe = await onSnapshot(userPostsRef, (data) => {
            const userPosts = data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setPosts(userPosts);
          });
        return () => unsubscribe();
      };
      
    useEffect(() => {
       
        getAllPost()
    },[])

    // console.log('posts', posts)

    return <View>
        <View style={styles.container}>
            <FlatList data={posts} keyExtractor={(item, index) => index.toString()} 
            renderItem={({item}) => (
                <View>
                    <Image source={{uri: item.photo}} style={styles.post}/>
                    <View>
                        <View>
                           <Text>{item.comment}</Text> 
                        </View>
        <TouchableOpacity onPress={() => navigation.navigate("MapScreen", {location: item.location})}>
            <Text style={styles.aside}>MapScreen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CommentsScreen", {postId: item.id})}>
            <Text style={styles.aside}>CommentsScreen</Text>
        </TouchableOpacity>
        </View>
                </View>
            
            )}/>
            
        </View>
        {/* <Button title='go to map'/> */}
       
    </View>
    
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    post: {
        height: 240,
        width: "100%",
        borderRadius: 8,
        marginBottom: 5,
      },
})

export default DefaultPostsScreen