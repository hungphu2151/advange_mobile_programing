import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Button,
    ScrollView,
    BackHandler,
} from "react-native";
import Modal from "react-native-modal";
import { getData } from "../utils/asyncstorage";
import avatar from "../public/avatar.jpg";
import heart from "../public/heart.png";
import back from "../public/back.png";
import { ModalContext } from "./modal-context";

const test = [{ comment: "123" }, { comment: "456" }];

// const CommentModal = ({ id, isModalVisible, pressed, cmts }) => {
const CommentModal = () => {
    const modalContext = useContext(ModalContext);
    console.log(modalContext.comments);
    return (
        <Modal
            isVisible={modalContext.isVisible}
            style={{ margin: 0 }}
            onBackButtonPress={modalContext.handleToggle}
        >
            <View style={styles.modal}>
                <View style={styles.head} />
                <View style={styles.title}>
                    <TouchableOpacity
                        
                        onPress={m     [podalContext.handleToggle}
                        style={{ flex: 1 }}
                    >
                        {/* <TouchableOpacity onPress={pressed} style={{ flex: 1 }}> */}
                        <Image source={back} style={[styles.iconStyle]} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            flex: 8,
                        }}
                    >
                        Bình luận
                    </Text>
                    <View style={{ flex: 1 }}></View>
                </View>
                <View style={styles.hr} />
                <ScrollView>
                    {/* {
                    console.log(isModalVisible)p
                    } */}
                    {modalContext.comments.length > 0 ? (
                        modalContext.comments.map((cmt) => {
                            console.log(cmt.comment_content);
                            return (
                                <View key={cmt._id} style={styles.comment}>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 14,
                                            marginBottom: 3,
                                        }}
                                    >
                                        {cmt.comment_content}
                                    </Text>
                                </View>
                            );
                        })
                    ) : (
                        <Text>No comments</Text>
                    )}
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
