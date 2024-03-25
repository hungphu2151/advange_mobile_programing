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
import MyIcon from "../components/my-icon";

const Tab = createBottomTabNavigator();

export function Main() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarLabel: ({ focused }) => {
                    return null;
                },
                // animation: "fade",
                // statusBarHidden: false,
                // statusBarTranslucent: false,
                // statusBarAnimation: "none",
                // statusBarStyle: "dark",
                // statusBarColor: "transparent",

                //   tabBarIcon: ({ focused, color, size }) => {
                //     let iconName;

                //     if (route.name === "Home") {
                //       iconName = focused ? "home" : "home-outline";
                //     } else if (route.name === "Search") {
                //       iconName = focused ? "search" : "search-outline";
                //     } else if (route.name === "Create") {
                //       iconName = focused ? "add-circle" : "add-circle-outline";
                //     } else if (route.name === "Friend") {
                //       iconName = focused ? "person-add" : "person-add-outline";
                //     } else if (route.name === "UserProfile") {
                //       iconName = focused ? "person-circle" : "person-circle-outline";
                //     }

                //     return <Ionicons name={iconName} size={size} color={color} />;
                //   },
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return focused ? (
                            <MyIcon
                                name="home"
                                iconPackage="Foundation"
                                size={28}
                                // color="#fff"
                            />
                        ) : (
                            <MyIcon
                                name="home"
                                iconPackage="Octicons"
                                size={22}
                                // color="#fff"
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return focused ? (
                            <MyIcon
                                name="search"
                                iconPackage="Ionicons"
                                size={24}
                                // color="#fff"
                            />
                        ) : (
                            <MyIcon
                                name="search-outline"
                                iconPackage="Ionicons"
                                size={24}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Create"
                component={Create}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return focused ? (
                            <MyIcon
                                name="pluscircle"
                                iconPackage="AntDesign"
                                size={24}
                                // color="#fff"
                            />
                        ) : (
                            <MyIcon
                                name="pluscircleo"
                                iconPackage="AntDesign"
                                size={24}
                                // color="#fff"
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Friend"
                component={Friend_request}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return focused ? (
                            <MyIcon
                                name="person-add"
                                iconPackage="Ionicons"
                                size={24}
                            />
                        ) : (
                            <MyIcon
                                name="person-add-outline"
                                iconPackage="Ionicons"
                                size={24}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen name="UserProfile" component={UserProfile} />
        </Tab.Navigator>
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
