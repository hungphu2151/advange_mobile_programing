import React, { useEffect } from "react";
import { View, Text } from "react-native";

const IntroductionScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "red", fontSize: 20, marginBottom: 10 }}>
        Phạm Trịnh Tây Nguyên
      </Text>
      <Text style={{ color: "red", fontSize: 20 }}>20110528</Text>
    </View>
  );
};

export default IntroductionScreen;
