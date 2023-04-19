import React,{useState, useEffect} from "react";
import {View, Text, StyleSheet, FlatList, Image} from "react-native"

export default function PostsScreen({route}) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if(route.params) {
            setPosts(prevState => [...prevState, route.params])
        }
        
    },[route.params])

    console.log('posts', posts)

    return <View style={styles.container}>
        <FlatList data={posts} keyExtractor={(item, index) => index.toString()} renderItem={({item}) => (
        <Image source={{uri: item.photo}} style={styles.post}/>)}/>
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
})