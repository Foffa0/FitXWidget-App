import React, { useEffect, useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from "./GraphSlideCard.style";
import { LineChart } from "react-native-gifted-charts";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import { COLORS } from "../../constants";

const { height, width } = Dimensions.get('window');

const customLabel = val => {

    return (

        <View style={{width: 50}}>

            <Text style={styles.axis}>{val}</Text>

        </View>

    );

};

let todayValuesTemplate = [ {value:1, labelComponent: () => customLabel('00 Uhr'),}, {value:2}, {value:1}, {value:1}, {value:1}, {value:1}, {value:0}, {value:0}, {value:1}, {value:2}, {value:5 }, {value:4},{value:7, labelComponent: () => customLabel('06 Uhr'),}, {value:8}, {value:10}, {value:12},{value:10}, {value:11}, {value:10}, {value:15}, {value:16}, {value:12},{value:20}, {value:25}, {value:33, labelComponent: () => customLabel('12 Uhr'),}, {value:35}, {value:34}, {value:39}, {value:30}, {value:21}, {value:22}, {value:18}, {value:25}, {value:30}, {value:33 }, {value:50},{value:70, labelComponent: () => customLabel('18 Uhr'),}, {value:80}, {value:85}, {value:80},{value:77}, {value:70}, {value:65}, {value:60}, {value:40}, {value:33},{value:21}, {value:20}, {value:18, labelComponent: () => customLabel('00 Uhr'),},]
let averageValuesTemplate = [ {value:1, labelComponent: () => customLabel('00 Uhr'),}, {value:2}, {value:1}, {value:1}, {value:1}, {value:1}, {value:0}, {value:0}, {value:1}, {value:2}, {value:5 }, {value:4},{value:7, labelComponent: () => customLabel('06 Uhr'),}, {value:8}, {value:10}, {value:12},{value:10}, {value:11}, {value:10}, {value:15}, {value:16}, {value:12},{value:20}, {value:25}, {value:33, labelComponent: () => customLabel('12 Uhr'),}, {value:35}, {value:34}, {value:39}, {value:30}, {value:21}, {value:22}, {value:18}, {value:25}, {value:30}, {value:33 }, {value:50},{value:70, labelComponent: () => customLabel('18 Uhr'),}, {value:80}, {value:85}, {value:80},{value:77}, {value:70}, {value:65}, {value:60}, {value:40}, {value:33},{value:21}, {value:20}, {value:18, labelComponent: () => customLabel('00 Uhr'),},]


const GraphSlideCard = (itemData) => {
    const [todayValues, setTodayValues] = useState([]);
    const [averageValues, setAverageValues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        setIsLoading(true);
        for (let i = 0; i < itemData.itemData.data.length; i++) {
            if(itemData.itemData.data[i].capacities.length == 0) {
                todayValuesTemplate[i].value = 0;
                averageValuesTemplate[i].value = 0;
            } else {
                todayValuesTemplate[i].value = itemData.itemData.data[i].capacities.slice(-1)[0];
                let sum = itemData.itemData.data[i].capacities.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue
                  },0);
                averageValuesTemplate[i].value = sum / itemData.itemData.data[i].capacities.length;
            }
        }
        console.log(itemData.itemData.weekday);
        console.log(todayValuesTemplate);
        setTodayValues(todayValuesTemplate);
        setAverageValues(averageValuesTemplate)
        setIsLoading(false);
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.dayText}>{itemData.itemData.day}</Text>
            { isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.grayedOut} />
                ) : (
                    <LineChart
                    data2={todayValues}
                    data={averageValues}
                    areaChart
                    hideDataPoints
                    maxValue={100}
                    curved
                    animateOnDataChange={false}
                    isAnimated={false}
                    initialSpacing={0}
                    endSpacing={0}
                    xAxisLabelsVerticalShift={5}
                    yAxisTextStyle={styles.axis}
                    color2={COLORS.primaryLight}
                    startFillColor2={COLORS.primary}
                    endFillColor2={COLORS.primary}
                    startOpacity={0.9}
                    endOpacity={0.3}
                    width={width-90}
                    height={width-200}
                    spacing={(width-110)/48}
                    noOfSections={4}
                    style={styles.lineChart} />
                )
            }
        </View>
        
    )
}

export default GraphSlideCard;
