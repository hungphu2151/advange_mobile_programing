import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import BottomNav from "~/components/BottomNav";
import AccountManagerScreen from "~/screens/AccountManagerScreen";
import AdminScreen from "~/screens/AdminScreen";
import EditProfileScreen from "~/screens/EditProfileScreen";
import StatisticalPostScreen from "~/screens/StatisticalPostScreen";
import UploadManagerScreen from "~/screens/UploadManagerScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Main"
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
                <Stack.Screen name="Main" component={BottomNav} />
                <Stack.Screen name="Admin" component={AdminScreen} />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfileScreen}
                />
                <Stack.Screen
                    name="AccountManager"
                    component={AccountManagerScreen}
                />
                <Stack.Screen
                    name="UploadManager"
                    component={UploadManagerScreen}
                />
                <Stack.Screen
                    name="StatisticalPost"
                    component={StatisticalPostScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
