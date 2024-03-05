import {  StyleSheet, } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useEffect, useState } from "react";
import { Forgot_password } from "./pages/Forgot_password";
import { Reset_password } from "./pages/Reset_password";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Main } from "./pages/Main";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppIsReady(true);
    }, 2000);
  }, []);

  return (
    // <View style={styles.container}>
    //   {/* {appIsReady ? <Login /> : <Splash />} */}
    //   {/* <Signup /> */}
    //   <Main />
    // </View>

    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Forgot_password" component={Forgot_password} />
            <Stack.Screen name="Reset_password" component={Reset_password} />
            <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
    </NavigationContainer>
    

    // <NavigationContainer>
    //   <Tab.Navigator
    //     screenOptions={({ route }) => ({
    //       headerShown: false,
    //       tabBarLabel: ({ focused }) => {
    //         return null;
    //       },

    //       tabBarIcon: ({ focused, color, size }) => {
    //         let iconName;

    //         if (route.name === "Home") {
    //           iconName = focused ? "home" : "ios-home-outline";
    //         } else if (route.name === "Search") {
    //           iconName = focused ? "search" : "search-outline";
    //         } else if (route.name === "Create") {
    //           iconName = focused ? "add-circle" : "add-circle-outline";
    //         } else if (route.name === "Friend") {
    //           iconName = focused ? "person-add" : "person-add-outline";
    //         } else if (route.name === "Profile") {
    //           iconName = focused ? "person-circle" : "person-circle-outline";
    //         }

    //         return <Ionicons name={iconName} size={size} color={color} />;
    //       },
    //       tabBarActiveTintColor: "black",
    //       tabBarInactiveTintColor: "gray",
    //     })}
    //   >
    //     <Tab.Screen name="Home" component={Home} />
    //     <Tab.Screen name="Search" component={Search} />
    //     <Tab.Screen name="Create" component={Create} />
    //     <Tab.Screen name="Friend" component={Friend_request} />
    //     <Tab.Screen name="Profile" component={Profile} />
    //   </Tab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
