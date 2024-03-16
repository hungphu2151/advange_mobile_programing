import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import COLORS from "~/utils/color";

const CardImage = () => {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.icon}>
        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CardImage;

const styles = StyleSheet.create({
  wrap: {
    width: 123,
    height: 110,
    backgroundColor: COLORS.gray,
    position: "relative",
  },

  icon: {
    position: "absolute",
    top: 8,
    right: 0,
  },
});
