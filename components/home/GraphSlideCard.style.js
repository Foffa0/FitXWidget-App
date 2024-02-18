import { StyleSheet } from "react-native"; 

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 1000,
        padding: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
    },
    dayText: {
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        //flex: 1,
    },
    lineChart: {
        //flex: 1,
        //aspectRatio: 1,
    }
});

export default styles;