import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import CommentModal from "../CommentModal";

import heart from "../../public/heart.png";
import chat from "../../public/chat.png";
import send from "../../public/send.png";
import save from "../../public/save.png";
import { useContext, useEffect, useState } from "react";
import { getData } from "../../utils/asyncstorage";
import axios from "axios";
import { ModalContext } from "../modal-context";

const PostInteract = ({ id, comment, isModalVisible }) => {
    // const [cmts, setCmts] = useState([]);

    const modalContext = useContext(ModalContext);

    // useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log(id);
                const token = await getData("token");
                const response = await axios.get(
                    process.env.EXPO_PUBLIC_LOCAL_API_URL + `/comments/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                // console.log(response);
                if (response.data.success) {
                    const newCmts = response.data.comments;
                    // setCmts(newCmts);
                    modalContext.handleSetComments(newCmts);
                    // console.log(response.data.comments);
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error("Load comment thất bại", error);
                // alert(error.response.data.message)
            } finally {
            }
        };
    //     if (isModalVisible) {
    //         fetchData();
    //     }
    // }, [isModalVisible]);

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
                <TouchableOpacity
                    onPress={async() => {
                        // comment();
                        modalContext.handleToggle();
                        await fetchData();
                    }}
                >
                    <Image source={chat} style={styles.interact_icon} />
                    <CommentModal
                        // id={id}
                        // isModalVisible={isModalVisible}
                        // pressed={comment}
                        // cmts={cmts}
                    />
                    {/* {console.log(1)} */}
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
