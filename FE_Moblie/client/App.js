import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Forgot_password } from "./src/screens/Forgot_password";
import { Reset_password } from "./src/screens/Reset_password";
import { Login } from "./src/screens/Login";
import { Signup } from "./src/screens/Signup";
import { Main } from "./src/screens/Main";
import UserProfile from "./src/screens/UserProfile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <UserProfile />
    // </View>

    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={Login} />
            {/* <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Forgot_password" component={Forgot_password} />
            <Stack.Screen name="Reset_password" component={Reset_password} /> */}
            <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
