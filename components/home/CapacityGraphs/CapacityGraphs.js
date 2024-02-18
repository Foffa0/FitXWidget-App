import { useState } from "react";
import { View, Text, Dimensions } from "react-native";
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

const CapacityGraphs = () => {
    const router = useRouter();

    const { height, width } = Dimensions.get('window');

    const [entries, setEntries] = useState([{ day: "Sonntag" }, { day: "Montag" }, { day: "Dienstag" }, { day: "Mittwoch" }, { day: "Donnerstag" }, { day: "Freitag" }, { day: "Samstag" }]);
    const [activeSlide, setActiveSlide] = useState(0); //TODO: set active slide to todays weekday
    const progressValue = useSharedValue(0);

    return (
        <View /*style={styles.container}*/>
            <Carousel
                loop
                data={entries}
                width={width}
                height={width}
                renderItem={({ index }) => (
                    <GraphSlideCard
                        itemData={index}
                    />
                )}
                onSnapToItem={(index) => setActiveSlide(index)}
                snapEnabled={true}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                onProgressChange={(_, absoluteProgress) =>
                    (progressValue.value = absoluteProgress)
                }
            /*style={styles.carousel}*/
            />
            {!!progressValue && (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 100,
                        alignSelf: "center",
                    }
                    }
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