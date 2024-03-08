import { useEffect, useState, useCallback } from 'react';
import { View, RefreshControl, Text, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { Stack, useRouter, useRootNavigationState, Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { CapacityGraphs, ChangeStudio } from "../components";
import { COLORS, FONT, icons, images, SIZES } from '../constants';

import { WidgetPreview } from 'react-native-android-widget';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { widgetTaskHandler } from '../widgets/widget-task-handler';

import { StudioInfoWidget } from '../widgets/studioInfoWidget';

const Home = () => {
    const router = useRouter();
    const [studioName, setStudioName] = useState('');
    const [studioId, setStudioId] = useState(null);
    // Used to determine wether the user has already selected a studio (and redirect to the search page if not)
    const [redirectSearch, setRedirectSearch] = useState(false);

    useEffect(() => {
        async function getStudiofromStorage() {
            const data = await AsyncStorage.getItem('fitx-name');
            setStudioName(data);
            const data2 = await AsyncStorage.getItem('fitx-id');
            if(data2 === null) {
                setRedirectSearch(true);
            }
            setStudioId(data2);   
        }

        getStudiofromStorage();
    });

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // call the api for capacity values
    const fetchData = async () => {
        setIsLoading(true);
        const params = {studioId: Number(studioId)};
    
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
        console.log(data)
    }

    const rootNavigationState = useRootNavigationState();
    
    useEffect(() => {
        if(studioId != null) {
            fetchData();
        } /*else {
            setRedirectSearch(true);
        }*/
        
    }, [studioId]);
    
    registerWidgetTaskHandler(widgetTaskHandler);

    // Pull to refresh
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData();
        setRefreshing(false);
    }, []);

    if (redirectSearch) return <Redirect href={'/search'} />;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.dark },
                    headerTitle: studioName,
                    headerTitleStyle: { fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.white }
                }}
            />
            <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{color: COLORS.primary}} />
            }>
                <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.white, paddingLeft: SIZES.large, paddingTop: SIZES.medium }}>Auslastung</Text>
                {isLoading || (data.length === 0) ? (
                    <ActivityIndicator size="large" color={COLORS.grayedOut} />
                ) : error ? (
                    <Text style={{color: 'red'}}>{error.message}</Text>
                    
                ) : (
                    <CapacityGraphs data={data} />
                )
                }
                
                <ChangeStudio />
                <WidgetPreview
                    renderWidget={() => <StudioInfoWidget title={"fitx test"} capacity={"60%"} />}
                    width={200}
                    height={200}
                />
            </ScrollView>

        </SafeAreaView>
    );
}

export default Home;