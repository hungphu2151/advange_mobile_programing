import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Button from "../components/Button.js";

import menu from "../public/menu.png";

export function Profile() {
  return (
    <View style={styles.container}>
      <Text>Profile!</Text>
      <Button
        style={styles.btn_logout}
        onPress={() => {
            navigation.navigate("Login");
          }}
      >
        Đăng xuất
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  btn_logout: {
    width: 343,
    marginBottom: 15,
    backgroundColor: "red"},
  menu: {
    height: 44,
    width: 44,
  },
});
