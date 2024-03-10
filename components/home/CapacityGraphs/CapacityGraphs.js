import { useEffect, useState } from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import GraphSlideCard from "../GraphSlideCard";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import Carousel from 'react-native-reanimated-carousel';

import styles from "./CapacityGraphs.style"
import { COLORS } from "../../../constants";

const CapacityGraphs = (data) => {
    const [data2] = useState(data);
    const router = useRouter();
    const { height, width } = Dimensions.get('window');

    const [entries, setEntries] = useState([{ day: "Sonntag", weekday: 0, data: data.data[0].values }, { day: "Montag", weekday: 1, data: data.data[1].values }, { day: "Dienstag", weekday: 2, data: data.data[2].values }, { day: "Mittwoch", weekday: 3, data: data.data[3].values }, { day: "Donnerstag", weekday: 4, data: data.data[4].values }, { day: "Freitag", weekday: 5, data: data.data[5].values }, { day: "Samstag", weekday: 6, data: data.data[6].values }]);
    const [activeSlide, setActiveSlide] = useState(0);
    const progressValue = useSharedValue(0); 

    const today = new Date(new Date().toLocaleString("sv-SE", {timeZone: "Europe/Berlin"}).replaceAll(".", '-').replace(", ", ""));

    return (
        <View style={styles.container}>
            {!data2 ? (
                    <ActivityIndicator size="large" color={COLORS.grayedOut} />
                ) : (
                    <Carousel
                        defaultIndex={today.getDay()}
                        loop
                        data={entries}
                        width={width-50}
                        height={width-100}
                        renderItem={({ item }) => (
                            <GraphSlideCard
                                itemData={item}
                            />
                        )}
                        onSnapToItem={(index) => setActiveSlide(index)}
                        snapEnabled={true}
                        onProgressChange={(_, absoluteProgress) =>
                            (progressValue.value = absoluteProgress)
                        }
                        style={styles.carousel}
                    />
                )
            }
            
            {!!progressValue && (
                <View
                    style={ styles.pagination}
                >
                    {entries.map((backgroundColor, index) => {
                        return (
                            <PaginationItem
                                backgroundColor={COLORS.primary}
                                animValue={progressValue}
                                index={index}
                                key={index}
                                isRotate={false}
                                length={entries.length}
                            />
                        );
                    })}
                </View>
            )}
        </View>

    
    );
}

const PaginationItem = (props) => {
    const { animValue, index, length, backgroundColor, isRotate } = props;
    const width = 10;

    const animStyle = useAnimatedStyle(() => {
        let inputRange = [index - 1, index, index + 1];
        let outputRange = [-width, 0, width];

        if (index === 0 && animValue?.value > length - 1) {
            inputRange = [length - 1, length, length + 1];
            outputRange = [-width, 0, width];
        }

        return {
            transform: [
                {
                    translateX: interpolate(
                        animValue?.value,
                        inputRange,
                        outputRange,
                        Extrapolation.CLAMP,
                    ),
                },
            ],
        };
    }, [animValue, index, length]);
    return (
        <View
            style={{
                backgroundColor: "white",
                width,
                height: width,
                borderRadius: 50,
                overflow: "hidden",
                transform: [
                    {
                        rotateZ: isRotate ? "90deg" : "0deg",
                    },
                ],
            }}
        >
            <Animated.View
                style={[
                    {
                        borderRadius: 50,
                        backgroundColor,
                        flex: 1,
                    },
                    animStyle,
                ]}
            />
        </View>
    );
};



export default CapacityGraphs;