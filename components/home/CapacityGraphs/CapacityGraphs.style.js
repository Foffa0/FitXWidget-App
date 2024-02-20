import { StyleSheet } from "react-native";

import { SIZES, COLORS, FONT } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        margin: SIZES.medium,
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 20,
        borderWidth: 9,
        backgroundColor: COLORS.lightDark,
        borderColor: COLORS.lightDark,
    },
    carousel: {
        
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 100,
        alignSelf: "center",
        paddingBottom: 20,
    }
});

export default styles;