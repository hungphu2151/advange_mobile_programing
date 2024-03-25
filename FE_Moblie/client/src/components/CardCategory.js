import { Image } from "expo-image";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import COLORS from "../utils/color";
import { useNavigation } from "@react-navigation/native";

const CardCategory = ({ title, icon, to }) => {
  const navigation = useNavigation();

  const IconRender = useMemo(() => {
    return {
      "": <Image source={require("../assets/icons/upload.svg")} style={{ width: 50, height: 50 }} />,
      upload: (
        <Image source={require("../assets/icons/upload.svg")} style={{ width: 50, height: 50 }} />
      ),
      user: <Image source={require("../assets/icons/user.svg")} style={{ width: 50, height: 50 }} />,
      "user-contact": (
        <Image
          source={require("../assets/icons/user-contact.svg")}
          style={{ width: 50, height: 50 }}
        />
      ),
      post: <Image source={require("../assets/icons/post.svg")} style={{ width: 50, height: 50 }} />,
    }[icon];
  }, [icon]);

  return (
    <TouchableOpacity style={styles.wrap} onPress={to ? () => navigation.navigate(to) : undefined}>
      {IconRender}

      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CardCategory;

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: COLORS.blueLight,
    padding: 24,
    flexDirection: "row",
    marginVertical: 14,
    borderRadius: 40,
    alignItems: "center",
  },

  iconColor: {
    color: COLORS.blue,
    fontWeight: "bold",
  },

  text: {
    textAlign: "center",
    marginLeft: 10,
    fontWeight: "bold",
    flex: 1,
    fontSize: 16,
  },
});
