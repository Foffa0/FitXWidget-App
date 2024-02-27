import { useEffect, useState } from 'react';
import { View, ScrollView, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { CapacityGraphs, ChangeStudio } from "../components";
import { COLORS, FONT, icons, images, SIZES } from '../constants';

import { WidgetPreview } from 'react-native-android-widget';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { widgetTaskHandler } from '../widgets/widget-task-handler';
import useFetch from '../hook/useFetch';

import { StudioInfoWidget } from '../widgets/studioInfoWidget';

const Home = () => {
    const router = useRouter();
    const [studioName, setStudioName] = useState('');
    const [studioId, setStudioId] = useState(null);

    useEffect(() => {
        async function getStudiofromStorage() {
            const data = await AsyncStorage.getItem('fitx-name');
            setStudioName(data);
            const data2 = await AsyncStorage.getItem('fitx-id');
            setStudioId(data2); 
            //console.log(data2)
        }

        getStudiofromStorage();
        
        
    });

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        const params = {studioId: Number(studioId)};
        //console.log(params)
    
        try {
            await axios.get('http://192.168.1.10:7002/api/capacity', {responseType: 'json', timeout: 5000, params: params})
            .then(res => {
                setData(res.data); 
            });
            setIsLoading(false);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        if(studioId != null) {
            fetchData();
            //console.log(data)
        }
        
    }, [studioId]);
    
    registerWidgetTaskHandler(widgetTaskHandler);


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
                <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.white, paddingLeft: SIZES.large, paddingTop: SIZES.medium }}>Auslastung</Text>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.grayedOut} />
                ) : error ? (
                    <Text style={{color: 'red'}}>{error.message}</Text>
                    
                ) : (
                    <CapacityGraphs data={data} />
                )
                }
                
                <ChangeStudio />
                <WidgetPreview
                    renderWidget={() => <StudioInfoWidget title={"fitx test"} capacity={"10%"} />}
                    width={200}
                    height={200}
                />
            </View>

        </SafeAreaView>
    );
}

export default Home;