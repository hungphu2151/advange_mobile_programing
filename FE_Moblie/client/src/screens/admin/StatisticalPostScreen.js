import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import CardImage from "../../components/CardImage";
import useAppBar from "../../hooks/useAppBar";
import COLORS from "../../utils/color";

export function StatisticalPostScreen() {
  useAppBar({ title: "Thống kê" });

  return (
    <View style={styles.container}>
      <View style={styles.wrapHeader}>
        <Image style={styles.icon} source={require("../../assets/icons/cate.svg")} />
        <Text style={{ fontWeight: "bold" }}>Bài viết trong ngày</Text>
        <Image style={styles.icon} source={require("../../assets/icons/drop.svg")} />
      </View>

      <View style={styles.wrap}>
        {[...Array(12)].map((_, i) => (
          <CardImage key={i} />
        ))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 5,
  },

  wrap: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },

  placeholderStyle: {
    color: COLORS.grayLight,
  },

  inputSearch: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: "#00000033",
    backgroundColor: "#FAFAFA",
    marginBottom: 18,
  },

  selectedTextStyle: {
    textAlign: "center",
  },

  icon: {
    width: 18,
    height: 18,
  },

  wrapHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    backgroundColor: COLORS.gray,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
});
