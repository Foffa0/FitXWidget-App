import { useState } from 'react';
import { View, ScrollView, Text, SafeAreaView, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, FONT, icons, images, SIZES } from '../../constants';
import styles from '../../styles/search.js';
import { StudioCard, ScreenHeaderBackBtn } from '../../components';
import useFetch from '../../hook/useFetch';

const Search = () => {
    const router = useRouter()

    const { data, isLoading, error } = useFetch('https://fitx-proxy.daniel-stefan.dev/api/studios');

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
                    <Text style={styles.errorText}>Fehler beim laden der Studios!</Text>
                ) : (
                    <FlatList data={data.content} style={styles.flatlist} renderItem={({ item }) => {
                        if (input === '') {
                            return <StudioCard item={item} />;
                        }
    
                        if (item.name.toLowerCase().includes(input.toLowerCase())) {
                            return <StudioCard item={item} />;
                        }
                    }} />
                )}
            </View>
        </SafeAreaView>
    );
}

export default Search;