import { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    Animated,
} from "react-native";

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
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

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

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
            // console.log(value)
            return value;
        }
    } catch (e) {
        // error reading value
    }
};

export function Home() {
    const [posts, setPosts] = useState([]);
    const scrollOffsetY = useRef(new Animated.Value(0)).current;

    // console.log(token)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getData();
                console.log(token);
                const response = await axios.get(
                    "http://10.0.2.2:3000/posts/?size=5&page=2",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.data.success) {
                    console.log(response.data);
                    setPosts(response.data.posts);
                }
                // else{
                //     alert(response.data.message)
                // }
            } catch (error) {
                console.error("Error fetching blog data:", error.response.data);
                // alert(error.response.data.message)
            }
        };

        fetchData();
    }, []);

    // console.log("__");
    // console.log(posts[0].user_id.first_name);

    return (
        <SafeAreaView style={styles.container}>
            <DynamicHeader value={scrollOffsetY} />
            <ScrollView
                scrollEventThrottle={5}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                    {
                        useNativeDriver: false,
                    }
                )}
            >
                {/* <View style={styles.head}>
          <Image source={logoCntt} style={styles.logo_fit} />
          <View style={styles.head_right}>
            <Image source={noti} style={styles.noti} />
            <Image source={mess} style={styles.mess} />
          </View>
        </View> */}
                <View style={styles.body}>
                    {posts.map((post) => {
                        console.log(post.post_img[0].url)
                        return <View key={post._id} style={styles.item}>
                        {/* <Text>{post.user_id.first_name} {post.user_id.last_name}</Text> */}
                        <View style={styles.post}>
                            <View style={styles.post_head}>
                                <View style={styles.post_head_left}>
                                    <Image
                                        // source={avatar}
                                        source={{ uri: post.user_id.avatar.url }}
                                        style={styles.avatar}
                                    />
                                    <Text
                                        style={[
                                            styles.font_16,
                                            styles.bold,
                                        ]}
                                    >
                                        {/* Nguyễn Văn A */}
                                        {post.user_id.first_name} {post.user_id.last_name}
                                    </Text>
                                </View>
                                <Image source={more} style={styles.more} />
                            </View>
                            <Image
                                // source={pokemon1}
                                source={{ uri: post.post_img[0].url }}
                                style={styles.post_img}
                            />
                            <View style={styles.interact}>
                                <View style={styles.interact_left}>
                                    <Image
                                        source={heart}
                                        style={styles.interact_icon}
                                    />
                                    <Image
                                        source={chat}
                                        style={styles.interact_icon}
                                    />
                                    <Image
                                        source={send}
                                        style={styles.interact_icon}
                                    />
                                </View>
                                <Image
                                    source={save}
                                    style={styles.interact_icon}
                                />
                            </View>
                            <View style={styles.info}>
                                <Text style={[styles.font_16, styles.bold]}>
                                    263.526 lượt thích
                                </Text>
                                <Text
                                    style={[
                                        styles.font_16,
                                        styles.infoText,
                                        { marginRight: 10 },
                                    ]}
                                >
                                    <Text style={styles.bold}>
                                        {/* Nguyễn Văn A{" "} */}
                                        {post.user_id.first_name} {post.user_id.last_name}{" "}
                                    </Text>
                                    <Text>{post.post_description}</Text>
                                </Text>
                                <Text
                                    style={[
                                        styles.font_16,
                                        styles.infoText,
                                    ]}
                                >
                                    Xem tất cả 837 lượt bình luận
                                </Text>
                                <Text
                                    style={[
                                        styles.font_16,
                                        styles.infoText,
                                    ]}
                                >
                                    6 tháng 1
                                </Text>
                            </View>
                        </View>
                    </View>
                    })}

                    {/* <View style={styles.post}>
            <View style={styles.post_head}>
              <View style={styles.post_head_left}>
                <Image source={avatar} style={styles.avatar} />
                <Text style={[styles.font_16, styles.bold]}>Nguyễn Văn A</Text>
              </View>
              <Image source={more} style={styles.more} />
            </View>
            <Image source={pokemon1} style={styles.post_img} />
            <View style={styles.interact}>
              <View style={styles.interact_left}>
                <Image source={heart} style={styles.interact_icon} />
                <Image source={chat} style={styles.interact_icon} />
                <Image source={send} style={styles.interact_icon} />
              </View>
              <Image source={save} style={styles.interact_icon} />
            </View>
            <View style={styles.info}>
              <Text style={[styles.font_16, styles.bold]}>
                263.526 lượt thích
              </Text>
              <Text
                style={[styles.font_16, styles.infoText, { marginRight: 10 }]}
              >
                <Text style={styles.bold}>Nguyễn Văn A </Text>
                <Text>Phim mới</Text>
              </Text>
              <Text style={[styles.font_16, styles.infoText]}>
                Xem tất cả 837 lượt bình luận
              </Text>
              <Text style={[styles.font_16, styles.infoText]}>6 tháng 1</Text>
            </View>
          </View> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 35,
    },
    headerContainer: {
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    head: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        backgroundColor: "#fff",
    },
    head_right: {
        flexDirection: "row",
        marginRight: 10,
        alignItems: "center",
    },
    logo_fit: {
        height: 40,
        width: 49,
    },
    noti: {
        height: 28,
        width: 28,
    },
    mess: {
        marginLeft: 10,
        height: 28,
        width: 28,
    },
    avatar: {
        marginRight: 10,
        height: 32,
        width: 32,
        borderRadius: 16,
    },
    font_16: {
        fontSize: 16,
    },
    bold: {
        fontWeight: "bold",
    },
    more: {
        height: 20,
        width: 20,
    },
    post_head: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    post_head_left: {
        flexDirection: "row",
        alignItems: "center",
    },
    post_img: {
        marginTop: 10,
        height: 535,
        width: 400,
        alignSelf: "center",
    },
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
    info: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
    },
    infoText: {
        marginTop: 5,
    },
});
