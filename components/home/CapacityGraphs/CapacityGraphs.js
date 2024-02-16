import { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import GraphSlideCard from "../GraphSlideCard";
import Carousel, { Pagination } from 'react-native-snap-carousel';

//import styles from "./CapacityGraphs.style"

const CapacityGraphs = () => {
    const router = useRouter();

    /*get pagination () {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }*/

    const [entries, setEntries] = useState([1,2,3,4]);
    const [activeSlide, setActiveSlide] = useState(0); //TODO: set active slide to todays weekday

    return (
        <View>
            <Carousel
                data={entries}
                renderItem={({ item }) => (
                    <GraphSlideCard 
                        data={item}
                    />
                )}
                onSnapToItem={(index) => setActiveSlide(index)}
                windowSize={1}
                sliderWidth={400}
                itemWidth={400}
            />
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 155, 0, 0.92)'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    );
}

export default CapacityGraphs;