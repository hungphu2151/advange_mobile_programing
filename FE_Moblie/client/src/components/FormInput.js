import { StyleSheet, TextInput, View } from "react-native";

const FormInput = ({ ...props }) => {
  return (
    <View>
      <TextInput placeholderTextColor={"#00000033"} style={styles.input} {...props} />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    borderColor: "#00000033",
    backgroundColor: "#FAFAFA",
    marginBottom: 18,
  },
});
