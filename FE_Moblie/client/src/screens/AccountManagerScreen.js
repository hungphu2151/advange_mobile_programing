import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CardProfile from "~/components/CardProfile";
import Container from "~/components/Container";
import useAppBar from "~/hooks/useAppBar";
import COLORS from "~/utils/color";

const AccountManagerScreen = () => {
  useAppBar({ title: "Quản lý tài khoản" });

  return (
    <Container>
      <CardProfile isAvatar name="Nguyễn Văn A" />

      <CardProfile isAvatar={false} name="Nguyễn Văn B" />

      <CardProfile isAvatar={false} name="Nguyễn Văn C" />

      <View style={styles.bottom}>
        <TouchableOpacity style={[styles.btn, styles.btnInfo]}>
          <Text style={styles.btnText}>Kích hoạt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnRed]}>
          <Text style={styles.btnText}>Vô hiệu hóa</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default AccountManagerScreen;

const styles = StyleSheet.create({
  bottom: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 10,
    marginTop: 12,
  },

  btn: {
    minWidth: 150,
    padding: 8,
    borderRadius: 8,
  },

  btnInfo: {
    backgroundColor: COLORS.info,
  },

  btnRed: {
    backgroundColor: COLORS.red,
  },

  btnText: {
    textAlign: "center",
    color: "white",
  },
});
