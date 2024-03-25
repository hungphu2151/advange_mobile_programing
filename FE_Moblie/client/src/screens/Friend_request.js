import { useState, useRef } from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Animated,
    Image,
    FlatList,
    Dimensions,
    Button,
    TouchableOpacity,
} from "react-native";
import VideoPlayer from "expo-video-player";
import { ResizeMode } from "expo-av";
import { Video } from "expo-av";
import Modal from "react-native-modal";

import logoCntt from "../public/logocntt.png";
import noti from "../public/notification.png";
import mess from "../public/mess.png";
import avatar from "../public/avatar.jpg";
import more from "../public/more.png";
import pokemon1 from "../public/pokemon1.jpg";
import heart from "../public/heart.png";
import chat from "../public/chat.png";
import send from "../public/send.png";
import save from "../public/save.png";

const { width } = Dimensions.get("window");
const flatListHeight = width * 1.3375;

const DynamicHeader = ({ value }: any) => {
    return (
        <Animated.View>
            <View style={styles.head}>
                <Image source={logoCntt} style={styles.logo_fit} />
                <View style={styles.head_right}>
                    <Image source={noti} style={styles.noti} />
                    <Image source={mess} style={styles.mess} />
                </View>
            </View>
        </Animated.View>
    );
};

export function Friend_request() {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={{ flex: 1 }}>
            <Button title="Show modal" onPress={toggleModal} />
            <Modal
                isVisible={isModalVisible}
                style={{ margin: 0 }}
                onBackdropPress={toggleModal}
                // swipeDirection={["down"]}
                // onSwipeComplete={toggleModal}
            >
                <ScrollView >
                    <View style={styles.modal}>
                        <View style={styles.head} />
                        <Button title="Toggle Modal" onPress={toggleModal} />
                        <Text style={{ fontWeight: "bold" }}>Bình luận</Text>
                        <View style={styles.hr} />
                        {/* Đây là phần nội dung có thể cuộn */}
                        {[...Array(10)].map((_, index) => (
                            <View style={styles.comment} key={index}>
                                <View style={styles.leftContent}>
                                    <Image
                                        source={avatar}
                                        style={styles.avatar}
                                    />
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
                                            Nội dung bình luận Nội dung bình
                                            luận Nội dung bình luận Nội dung
                                            bình luận Nội dung bình luận Nội
                                            dung bình luận Nội dung bình luận
                                            Nội dung bình luận Nội dung bình
                                            luận Nội dung bình luận Nội dung bình luận Nội dung bình luận
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                marginBottom: 5,
                                                color: "#737373",
                                                // backgroundColor:'gray'
                                            }}
                                        >
                                            Trả lời
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: "#737373",
                                            }}
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
                        ))}
                        {/* Phần nội dung có thể cuộn kết thúc */}
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "flex-start",
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
