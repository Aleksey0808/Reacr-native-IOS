import {View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Image, 
  Button, 
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native"
import React, {useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import app from "../../firebase/config";

const db = getFirestore(app);

  const CommentsScreen = ({ route }) => {
    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState([]);
    const [commentsCount, setCommentsCount] = useState(0);

    const {name} = useSelector((state) => state.auth);

    const {postId} = route.params;
      
    useEffect(() => {
      getAllPost()
    },[])

    const createpost = async () => {
      if (!comment.trim()) {
        Alert.alert("Comment cannot be empty");
        return;
      }
      const docRef = await doc(db, "posts", postId);
  
      await addDoc(collection(docRef, "comments"), {
        comment,
        name,
      });
  
      setComment("");
    }

    const getAllPost = async () => {
      const docRef = await doc(db, "posts", postId);

      onSnapshot(collection(docRef, "comments"), (data) =>
        setAllComments(
          data.docs.map((doc) => ({
            ...doc.data(),
            postId: doc.id,
          }))
        )
      );
      setCommentsCount(Number(allComments.length));
    }
  
    return (
      <View style={styles.container}>
         <SafeAreaView style={styles.container}>
      <FlatList
        data={allComments}
        renderItem={({item}) => <View>
          <Text>{item.name}</Text>
          <Text>{item.comment}</Text>
          </View>}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
         <View style={styles.inputContainer}>
          <TextInput style={styles.inputText} onChangeText={setComment}/>
        </View>
        <TouchableOpacity style={styles.sendBth} onPress={createpost}>
            <Text style={styles.textBth} >Add Post</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "flex-end",
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
        marginBottom: 30,
      },
      textBth: {
        color: '#0000cd',
        fontSize: 24,
      },
      inputContainer: {
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 20,
      },
      inputText: {
        borderWidth: 2,
        borderColor: '#20ba2aa',
        height: 50,
      }
})
  
  export default CommentsScreen;
  
  
  