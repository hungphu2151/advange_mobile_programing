import { Text, View } from "react-native";

const CardInfo = ({ name, count }) => {
    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                width: 110,
            }}
        >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{count}</Text>
            <Text style={{ fontSize: 15 }}>{name}</Text>
        </View>
    );
};

export default CardInfo;
