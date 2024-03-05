import { Alert } from "react-native";

const createAlert = (title, message) =>
  Alert.alert(title, message, [
    {
      text: "Ok",
      onPress: () => console.log("Ok Pressed"),
    },
  ]);

export default createAlert;
