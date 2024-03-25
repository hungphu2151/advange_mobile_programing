import { useState } from "react";
import axios from "axios";

import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { useRoute } from '@react-navigation/native';

import Button from "../components/Button.js";
import CreateAlert from "../components/CreateAlert.js";
import logoUte from "../public/logo_ute.jpg";

export function Reset_password({ navigation }) {
  const [pw, onChangePassword] = useState("");
  const [confirm, onChangeConfirm] = useState("");
    const route = useRoute();
    const { token } = route.params;

  async function handleResetPassword() {
    try {
    //   console.log(token);
      //   CreateAlert("OTP đã được gửi qua confirm của bạn.")
      const res = await axios.post(
        process.env.EXPO_PUBLIC_LOCAL_API_URL + `/auth/reset-password/${token}`,
        {
          new_password: pw,
          confirm: confirm,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        CreateAlert("Đặt lại mật khẩu", "Mật khẩu của bạn đã được đặt lại.");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error.response);
      CreateAlert("Lỗi !", error.response.data.message);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={logoUte} style={styles.logo_ute} />
      <Button
        style={styles.btn_login}
        pressed={() => {
          navigation.navigate("Forgot_password");
        }}
      >
        Đăng nhập
      </Button>
      <Text style={styles.text}>----- Hoặc -----</Text>
      <Text style={styles.text}>Đặt lại mật khẩu!</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={pw}
        placeholder="Nhập mật khẩu (*)"
        secureTextEntry={true}
        placeholderTextColor="rgba(0, 0, 0, 0.2)"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeConfirm}
        value={confirm}
        placeholder="Nhập lại mật khẩu (*)"
        secureTextEntry={true}
        placeholderTextColor="rgba(0, 0, 0, 0.2)"
      />
      <Button
        style={styles.btn_otp}
        pressed={handleResetPassword}
        disabled={!(pw && confirm)}
      >
        Đặt lại mật khẩu
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
  logo_ute: {
    height: 125,
    width: 125,
    marginBottom: 25,
  },
  input: {
    width: 343,
    height: 44,
    margin: 10,
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "#FAFAFA",
  },
  input_otp: {
    width: 200,
    height: 44,
    marginVertical: 15,
    marginHorizontal: 8,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "#FAFAFA",
  },
  color_blue: {
    color: "#3797EF",
  },
  left: {
    width: 343,
    alignItems: "flex-end",
    marginBottom: 15,
  },
  btn_login: {
    width: 307,
    marginBottom: 15,
  },
  btn_otp: {
    width: 343,
    marginTop: 10,
  },
  text: {
    marginBottom: 15,
  },
  otp: {
    flexDirection: "row",
  },
});
