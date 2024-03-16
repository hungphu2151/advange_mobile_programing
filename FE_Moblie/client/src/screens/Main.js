import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "./Home";
import { Search } from "./Search";
import { Create } from "./Create";
import { Friend_request } from "./Friend_request";
import { Profile } from "./Profile";
import { UserProfile } from "./UserProfile";

const Tab = createBottomTabNavigator();

export function Main() {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarLabel: ({ focused }) => {
            return null;
          },

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Create") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Friend") {
              iconName = focused ? "person-add" : "person-add-outline";
            } else if (route.name === "UserProfile") {
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
        <Tab.Screen name="UserProfile" component={UserProfile} />
      </Tab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
