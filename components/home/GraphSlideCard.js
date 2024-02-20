import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styles from "./GraphSlideCard.style";
import { LineChart } from "react-native-gifted-charts";
import { View, Text, Dimensions } from "react-native";
import { COLORS } from "../../constants";

const { height, width } = Dimensions.get('window');


const data=[ {value:1, labelComponent: () => customLabel('00 Uhr'),}, {value:2}, {value:1}, {value:1}, {value:1}, {value:1}, {value:0}, {value:0}, {value:1}, {value:2}, {value:5 }, {value:4},{value:7, labelComponent: () => customLabel('06 Uhr'),}, {value:8}, {value:10}, {value:12},{value:10}, {value:11}, {value:10}, {value:15}, {value:16}, {value:12},{value:20}, {value:25}, {value:33, labelComponent: () => customLabel('12 Uhr'),}, {value:35}, {value:34}, {value:39}, {value:30}, {value:21}, {value:22}, {value:18}, {value:25}, {value:30}, {value:33 }, {value:50},{value:70, labelComponent: () => customLabel('18 Uhr'),}, {value:80}, {value:85}, {value:80},{value:77}, {value:70}, {value:65}, {value:60}, {value:40}, {value:33},{value:21}, {value:20}, {value:18, labelComponent: () => customLabel('00 Uhr'),},]

const customLabel = val => {

    return (

        <View style={{width: 50}}>

            <Text style={styles.axis}>{val}</Text>

        </View>

    );

};

const GraphSlideCard = (itemData) => {
    return (
        <View style={styles.container}>
            <Text style={styles.dayText}>{itemData.itemData.day}</Text>
            <LineChart
                data={data}
                areaChart
                hideDataPoints
                maxValue={100}
                curved
                initialSpacing={0}
                endSpacing={0}
                xAxisLabelsVerticalShift={5}
                yAxisTextStyle={styles.axis}
                color1={COLORS.primaryLight}
                startFillColor1={COLORS.primary}
                endFillColor1={COLORS.primary}
                startOpacity={0.9}
                endOpacity={0.3}
                width={width-90}
                height={width-200}
                spacing={(width-110)/48}
                noOfSections={4}
                style={styles.lineChart} />
        </View>
        
    )
}

export default GraphSlideCard;
