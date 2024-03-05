import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";

import Button from "../components/Button.js";
import CreateAlert from "../components/CreateAlert.js";
import logoUte from "../public/logo_ute.jpg";

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem("token", value);
    } catch (e) {
        // saving error
    }
};

export function Login({ navigation }) {
    const [phone_num, onChangePhone_num] = useState("");
    const [pw, onChangePw] = useState("");

    async function handleLogin() {
        try {
            console.log("Login");
            const res = await axios.post("http://10.0.2.2:3000/auth/login", {
                phone_number: phone_num,
                pass_word: pw,
            });
            console.log(res.data);
            if (res.data.success) {
                storeData(res.data.token)
                navigation.navigate("Main");
            }
        } catch (error) {
            console.log(error.response);
            CreateAlert("Lỗi !", error.response.data.message);
        }
    }

    return (
        <View style={styles.container}>
            <Image source={logoUte} style={styles.logo_ute} />
            <TextInput
                style={styles.input}
                onChangeText={onChangePhone_num}
                value={phone_num}
                placeholder="Tài khoản"
                placeholderTextColor="rgba(0, 0, 0, 0.2)"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePw}
                value={pw}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                placeholderTextColor="rgba(0, 0, 0, 0.2)"
            />
            <View style={[styles.left]}>
                <Text
                    style={[styles.color_blue]}
                    onPress={() => {
                        navigation.navigate("Forgot_password");
                    }}
                >
                    Quên mật khẩu?
                </Text>
            </View>
            <Button
                style={styles.btn_login}
                pressed={handleLogin}
                disabled={!(phone_num && pw)}
            >
                Đăng nhập
            </Button>
            <Text style={styles.text}>----- Hoặc -----</Text>
            <Text
                style={styles.color_blue}
                onPress={() => {
                    navigation.navigate("Signup");
                }}
            >
                Đăng ký
            </Text>
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
    color_blue: {
        color: "#3797EF",
    },
    left: {
        width: 343,
        alignItems: "flex-end",
        marginBottom: 15,
    },
    btn_login: {
        width: 343,
        marginBottom: 15,
    },
    text: {
        marginBottom: 15,
    },
});
