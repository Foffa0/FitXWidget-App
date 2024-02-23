import { useEffect, useState } from 'react';
import { View, ScrollView, Text, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CapacityGraphs, ChangeStudio } from "../components";
import { COLORS, FONT, icons, images, SIZES } from '../constants';

const Home = () => {
    const router = useRouter();
    const [studioName, setStudioName] = useState('');
    
    useEffect(() => {
        async function getNamefromStorage() {
            const data = await AsyncStorage.getItem('fitx-name');
            setStudioName(data);
        }

        getNamefromStorage();
    });
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: COLORS.dark },
                    headerTitle: studioName,
                    headerTitleStyle: { fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.white }
                }}
            />
            <View>
                <Text style={{fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.white, paddingLeft: SIZES.large, paddingTop: SIZES.medium}}>Auslastung</Text>
                <CapacityGraphs />
                <ChangeStudio />
            </View>
            
        </SafeAreaView>
    );
}

 export default Home;