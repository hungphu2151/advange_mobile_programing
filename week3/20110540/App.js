import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Create } from "./pages/Create";
import { Friend_request } from "./pages/Friend_request";
import { Profile } from "./pages/Profile";
import { Splash } from "./pages/Splash";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarLabel: ({ focused }) => {
            return null;
          },

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "ios-home-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Create") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Friend") {
              iconName = focused ? "person-add" : "person-add-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Create" component={Create} />
        <Tab.Screen name="Friend" component={Friend_request} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
