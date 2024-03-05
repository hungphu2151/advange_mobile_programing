import { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

import Button from "../components/Button.js";
import CreateAlert from "../components/CreateAlert.js";
import logoUte from "../public/logo_ute.jpg";

export function Signup({ navigation }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    pass_word: "",
    phone_number: "",
    id: "",
    department: "",
    gmail: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  async function handleSignup() {
    try {
      console.log(formData);
      const res = await axios.post("http://10.0.2.2:3000/auth/register", {
        first_name: formData.first_name,
        last_name: formData.last_name,
        pass_word: formData.pass_word,
        phone_number: formData.phone_number,
        id: formData.id,
        department: formData.department,
        gmail: formData.gmail,
      });
      console.log(res.data);
      createTwoButtonAlert();
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.code == 1000) {
        CreateAlert("Lỗi !", "Mã số sinh viên đã được đăng ký.");
      }
      //   throw error.response.data
    }
  }

  return (
    <View style={styles.container}>
      <Image source={logoUte} style={styles.logo_ute} />
      {/* <Text style={styles.text}>
        Đăng ký để xem ảnh và{"\n"}video từ bạn bè của bạn
      </Text> */}
      <Button
        style={styles.btn_login}
        pressed={() => {
          navigation.navigate("Login");
        }}
      >
        Đăng nhập
      </Button>
      <Text style={styles.text}>----- Hoặc -----</Text>
      <Text style={styles.text}>
        Đăng ký để xem ảnh và{"\n"}video từ bạn bè của bạn
      </Text>
      <View style={styles.view_name}>
        <TextInput
          style={styles.input_name}
          onChangeText={(text) => handleChange("first_name", text)}
          value={formData.first_name}
          placeholder="Họ (*)"
          placeholderTextColor="rgba(0, 0, 0, 0.2)"
        />
        <TextInput
          style={styles.input_name}
          onChangeText={(text) => handleChange("last_name", text)}
          value={formData.last_name}
          placeholder="Tên (*)"
          placeholderTextColor="rgba(0, 0, 0, 0.2)"
        />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange("gmail", text)}
        value={formData.gmail}
        placeholder="Gmail (*)"
        placeholderTextColor="rgba(0, 0, 0, 0.2)"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange("phone_number", text)}
        value={formData.phone_number}
        placeholder="Số điện thoại (*)"
        placeholderTextColor="rgba(0, 0, 0, 0.2)"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange("pass_word", text)}
        value={formData.pass_word}
        secureTextEntry={true}
        placeholder="Mật khẩu (*)"
        placeholderTextColor="rgba(0, 0, 0, 0.2)"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange("id", text)}
        value={formData.id}
        placeholder="MSSV (*)"
        placeholderTextColor="rgba(0, 0, 0, 0.2)"
      />
      <View style={[styles.picker]}>
        <Picker
          selectedValue={formData.department}
          onValueChange={(itemValue, itemIndex) =>
            setFormData({ ...formData, department: itemValue })
          }
        >
          <Picker.Item
            label="Chọn khoa/phòng ban(*)"
            value=""
            style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.2)" }}
          />
          <Picker.Item
            label="Khoa công nghệ thông tin"
            value="Khoa công nghệ thông tin"
            style={{ fontSize: 14 }}
          />
          <Picker.Item
            label="Khoa điện - điện tử"
            value="Khoa điện - điện tử"
            style={{ fontSize: 14 }}
          />
          <Picker.Item
            label="Khoa điện tử viễn thông"
            value="Khoa điện tử viễn thông"
            style={{ fontSize: 14 }}
          />
          <Picker.Item
            label="Khoa xây dựng"
            value="Khoa xây dựng"
            style={{ fontSize: 14 }}
          />
          <Picker.Item
            label="Khoa kinh tế"
            value="Khoa kinh tế"
            style={{ fontSize: 14 }}
          />
        </Picker>
      </View>

      <Button
        style={styles.btn_Signup}
        pressed={handleSignup}
        disabled={
          !(
            formData.first_name &&
            formData.last_name &&
            formData.gmail &&
            formData.phone_number &&
            formData.pass_word &&
            formData.id &&
            formData.department
          )
        }
      >
        Đăng ký
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
    width: 359,
    height: 44,
    margin: 10,
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
  },
  input_name: {
    width: 170,
    height: 44,
    margin: 10,
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "#FAFAFA",
  },
  view_name: {
    flexDirection: "row",
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
  text: {
    marginBottom: 15,
  },
  btn_Signup: {
    width: 238,
    marginTop: 15,
  },
  picker: {
    width: 359,
    height: 44,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
  },
});
