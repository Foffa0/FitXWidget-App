import React from "react";

import styles from "./GraphSlideCard.style";
import { LineChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";


const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]

const GraphSlideCard = () => {
    return (
        <View>
            <Text>Charts</Text>
            <LineChart data = {data} areaChart />
        </View>
        
    )
}

export default GraphSlideCard;
