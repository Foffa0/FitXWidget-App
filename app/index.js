import { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { CapacityGraphs } from "../components";

import { COLORS, FONT, icons, images, SIZES } from '../constants';

const Home = () => {
    const router = useRouter();


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerTitle: "Name von Studio hier",
                    headerTitleStyle: { fontFamily: FONT.bold, fontSize: SIZES.large }
                }}
            />
            <View>
                <CapacityGraphs />
            </View>
            
        </SafeAreaView>
    );

    /*return (
        <View>
                <Carousel
                    data={this.state.entries}
                    renderItem={({ item }) => (
                        <GraphSlideCard 
                            data={item}
                        />
                    )}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                />
                { this.pagination }
            </View>
    )*/
}

 export default Home;