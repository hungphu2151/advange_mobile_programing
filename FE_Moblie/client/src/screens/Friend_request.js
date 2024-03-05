import { useRef } from "react";
import { ScrollView, View, Text, StyleSheet, Animated, Image } from "react-native";

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

const DATA = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
];

// const Header_Max_Height = 240;
// const Header_Min_Height = 120;
// const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const DynamicHeader = ({ value }: any) => {
//   const animatedHeaderHeight = value.interpolate({
//     inputRange: [0, Scroll_Distance],
//     outputRange: [Header_Max_Height, Header_Min_Height],
//     extrapolate: "clamp",
//   });
//   const animatedHeaderColor = value.interpolate({
//     inputRange: [0, Scroll_Distance],
//     outputRange: ["#181D31", "#678983"],
//     extrapolate: "clamp",
//   });
  return (
    <Animated.View
    //   style={[
    //     styles.header,
    //     {
    //     //    height: animatedHeaderHeight,
    //     //   backgroundColor: animatedHeaderColor,
    //     },
    //   ]}
    >
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
  return (
    <View style={styles.container}>
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
        {DATA.map((val) => {
          return (
            <View style={styles.body}>
              <Text>{val.id}</Text>
            </View>
          );
        })}
      </ScrollView>
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
});
