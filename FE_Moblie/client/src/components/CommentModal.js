import { useState, useEffect  } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Button,
    ScrollView,
    BackHandler ,
} from "react-native";
import Modal from "react-native-modal";
import avatar from "../public/avatar.jpg";
import heart from "../public/heart.png";
import back from "../public/back.png";

const CommentModal = ({ isModalVisible, pressed }) => {
    return (
        <Modal
            isVisible={isModalVisible}
            style={{ margin: 0 }}
            onBackButtonPress={pressed}
        >
            <View style={styles.modal}>
                <View style={styles.head} />
                <View style={styles.title}>
                    <TouchableOpacity
                        onPress={pressed}
                        style={{flex:1}}
                    >
                        <Image
                            source={back}
                            style={[styles.iconStyle,]}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: "bold", textAlign: 'center', flex:8 }}>Bình luận</Text>
                    <View style={{flex:1}}></View>
                </View>
                <View style={styles.hr} />
                <ScrollView>
                    <View style={styles.comment}>
                        <View style={styles.leftContent}>
                            <Image source={avatar} style={styles.avatar} />
                            <View style={styles.verticalContainer}>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 14,
                                        marginBottom: 3,
                                    }}
                                >
                                    Nguyễn Văn A
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        marginBottom: 3,
                                        width: "100%",
                                    }}
                                >
                                    Nội dung bình luận Nội dung bình luận Nội
                                    dung bình luận Nội dung bình luận Nội dung
                                    bình luận Nội dung bình luận Nội dung bình
                                    luận Nội dung bình luận Nội dung bình luận
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        marginBottom: 5,
                                        color: "#737373",
                                    }}
                                >
                                    Trả lời
                                </Text>
                                <Text
                                    style={{ fontSize: 13, color: "#737373" }}
                                >
                                    - Xem 2 câu trả lời khác
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                console.log("like");
                            }}
                        >
                            <Image
                                source={heart}
                                style={[
                                    styles.iconStyle,
                                    { alignSelf: "center" },
                                ]}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default CommentModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    modal: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    head: {
        display: "flex",
        width: 40,
        height: 5,
        marginTop: 11,
        backgroundColor: "gray",
        marginBottom: 25,
        borderRadius: 10,
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
        // marginVertical: 15,
        // backgroundColor: "red",
    },
    hr: {
        width: "100%",
        height: 1,
        marginTop: 15,
        backgroundColor: "#D9D9D9",
    },
    comment: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
        marginVertical: 15,
        // backgroundColor: "red",
    },
    leftContent: {
        flexDirection: "row",
        // backgroundColor: "gray",
        width: "90%",
    },
    avatar: {
        height: 36,
        width: 36,
        borderRadius: 18,
        marginRight: 15,
    },
    verticalContainer: {
        flexDirection: "col",
        // justifyContent: "space-between",
        // alignItems: "center",
        width: "85%",
        // paddingHorizontal: 10,
        // marginVertical: 15,
        // backgroundColor: "red",
        // flexWrap: "wrap",
    },
    textStyle: {
        // Your text styles here
    },
    iconStyle: {
        height: 24,
        width: 24,
    },
});
