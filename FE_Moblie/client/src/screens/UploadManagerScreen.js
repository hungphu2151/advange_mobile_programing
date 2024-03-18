import { StyleSheet, Text, View } from "react-native";
import CardImage from "~/components/CardImage";
import useAppBar from "~/hooks/useAppBar";

const UploadManagerScreen = () => {
  useAppBar({ title: "Quản lí đăng tải" });

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        {[...Array(12)].map((_, i) => (
          <CardImage key={i} />
        ))}
      </View>
    </View>
  );
};

export default UploadManagerScreen;

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
});
