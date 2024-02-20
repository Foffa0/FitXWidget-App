import { useState } from 'react';
import { View, ScrollView, Text, SafeAreaView, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, FONT, icons, images, SIZES } from '../../constants';
import styles from '../../styles/search.js';

const Search = () => {
    const router = useRouter()
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.dark },
                    headerTitle: "Studio suchen",
                    headerTitleStyle: { fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.white }
                }}
            />
            <View style={styles.container}>
                <TextInput cursorColor={COLORS.primaryLight} placeholderTextColor={COLORS.lightWhite} style={styles.searchbar} placeholder='Nach Ort oder Studioname suchen' />
            </View>
        </SafeAreaView>
    );
}

export default Search;