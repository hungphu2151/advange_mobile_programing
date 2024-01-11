import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './components/Splash';

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setAppIsReady(true);
      }, 10000);
    }, []);
  
  
    return (
      <View style={styles.container}>
        {appIsReady ? <Splash />:<Text>Home 123456</Text>}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
