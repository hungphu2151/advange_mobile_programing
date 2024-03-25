import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Image } from "expo-image";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: "fade",
        statusBarHidden: false,
        statusBarTranslucent: false,
        statusBarAnimation: "none",
        statusBarStyle: "dark",
        statusBarColor: "transparent",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={require("../assets/icons/home.svg")} style={{ width: 30, height: 30 }} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("../assets/icons/search.svg")}
              style={{ width: 30, height: 30 }}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image source={require("../assets/icons/add.svg")} style={{ width: 30, height: 30 }} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="AddUser"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("../assets/icons/add-user.svg")}
              style={{ width: 30, height: 30 }}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require("../assets/icons/user-sm.svg")}
              style={{ width: 30, height: 30 }}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({});
