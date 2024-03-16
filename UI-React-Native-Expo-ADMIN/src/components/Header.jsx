import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Header = ({ name, isBack = false, isShowGoBackHome = false }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapHeader}>
      <View style={styles.wrapHeaderLeft}>
        {isBack ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.75}
            style={styles.back}
          >
            <AntDesign name="back" size={20} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.75} style={styles.back}>
            <FontAwesome name="bars" size={20} color="black" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.textHeader}>{name}</Text>

      <View>
        <Image
          source={require("~/assets/images/logo.jpg")}
          style={styles.image}
          contentFit="cover"
        />
      </View>
    </View>
  );
};

export default Header;

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
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
    width: "100%",
    padding: 14,
    height: 80,
    marginTop: 20,
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
