import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import CommentModal from "../CommentModal"

import heart from "../../public/heart.png";
import chat from "../../public/chat.png";
import send from "../../public/send.png";
import save from "../../public/save.png";

const PostInteract = ({ comment, isModalVisible }) => {
    return (
        <View style={styles.interact}>
            <View style={styles.interact_left}>
                <TouchableOpacity
                    onPress={() => {
                        console.log("like");
                    }}
                >
                    <Image source={heart} style={styles.interact_icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={comment}>
                    <Image source={chat} style={styles.interact_icon} />
                    <CommentModal
                        isModalVisible={isModalVisible}
                        pressed={comment}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        console.log("share");
                    }}
                >
                    <Image source={send} style={styles.interact_icon} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => {
                    console.log("store");
                }}
            >
                <Image source={save} style={styles.interact_icon} />
            </TouchableOpacity>
        </View>
    );
};

export default PostInteract;

const styles = StyleSheet.create({
    interact_icon: {
        marginLeft: 10,
        marginRight: 10,
        height: 24,
        width: 24,
    },
    interact: {
        flexDirection: "row",
        marginTop: 10,
    },
    interact_left: {
        flex: 1,
        flexDirection: "row",
    },
});
