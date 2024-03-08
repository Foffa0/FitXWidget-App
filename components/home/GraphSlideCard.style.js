import { StyleSheet } from "react-native"; 

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //padding: SIZES.xSmall,
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "top",
    },
    dayText: {
        fontFamily: FONT.regular,
        fontSize: SIZES.large,
        color: COLORS.lightWhite,
        padding: SIZES.medium,
        flex: 1,
    },
    lineChart: {
        flex: 1,
    },
    axis: {
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        color: COLORS.lightWhite,
    },
    pointerLabel: {
        color: COLORS.grayedOut, 
        fontFamily: FONT.medium, 
        fontSize:12, 
        justifyContent:'center',
    }, 
    pointerLabelActive: {
        color: COLORS.primaryLight, 
        fontFamily: FONT.medium, 
        fontSize:12, 
        justifyContent:'center',
    },
    warning: {
        color: 'red',
        fontFamily: FONT.regular,
        fontSize: 12,
        position: 'absolute', top: 0, left: 10, zIndex: 1
    }
});

export default styles;