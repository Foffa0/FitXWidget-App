import { View, Text, Dimensions, Pressable, Image } from "react-native";
import { COLORS, icons } from "../../constants";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from "axios";

import styles from '../../styles/search.js';

const idKey = 'fitx-id';
const nameKey = 'fitx-name';

const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      alert(`Error saving fitx ${e}`);
    }
    
};

const sendData = (name, id) => {
    try {
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('studioId', id);
        axios.post('https://fitx.schmuck.home64.de/api/studios', params);
    } catch (error) {
        alert(`Error sending request: ${error}`);
    } 
}
const StudioCard = (item) => {
    const router = useRouter();

    return (
        <Pressable style={styles.listItem} onPress={() => {
            storeData(idKey, String(item.item.id));
            storeData(nameKey, item.item.name);
            sendData(item.item.name, item.item.id);
            router.navigate('/');
        }}>
            <Text style={styles.listItem_text}>{item.item.name}</Text>
            <AntDesign name="right" size={24} color={COLORS.lightWhite}/>
        </Pressable>
    );
};

export default StudioCard;