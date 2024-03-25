import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import CardInfo from "../components/CardInfo";
import useAppBar from "../hooks/useAppBar";
import COLORS from "../utils/color";

const HomeScreen = () => {
    useAppBar({ isHome: true });

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* card header */}
                <View style={{ padding: 8 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View>
                            <Image
                                source={require("../assets/icons/user-xl.svg")}
                                style={{ width: 80, height: 80 }}
                            />

                            <Text style={{ fontWeight: "bold" }}>
                                Hoàng Văn B
                            </Text>
                        </View>

                        <View
                            style={{
                                padding: 8,
                                flexDirection: "row",
                                flexWrap: "wrap",
                                flex: 1,
                                justifyContent: "flex-end",
                                rowGap: 8,
                                columnGap: 16,
                            }}
                        >
                            <CardInfo name="Bài viết" count={20} />

                            <CardInfo name="Bạn bè" count={17} />

                            <CardInfo name="Người theo dõi" count={26} />

                            <CardInfo name="Đang theo dõi" count={14} />
                        </View>
                    </View>

                    <View style={{ marginVertical: 8 }}>
                        <Text>Mssv: 20112002</Text>
                        <Text>Khoa: Công nghệ thông tin</Text>
                    </View>

                    <View
                        style={{ flexDirection: "row", gap: 10, marginTop: 30 }}
                    >
                        <TouchableOpacity style={[styles.btn, styles.btnInfo]}>
                            <Text style={styles.btnText}>Thêm bạn bè</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, styles.btnSoda]}>
                            <Text style={[styles.btnText, { color: "black" }]}>
                                Theo dõi
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tabs */}
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 20,
                        justifyContent: "space-between",
                    }}
                >
                    <View
                        style={{
                            width: "50%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderBottomWidth: 2,
                            paddingBottom: 10,
                        }}
                    >
                        <FontAwesome6
                            name="table-cells"
                            size={24}
                            color="black"
                        />
                    </View>

                    <View
                        style={{
                            width: "50%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Entypo name="bookmark" size={24} color="black" />
                    </View>
                </View>

                {/* List Image */}

                <View
                    style={{
                        flexDirection: "row",
                        flex: 1,
                        gap: 3,
                        flexWrap: "wrap",
                    }}
                >
                    {[...Array(6)].map((_, i) => (
                        <View style={styles.wrapImage} key={i} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    btn: {
        minWidth: 150,
        padding: 8,
        borderRadius: 8,
    },

    btnInfo: {
        backgroundColor: COLORS.info,
    },

    btnSoda: {
        backgroundColor: COLORS.soda,
    },

    btnText: {
        textAlign: "center",
        color: "white",
    },

    wrapImage: {
        backgroundColor: COLORS.gray,
        width: `${98 / 3}%`,
        height: 130,
    },
});
