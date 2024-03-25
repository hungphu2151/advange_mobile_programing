import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../utils/color";

const CardProfile = ({ isAvatar = false, name = "" }) => {
  return (
    <View style={styles.wrap}>
      {isAvatar ? (
        <Image
          source={require("../assets/images/avatar.jpg")}
          style={{ width: 30, height: 30, borderRadius: 15 }}
        />
      ) : (
        <Image
          source={require("../assets/icons/user-profile.svg")}
          style={{ width: 30, height: 30 }}
        />
      )}

      <Text style={styles.text}>{name}</Text>

      <TouchableOpacity>
        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CardProfile;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.blueLight,
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginVertical: 14,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
