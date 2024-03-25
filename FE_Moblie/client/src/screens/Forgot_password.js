import { useState } from "react";
import axios from "axios";

import { View, Text, StyleSheet, Image, TextInput } from "react-native";

import Button from "../components/Button.js";
import CreateAlert from "../components/CreateAlert.js";
import logoUte from "../public/logo_ute.jpg";

export function Forgot_password({ navigation }) {
  const [phone_num, onChangePhone_num] = useState("");
  const [gmail, onChangeGmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleOtpChange = (text) => {
    let inputValue = text;
    setOtp(inputValue);
  };

  async function handleSendOtp() {
    try {
      console.log("Send Otp");
      //   CreateAlert("OTP đã được gửi qua gmail của bạn.")
      const res = await axios.post(
        process.env.EXPO_PUBLIC_LOCAL_API_URL +'/auth/forgot-password',
        {
          phone_number: phone_num,
          gmail: gmail,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        // CreateAlert("Gửi OTP thành công", "OTP đã được gửi qua gmail của bạn.");
        CreateAlert("Gửi OTP thành công", res.data.message);
      }
    } catch (error) {
      console.log(error.response);
      CreateAlert("Lỗi !", error.response.data.message);
    }
  }

  async function handleVerifyOtp() {
    try {
    //   CreateAlert("Xác nhận OTP thành công")
    //   navigation.navigate("Reset_password", { token: "phuhuynh" });
    //   console.log(otp);
      const res = await axios.post("http://10.0.2.2:3000/auth/verify-otp", {
        otp: otp,
        gmail: gmail,
      });
      console.log(res.data);
      if (res.data.success) {
        CreateAlert("Xác nhận OTP thành công");
        // console.log(res.data);
        navigation.navigate("Reset_password", { token: res.data.resetPasswordToken });
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
          navigation.navigate("Login");
        }}
      >
        Đăng nhập
      </Button>
      <Text style={styles.text}>----- Hoặc -----</Text>
      <Text style={styles.text}>Nhập thông tin để nhận OTP qua gmail!</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePhone_num}
        value={phone_num}
        placeholder="Số điện thoại (*)"
        placeholderTextColor="rgba(0, 0, 0, 0.2)"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeGmail}
        value={gmail}
        placeholder="Gmail (*)"
        placeholderTextColor="rgba(0, 0, 0, 0.2)"
      />
      <Button
        style={styles.btn_otp}
        pressed={handleSendOtp}
        disabled={!(phone_num && gmail)}
      >
        Gửi OTP
      </Button>
      <Text style={{ marginTop: 30 }}>Nhập OTP đầy đủ 6 số !</Text>
      <View style={styles.otp}>
        <TextInput
          style={styles.input_otp}
          maxLength={6}
          keyboardType="numeric"
          value={otp}
          onChangeText={handleOtpChange}
        ></TextInput>
      </View>
      <Button
        style={styles.btn_otp}
        pressed={handleVerifyOtp}
        disabled={otp.length !== 6}
      >
        Xác nhận
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
