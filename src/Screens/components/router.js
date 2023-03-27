import React from "react";


import { createStackNavigator } from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"

import { Feather } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import Home from '../mainScreen/Home';
import CreatePostsScreen from "../mainScreen/CreatePostsScreen"
import PostsScreen from '../mainScreen/PostsScreen';
import ProfileScreen from '../mainScreen/ProfileScreen';

import Registration from "../auth/RegistrationScreen";
import Login from "../auth/LoginScreen";


 const useRoute = (isAuth) => {
    if (!isAuth) {
      return <MainStack.Navigator initialRouteName="Registration" >
        <MainStack.Screen name="Registration" component={Registration} options={{headerShown: false}}/>
        <MainStack.Screen name="Login" component={Login} options={{headerShown: false}} />
      </MainStack.Navigator>
    }
    return <MainTab.Navigator screenOptions={{
      tabBarShowLabel: false,
      tabBarShowIcon: true,
      tabBarItemStyle: {
        borderTopColor: "#E5E5E5",
        borderTopWidth: 1,
      },
    }}>
    <MainTab.Screen options={{
      tabBarIcon: ({focused, size,color}) => {
        return (
          <Feather 
          name="list" 
          size={24} 
          color="black" 
          />
        );
      }
    }} name="Create" component={CreatePostsScreen} />
    <MainTab.Screen options={{
      tabBarIcon: ({focused, size,color}) => {
        return (
          <AntDesign 
          name="plus" 
          size={24} 
          color="black" 
          />
        );
      }
    }} name="Posts" component={PostsScreen} />
    <MainTab.Screen options={{
      tabBarIcon: ({focused, size,color}) => {
        return (
          <Feather
            name="user"
            size={24}
            color={focused ? "#FF6C00" : color}
          />
        );
      }
    }} name="Profile" component={ProfileScreen} />
  </MainTab.Navigator>
  }

  export default useRoute