import { useEffect, useState } from 'react';
import { View, ScrollView, Text, SafeAreaView, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import axios from 'axios';

import { COLORS, FONT, icons, images, SIZES } from '../../constants';
import styles from '../../styles/search.js';
import { StudioCard } from '../../components';

const Search = () => {
    const router = useRouter()

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
    
        try {
            await axios.get('https://fitx-proxy.daniel-stefan.dev/api/studios', {responseType: 'json', timeout: 5000})
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
        fetchData();
    }, []);

    const [input, setInput] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.dark, color: COLORS.white },
                    headerTitle: "Studio suchen",
                    headerTitleStyle: { fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.white },
                    headerTintColor: COLORS.white,
                }}
            />
            <View style={styles.container}>
                <TextInput value={input} onChangeText={(text) => setInput(text)} cursorColor={COLORS.primaryLight} placeholderTextColor={COLORS.grayedOut} style={styles.searchbar} placeholder='Nach Ort oder Studioname suchen' />
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.grayedOut} />
                ) : error ? (
                    <Text style={styles.errorText}>Fehler beim laden der Studios! {error.message}</Text>
                ) : (
                    <FlatList data={data.content} style={styles.flatlist} renderItem={({ item }) => {
                        if (input === '') {
                            return <StudioCard item={item} />;
                        }
    
                        if (item.name.toLowerCase().includes(input.toLowerCase().trim())) {
                            return <StudioCard item={item} />;
                        }
                    }} />
                )}
            </View>
        </SafeAreaView>
    );
}

export default Search;