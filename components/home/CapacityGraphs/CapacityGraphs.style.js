import { StyleSheet } from "react-native";

import { SIZES, COLORS, FONT } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SIZES.medium,
        justifyContent: "center",
        alignContent: "center",
    },
    carousel: {
        flex: 3,
        //height: 5000,
        aspectRatio: 1,
    },
    pagination: {
        flex: 1,
    }

});

export default styles;