import { View, Text, StyleSheet } from 'react-native';

export default function Splash() {
  return (
    <View style={styles.container}>
      <Text>20110540</Text>
      <Text>Huỳnh Hùng Phú
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});