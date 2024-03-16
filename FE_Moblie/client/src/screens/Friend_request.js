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
} from "react-native";
import VideoPlayer from "expo-video-player";
import { ResizeMode } from "expo-av";
import { Video } from 'expo-av';

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

const images = [
    {
        uri: "https://res.cloudinary.com/dkeecnort/image/upload/v1702567978/g6320zqslhyqesex6w5w.jpg",
        isVideo: false,
    },
    {
        uri: "https://res.cloudinary.com/dkeecnort/video/upload/v1709737295/post_imgs/e3rh8vgvcegoun2lu6t2.mp4",
        // uri: "https://res.cloudinary.com/dkeecnort/image/upload/v1702957152/post_imgs/pkfuxejfdn1qbj9ahcwe.jpg",
        isVideo: true,
    },
    {
        uri: "https://res.cloudinary.com/dkeecnort/image/upload/v1702957152/post_imgs/pkfuxejfdn1qbj9ahcwe.jpg",
        isVideo: false,
    },
];

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
    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    const [currentPage, setCurrentPage] = useState(0);

    const onScroll = (event) => {
        const { contentOffset } = event.nativeEvent;
        const viewSize = event.nativeEvent.layoutMeasurement;
        const pageNum = Math.floor(contentOffset.x / viewSize.width);
        setCurrentPage(pageNum);
    };
    const renderMedia = ({ item }) => {
        if (item.isVideo) {
            return (
                <VideoPlayer
                    videoProps={{
                        shouldPlay: false,
                        resizeMode: ResizeMode.STRETCH,
                        source: {
                            uri: item.uri,
                        },
                    }}
                    style={styles.image}
                />
            );
        } else {
            return <Image source={{ uri: item.uri }} style={styles.image} />;
        }
    };
    const renderItem = ({ item }) => (
        <Image
          source={{ uri: item.uri }}
          style={styles.image}
        />
      );
    return (
        <View style={styles.container}>
            <DynamicHeader value={scrollOffsetY} />
            <View style={{ height: flatListHeight, backgroundColor: "red" }}>
                <FlatList
                    data={images}
                    horizontal={true}
                    pagingEnabled={true} 
                    renderItem={renderMedia}
                    keyExtractor={(item) => item.id}
                    onScroll={onScroll}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            {images.length > 1 && (
                <View style={styles.pagination}>
                    {images.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot,
                                index === currentPage
                                    ? styles.paginationDotActive
                                    : null,
                            ]}
                        />
                    ))}
                </View>
            )} 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 35,
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
    body: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        backgroundColor: "#678983",
        marginTop: 10,
        marginHorizontal: 10,
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
    subtitle: {
        color: "#ffff",
        fontWeight: "bold",
    },
    title: {
        color: "#ffff",
        fontWeight: "bold",
        fontSize: 20,
    },
    image: {
        width: width,
        height: width * 1.3375,
        resizeMode: "stretch",
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
});
