import { useEffect, useState, useCallback } from 'react';
import { View, RefreshControl, Text, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { Stack, useRouter, Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { CapacityGraphs, ChangeStudio } from "../components";
import { COLORS, FONT, icons, images, SIZES } from '../constants';

import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { widgetTaskHandler } from '../widgets/widget-task-handler';

import { StudioInfoWidget } from '../widgets/studioInfoWidget';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { requestWidgetUpdate } from 'react-native-android-widget';
import { StatusBar } from 'expo-status-bar';


const BACKGROUND_FETCH_TASK = 'fitx-background-fetch';

// Define the task by providing a name and the function that should be executed
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const id = await AsyncStorage.getItem('fitx-id');
    const name = await AsyncStorage.getItem('fitx-name');
    let data = [];
    try {
      await axios.get(`https://mein.fitx.de/nox/public/v1/studios/${id}/utilization`, { responseType: 'json', timeout: 10000, headers: {"x-tenant": "fitx"} })
        .then(res => {
          data = res.data;
        });
    } catch (error) { 
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }

    percentage = "---";
    data.items.forEach(item => {
        if (item.isCurrent)
        {
          percentage = item.percentage;
        }
      });
      requestWidgetUpdate({
        widgetName: 'studioWidget',
        renderWidget: () => <StudioInfoWidget title={name} capacity={String(percentage) + '%'} />,
        widgetNotFound: () => {
          // Called if no widget is present on the home screen
        }
      });

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60 * 15, // 15 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
}


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

    // Background fetch
    const [isRegistered, setIsRegistered] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        checkStatusAsync();
        toggleFetchTask();
    }, []);

    const checkStatusAsync = async () => {
        const status = await BackgroundFetch.getStatusAsync();
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
        setStatus(status);
        setIsRegistered(isRegistered);
    };

    const toggleFetchTask = async () => {
        if (!isRegistered) {
            await registerBackgroundFetchAsync();
        }

        checkStatusAsync();
    };



    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // Pull to refresh indicator
    const [refreshing, setRefreshing] = useState(false);

    // call the api for capacity values
    const fetchData = async () => {
        setError(null);
        setIsLoading(true);
        const params = {studioId: Number(studioId)};
    
        try {
            await axios.get('https://fitx.schmuck.home64.de/api/capacity', {responseType: 'json', params: params, timeout: 10000})
            .then(res => {
                setData(res.data); 
                setIsLoading(false);
                setRefreshing(false);
            });
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }
    
    useEffect(() => {
        if(studioId != null) {
            fetchData();
        }
    }, [studioId, refreshing]);
    
    registerWidgetTaskHandler(widgetTaskHandler);


    // Pull to refresh
    const onRefresh = useCallback( async () => {
        setRefreshing(true);
        //await fetchData();
        //setRefreshing(false);
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
            <StatusBar style="light" />
            <ScrollView
            refreshControl={
                <RefreshControl progressBackgroundColor={COLORS.lightDark} refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primaryLight, COLORS.primary]} tintColor={COLORS.primary} />
            }>
                <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.medium, color: COLORS.white, paddingLeft: SIZES.large, paddingTop: SIZES.medium }}>Auslastung</Text>
                { error ? (
                    <Text style={{color: 'red'}}>{error.message}</Text>
                ) : isLoading || refreshing || (data.length === undefined) ?  (
                    <ActivityIndicator size="large" color={COLORS.grayedOut} />
                ) : (
                    <CapacityGraphs data={data} />
                )
                }
                
                <ChangeStudio />
            </ScrollView>

        </SafeAreaView>
    );
}

export default Home;