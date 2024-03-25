import { useContext, useRef } from "react";
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
    TouchableOpacity,
    FlatList,
    StatusBar,
} from "react-native";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";

import more from "../public/more.png";
import avatar from "../public/avatar.jpg";
import pokemon1 from "../public/pokemon1.jpg";
import heart from "../public/heart.png";
import chat from "../public/chat.png";
import send from "../public/send.png";
import save from "../public/save.png";
import DynamicHeader from "../components/home/DynamicHeader";
import { getData } from "../utils/asyncstorage";
import PostInteract from "../components/home/PostInteract";
import { DataContext } from "../store/Store";

const { width } = Dimensions.get("window");
const flatListHeight = width * 1.3375;

export function Home() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const {user} = useContext(DataContext)


    useEffect(() => {
        fetchData();
        console.log(user.avatar);
    }, []);

    const fetchData = async () => {
        try {
            const token = await getData('token');
            setLoading(true);
            const response = await axios.get(
                process.env.EXPO_PUBLIC_LOCAL_API_URL + `/posts/?size=5&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.success) {
                const newPosts = response.data.posts;
                setPosts([...posts, ...newPosts]);
                // console.log(response.data.totals);
                setPage(page + 1);
                // setPosts(response.data.posts);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Load bài viết thất bại", error.response.data);
            // alert(error.response.data.message)
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } =
            event.nativeEvent;
        const paddingToBottom = 20;

        if (
            layoutMeasurement &&
            contentOffset &&
            contentSize &&
            layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom
        ) {
            if (!loading) {
                fetchData();
            }
        }
    };

    const renderMedia = ({ item }) => {
        if (item.url.endsWith(".mp4")) {
            return (
                <VideoPlayer
                    videoProps={{
                        shouldPlay: false,
                        resizeMode: ResizeMode.STRETCH,
                        source: {
                            uri: item.url,
                        },
                    }}
                    style={styles.post_img}
                />
            );
        } else {
            return <Image source={{ uri: item.url }} style={styles.post_img} />;
        }
    };

    const onScroll = (event) => {
        const { contentOffset } = event.nativeEvent;
        const viewSize = event.nativeEvent.layoutMeasurement;
        const pageNum = Math.floor(contentOffset.x / viewSize.width);
        setCurrentPage(pageNum);
    };

    return (
        <SafeAreaView style={styles.container}> 
            <StatusBar />
            <DynamicHeader />
            <ScrollView
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                onScroll={(event) => handleScroll(event)}
            >
                <View style={styles.body}>
                    {/* {posts.map((post,index) => {
                        return (
                            <View key={index} style={styles.item}>
                                <View style={styles.post}>
                                    <View style={styles.post_head}>
                                        <View style={styles.post_head_left}>
                                            <Image
                                                source={{
                                                    uri: post.user_id.avatar
                                                        .url,
                                                }}
                                                style={styles.avatar}
                                            />
                                            <Text
                                                style={[
                                                    styles.font_14,
                                                    styles.bold,
                                                ]}
                                            >
                                                {post.user_id.first_name}{" "}
                                                {post.user_id.last_name}
                                            </Text>
                                        </View>
                                        <Image
                                            source={more}
                                            style={styles.more}
                                        />
                                    </View>
                                    <View>
                                        <View style={{ height: flatListHeight, marginTop:10 }}>
                                            <FlatList
                                                data={post.post_img}
                                                horizontal={true}
                                                pagingEnabled={true}
                                                renderItem={renderMedia}
                                                keyExtractor={(item) => item.id}
                                                onScroll={onScroll}
                                                showsHorizontalScrollIndicator={
                                                    false
                                                }
                                            />
                                        </View>
                                        {post.post_img.length > 1 && (
                                            <View style={styles.pagination}>
                                                {post.post_img.map((item, index) => (
                                                    <View
                                                        key={index}
                                                        style={[
                                                            styles.paginationDot,
                                                            index ===
                                                            currentPage
                                                                ? styles.paginationDotActive
                                                                : null,
                                                        ]}
                                                    />
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                    <PostInteract/>
                                    <View style={styles.info}>
                                        <Text
                                            style={[
                                                styles.font_14,
                                                styles.bold,
                                            ]}
                                        >
                                            {post.likes} lượt thích
                                        </Text>
                                        <Text
                                            style={[
                                                styles.font_14,
                                                styles.infoText,
                                            ]}
                                        >
                                            <Text style={styles.bold}>
                                                {post.user_id.first_name}{" "}
                                                {post.user_id.last_name}{" "}
                                            </Text>
                                            <Text>{post.post_description}</Text>
                                        </Text>
                                        <Text
                                            style={[
                                                styles.font_14,
                                                styles.infoText,
                                            ]}
                                        >
                                            Xem tất cả 837 lượt bình luận
                                        </Text>
                                        <Text
                                            style={[
                                                styles.font_14,
                                                styles.infoText,
                                            ]}
                                        >
                                            {post.create_post_time} 6 tháng 1
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })} */}

                    <View style={styles.post}>
            <View style={styles.post_head}>
              <View style={styles.post_head_left}>
                <Image source={avatar} style={styles.avatar} />
                <Text style={[styles.font_14, styles.bold]}>Nguyễn Văn A</Text>
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
              <Text style={[styles.font_14, styles.bold]}>
                263.526 lượt thích
              </Text>
              <Text
                style={[styles.font_14, styles.infoText, { marginRight: 10 }]}
              >
                <Text style={styles.bold}>Nguyễn Văn A </Text>
                <Text>Phim mới</Text>
              </Text>
              <Text style={[styles.font_14, styles.infoText]}>
                Xem tất cả 837 lượt bình luận
              </Text>
              <Text style={[styles.font_14, styles.infoText]}>6 tháng 1</Text>
            </View>
          </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // paddingTop: 35,
        // backgroundColor:"grey"
    },
    avatar: {
        marginRight: 10,
        height: 32,
        width: 32,
        borderRadius: 16,
    },
    font_14: {
        fontSize: 14,
    },
    bold: {
        fontWeight: "bold",
    },
    more: {
        height: 20,
        width: 20,
    },
    post_head: {
        marginTop: 5,
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
        width: width,
        height: flatListHeight,
        resizeMode: "stretch",
        // backgroundColor:"red"
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 5,
        backgroundColor: "gray",
        marginHorizontal: 3,
    },
    paginationDotActive: {
        backgroundColor: "black",
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
