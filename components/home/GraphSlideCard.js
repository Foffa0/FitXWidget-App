import React from "react";

import styles from "./GraphSlideCard.style";
import { LineChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";


const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]

const GraphSlideCard = (itemData) => {
    console.log(itemData)
    return (
        <View style={styles.container}>
            <Text style={styles.dayText}>{itemData.itemData.day}</Text>
            <LineChart  data = {data} areaChart style={styles.lineChart} />
        </View>
        
    )
}

export default GraphSlideCard;
