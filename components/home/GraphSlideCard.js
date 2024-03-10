import React, { useEffect, useState } from "react";
import styles from "./GraphSlideCard.style";
import { LineChart } from "react-native-gifted-charts";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import { COLORS, FONT } from "../../constants";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const { height, width } = Dimensions.get('window');

const customLabel = val => {

    return (

        <View style={{width: 50}}>

            <Text style={styles.axis}>{val}</Text>

        </View>

    );

}; 


let averageValuesTemplate = [ {value:1, labelComponent: () => customLabel('00 Uhr'),}, {value:2}, {value:1}, {value:1}, {value:1}, {value:1}, {value:0}, {value:0}, {value:1}, {value:2}, {value:5 }, {value:4},{value:7, labelComponent: () => customLabel('06 Uhr'),}, {value:8}, {value:10}, {value:12},{value:10}, {value:11}, {value:10}, {value:15}, {value:16}, {value:12},{value:20}, {value:25}, {value:33, labelComponent: () => customLabel('12 Uhr'),}, {value:35}, {value:34}, {value:39}, {value:30}, {value:21}, {value:22}, {value:18}, {value:25}, {value:30}, {value:33 }, {value:50},{value:70, labelComponent: () => customLabel('18 Uhr'),}, {value:80}, {value:85}, {value:80},{value:77}, {value:70}, {value:65}, {value:60}, {value:40}, {value:33},{value:21}, {value:20, labelComponent: () => customLabel('00 Uhr')},]


const GraphSlideCard = (itemData) => {
    const [todayValues, setTodayValues] = useState([]);
    const [averageValues, setAverageValues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pointerIndex, setPointerIndex] = useState(0);
    // Check for missing data that still needs to be collected by the api (only if a new studio has initially been added)
    const [dataMissing, setDataMissing] = useState(false);

    // Use the correct timezone
    const todayTemp = new Date().toLocaleString("sv-SE", {timeZone: "Europe/Berlin"}).replaceAll(".", '-').replace(", ", "");
    const today = new Date(todayTemp);

    // subtract 15, because the time in the itemData is a range and the capacity for that time is fetched in the middle of this time period
    let minutes;
    if ((today.getMinutes() - 15) < 0)
    {
        minutes = ('0' + today.getMinutes()).slice(-2);
    } else {
        minutes = today.getMinutes() - 15;
    }


    const fetchData = async () => {
        setIsLoading(true);
            let todayValuesTemp = [];
            // go through the recieved dataset and prepare it for the Linegraph
            for (let i = 0; i < itemData.itemData.data.length; i++) {
                if(itemData.itemData.data[i].capacities.length === 0) {
                    if (!(`${("0" + today.getHours()).slice(-2)}:${minutes}:00` < itemData.itemData.data[i].start ))
                    {
                        todayValuesTemp.push({value: 0})
                    }                
                    averageValuesTemplate[i].value = 0;
                    setDataMissing(true);
                    
                } else {
                    if (!(`${("0" + today.getHours()).slice(-2)}:${minutes}:00` < itemData.itemData.data[i].start) )
                    {
                        todayValuesTemp.push({value: itemData.itemData.data[i].capacities.slice(-1)[0]});
                    } 
                    
                    let sum = itemData.itemData.data[i].capacities.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue
                    },0);
                    averageValuesTemplate[i].value = sum / itemData.itemData.data[i].capacities.length;
                }
            }

            

            if (today.getDay() === itemData.itemData.weekday) {
                const id = await AsyncStorage.getItem('fitx-id');
    
                try {
                    await axios.get(`https://fitx-proxy.daniel-stefan.dev/api/utilization/${id}`, {responseType: 'json', timeout: 5000,})
                    .then(res => {
                        res.data.items.forEach(item => {
                            if (item.isCurrent)
                            {
                                todayValuesTemp.push({value: item.percentage});
                            }
                        });
                        
                        setTodayValues(todayValuesTemp);
                        setAverageValues(averageValuesTemplate);

                        setPointerIndex(todayValuesTemp.length - 1);

                        setIsLoading(false);
                        
                    });
                } catch (error) {
                    console.log(error)
                }
            } else {
                setTodayValues(todayValuesTemp);
                setAverageValues(averageValuesTemplate);

                setPointerIndex(todayValuesTemp.length - 1);

                setIsLoading(false);
            }

            
    }
    
    // pull and initialize graph data
    useEffect(() => {

        fetchData();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.dayText}>{itemData.itemData.day}</Text>
             {dataMissing ? (
                    <Text style={styles.warning}>Daten sind erst nach einer Woche vollständig!</Text>
                ): null} 
            { isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.grayedOut} />
                ) : today.getDay() === itemData.itemData.weekday ? (
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
                    style={styles.lineChart}
                    getPointerProps={(pointerIndex, pointerX, pointerY) => {
                        if (pointerIndex.pointerIndex != -1)
                        {
                            setPointerIndex(pointerIndex.pointerIndex)
                        }
                            
                    }}
                    pointerConfig={{
                        persistPointer: true,
                        initialPointerIndex: todayValues.length - 1,
                        pointerStripUptoDataPoint: true,
                        autoAdjustPointerLabelPosition: true,
                        pointerStripColor: 'lightgray',
                        pointerStripWidth: 2,
                        strokeDashArray: [2, 5],
                        pointer1Color: 'lightgray',
                        pointer2Color: COLORS.primaryLight,
                        radius: 4,
                        pointerLabelWidth: 80,
                        pointerLabelHeight: 30,
                        pointerLabelComponent: items => {
                            let time = "00:00";
                            if (pointerIndex % 2 == 0) {
                                time = Math.floor(pointerIndex/2) + ":" + "00";
                            } else {
                                time = Math.floor(pointerIndex/2) + ":" + "30";
                            }
                             
                          return (      
                            <View       
                              style={{       
                                height: 30,     
                                width: 80,       
                                backgroundColor: '#282C3E',
                                borderRadius: 4,       
                                justifyContent:'center',      
                                paddingLeft:8,     
                              }}>
                                {pointerIndex < todayValues.length ? (
                                    
                                    pointerIndex === todayValues.length - 1 ?  (
                                         <Text style={styles.pointerLabelActive}>{("0" + today.getHours()).slice(-2) + ':' + ("0" + today.getMinutes()).slice(-2)} <Text style={{color: 'white', fontFamily: FONT.medium, fontSize:12}}>{todayValues[pointerIndex].value + '%'}</Text></Text> 

                                     ) : (
                                        <Text style={styles.pointerLabelActive}>{time}  <Text style={{color: 'white', fontFamily: FONT.medium, fontSize:12}}>{items.length == 2 ? items[1].value + '%' : ''}</Text></Text> 
                                    )
                                ) : (
                                    <Text style={styles.pointerLabel}>{time}  <Text style={{color: 'white', fontFamily: FONT.medium, fontSize:12}}>{items[0].value + '%'}</Text></Text> 
                                )
                                }
                                
                            </View>
          
                          );
          
                        },
          
                      }} />
                ) : (
                    <LineChart
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
                    style={styles.lineChart}
                    getPointerProps={(pointerIndex, pointerX, pointerY) => {
                        if (pointerIndex.pointerIndex != -1)
                        {
                            setPointerIndex(pointerIndex.pointerIndex)
                        }
                            
                    }}
                    pointerConfig={{
                        pointerStripUptoDataPoint: true,
                        autoAdjustPointerLabelPosition: true,
                        pointerStripColor: 'lightgray',          
                        pointerStripWidth: 2,         
                        strokeDashArray: [2, 5],          
                        pointerColor: 'lightgray',         
                        radius: 4,        
                        pointerLabelWidth: 80,         
                        pointerLabelHeight: 30,         
                        pointerLabelComponent: items => {  
                            let time = "00:00";
                            if (pointerIndex % 2 == 0) {
                                time = Math.floor(pointerIndex/2) + ":" + "00";
                            } else {
                                time = Math.floor(pointerIndex/2) + ":" + "30";
                            }
                             
                          return (      
                            <View       
                              style={{       
                                height: 30,     
                                width: 80,       
                                backgroundColor: '#282C3E',
                                borderRadius: 4,       
                                justifyContent:'center',      
                                paddingLeft:8,     
                              }}>

                                <Text style={styles.pointerLabel}>{time}  <Text style={{color: 'white', fontFamily: FONT.medium, fontSize:12}}>{items[0].value + '%'}</Text></Text> 

                            </View>
          
                          );
          
                        },
          
                    }} />
                )
            }
            
        </View>
    )
}

export default GraphSlideCard;
