// UserProfile.js

import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Animated,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Button from "../components/Button.js";

export function UserProfile({ navigation }) {
    const [isVisible, setIsVisible] = useState(false);
    const translateX = useRef(
        new Animated.Value(Dimensions.get("window").width)
    ).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const { height: screenHeight, width: screenWidth } =
        Dimensions.get("window");

    const handleSeparatorClick = () => {
        setIsVisible(true);
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            }),
        ]).start();
    };
    const handleClose = () => {
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: Dimensions.get("window").width,
                duration: 500,
                useNativeDriver: false,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }),
        ]).start(() => setIsVisible(false));
    };

    const [activeButton, setActiveButton] = useState("post");
    const handleActionClick = (buttonType) => {
        setActiveButton(buttonType);
    };
    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity
                onPress={handleSeparatorClick}
                style={styles.separator}
            >
                <Icon name="bars" size={32} color="black"></Icon>
            </TouchableOpacity>
            {isVisible && (
                <Animated.View
                    style={[
                        styles.overlay,
                        {
                            height: screenHeight,
                            width: screenWidth * 0.5,
                            transform: [{ translateX }],
                            right: 0,
                            opacity,
                        },
                    ]}
                >
                    <TouchableOpacity onPress={handleClose}>
                        {/* <Text>Đóng</Text> */}
                        <Button
                            style={styles.btn_logout}
                            pressed={() => {
                                console.log("pressed");
                                navigation.navigate("Login");
                            }}
                        >
                            Đăng xuất
                        </Button>
                    </TouchableOpacity>
                </Animated.View>
            )}

            <View style={styles.headerWrap}>
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: "https://i.imgur.com/uVfohZG.jpg" }}
                            style={styles.avatar}
                        />
                        <View style={styles.userDetails}>
                            <Text style={styles.username}>Nguyễn Văn A</Text>
                            <Text>
                                MSSV: <Text style={styles.mssv}>20110001</Text>
                            </Text>
                            <Text>
                                Khoa:{" "}
                                <Text style={styles.khoa}>
                                    Công nghệ thông tin
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.followContainer}>
                    <View style={styles.followRow}>
                        <View style={styles.numberContainer}>
                            <Text
                                style={
                                    (styles.boldText,
                                    { width: "40%", fontWeight: 700 })
                                }
                            >
                                6
                            </Text>
                        </View>
                        <Text style={styles.followText}>Bài viết</Text>
                    </View>
                    <View style={styles.followRow}>
                        <View style={styles.numberContainer}>
                            <Text
                                style={
                                    (styles.boldText,
                                    { width: "40%", fontWeight: 700 })
                                }
                            >
                                5
                            </Text>
                        </View>
                        <Text style={styles.followText}>Bạn bè</Text>
                    </View>
                    <View style={styles.followRow}>
                        <View style={styles.numberContainer}>
                            <Text style={styles.boldText}>100</Text>
                        </View>
                        <Text style={styles.followText}>Người theo dõi</Text>
                    </View>
                    <View style={styles.followRow}>
                        <View style={styles.numberContainer}>
                            <Text style={styles.boldText}>50</Text>
                        </View>
                        <Text style={styles.followText}>Đang theo dõi</Text>
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>
                        Chỉnh sửa trang cá nhân
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.actionButtonsRow}>
                <TouchableOpacity
                    onPress={() => handleActionClick("post")}
                    style={[
                        styles.actionButton,
                        activeButton === "post" && styles.activeButton,
                    ]}
                >
                    <Icon name="book" size={30} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleActionClick("bookmark")}
                    style={[
                        styles.actionButton,
                        activeButton === "bookmark" && styles.activeButton,
                    ]}
                >
                    <Icon name="bookmark" size={30} color="black" />
                </TouchableOpacity>
            </View>

            {activeButton === "post" && (
                
                    <View style={styles.postsContainer}>
                        <Image
                            source={{ uri: "https://i.imgur.com/uVfohZG.jpg" }}
                            style={styles.postImage}
                        />
                        <Image
                            source={{ uri: "https://i.imgur.com/uVfohZG.jpg" }}
                            style={styles.postImage}
                        />
                        <Image
                            source={{ uri: "https://i.imgur.com/uVfohZG.jpg" }}
                            style={styles.postImage}
                        />
                        <Image
                            source={{ uri: "https://i.imgur.com/uVfohZG.jpg" }}
                            style={styles.postImage}
                        />
                        <Image
                            source={{ uri: "https://i.imgur.com/uVfohZG.jpg" }}
                            style={styles.postImage}
                        />
                        <Image
                            source={{ uri: "https://i.imgur.com/uVfohZG.jpg" }}
                            style={styles.postImage}
                        />
                    </View>
            )}

            {activeButton === "bookmark" && (
                <View style={styles.postsContainer}>
                    <Image
                        source={{ uri: "https://i.imgur.com/uVfohZG.jpg" }}
                        style={styles.postImage}
                    />
                    <Image
                        source={{ uri: "https://i.imgur.com/uVfohZG.jpg" }}
                        style={styles.postImage}
                    />
                    <Image
                        source={{ uri: "https://i.imgur.com/uVfohZG.jpg" }}
                        style={styles.postImage}
                    />
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: "100%",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20,
        marginTop: 50,
    },
    avatarContainer: {
        marginTop:20,
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // elevation: 3,
        // backgroundColor:"red",
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    userDetails: {
        marginTop: 10,
    },
    username: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom:16,
    },
    mssv: {
        fontSize: 15,
        marginTop: 5,
    },
    khoa: {
        fontSize: 15,
        marginTop: 5,
    },
    followContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginTop: 10,
        width: "60%",
    },
    followRow: {
        width: "50%",
        marginBottom: 10,
    },
    followText: {
        marginRight: 20,
        flexWrap: "nowrap",
        color: "black",
    },
    boldText: {
        fontWeight: "bold",
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom:10,
    },
    editButton: {
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        alignSelf: "flex-start",
    },
    editButtonText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        opacity: 0.7,
    },
    postsContainer: {
        marginTop: 30,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    postImage: {
        width: "30%",
        height: 150,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    headerWrap: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    numberContainer: {
        alignItems: "center",
        width: "50%",
    },
    separator: {
        flexDirection: "row",
        justifyContent: "flex-end",
        height: 50,
        backgroundColor: "#fff",
        position: "absolute",
        width: "100%",
        marginTop: 45,
        right: 20,
    },
    overlay: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },
    actionButtonsRow: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    actionButton: {
        margin: 5,
    },
    activeButton: {
        borderBottomWidth: 2,
        borderBottomColor: "blue",
    },
    btn_logout: {
        width: 343,
        marginBottom: 15,
        backgroundColor: "red",
    },
    menu: {
        height: 44,
        width: 44,
    },
});
