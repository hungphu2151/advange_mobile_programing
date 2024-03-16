import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error(e);
    }
};

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // console.log(value)
            return value;
        }
    } catch (e) {
        console.error(e);
    }
};



export { storeData, getData };
