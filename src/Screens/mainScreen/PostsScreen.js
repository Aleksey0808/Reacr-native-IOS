import React,{useState, useEffect} from "react";
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from "react-native"
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../nestedScreens/DefaultPostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
    return (
      <NestedScreen.Navigator>
        <NestedScreen.Screen name="DefaultScreen" component={DefaultPostsScreen}/>
        <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen}/>
        <NestedScreen.Screen name="MapScreen" component={MapScreen}/>
    </NestedScreen.Navigator>  
    )
}

export default PostsScreen