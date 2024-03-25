import logoCntt from "../../public/logocntt.png";
import noti from "../../public/notification.png";
import mess from "../../public/mess.png";
import { View, Image, Animated, StyleSheet } from "react-native";

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

export default DynamicHeader;

const styles = StyleSheet.create({
    head: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        marginVertical:5,
        backgroundColor: "#fff",
    },
    head_right: {
        flexDirection: "row",
        marginRight: 10,
        alignItems: "center",
    },
    logo_fit: {
        height: 32,
        width: 39.11,
    },
    noti: {
        height: 28,
        width: 28,
    },
    mess: {
        marginLeft: 20,
        height: 28,
        width: 28,
    },
})
