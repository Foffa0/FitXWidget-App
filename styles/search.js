import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    searchbar: {
        height: 40,
        width: "99%",
        backgroundColor: COLORS.lighterDark,
        borderRadius: 5,
        color: COLORS.white,
        paddingHorizontal: 10,
    }
});

export default styles;