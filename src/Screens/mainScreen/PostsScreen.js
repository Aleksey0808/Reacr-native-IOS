import React,{useState, useEffect} from "react";
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from "react-native"

export default function PostsScreen({route, navigation}) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if(route.params) {
            setPosts(prevState => [...prevState, route.params])
        }
        
    },[route.params])

    console.log('posts', posts)

    return <View>
        <View style={styles.container}>
            <FlatList data={posts} keyExtractor={(item, index) => index.toString()} renderItem={({item}) => (
            <Image source={{uri: item.photo}} style={styles.post}/>
            )}/>
            
        </View>
        <View>
        <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
            <Text style={styles.aside}>MapScreen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CommentsScreen")}>
            <Text style={styles.aside}>CommentsScreen</Text>
        </TouchableOpacity>
        </View>
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