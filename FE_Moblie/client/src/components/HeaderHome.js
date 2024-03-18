import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const HeaderHome = ({ name, isBack = false, isShowGoBackHome = false }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapHeader}>
      <TouchableOpacity activeOpacity={0.75} style={styles.back}>
        <FontAwesome name="bars" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },
  back: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  wrapHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "white",
    justifyContent: "flex-end",
    width: "100%",
    padding: 14,
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
    flex: 1,
    flexWrap: "wrap",
    // maxWidth: 230,
    textAlign: "center",
  },
});
