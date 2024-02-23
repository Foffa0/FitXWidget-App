import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    searchbar: {
        height: 40,
        width: "90%",
        backgroundColor: COLORS.lighterDark,
        borderRadius: 5,
        color: COLORS.white,
        marginHorizontal: SIZES.medium,
        marginTop: 10,
        paddingHorizontal: SIZES.xSmall,
    },
    flatlist: {
        width: "90%",
        marginVertical: SIZES.large,
        marginHorizontal: SIZES.medium,
        backgroundColor: COLORS.lighterDark,
        borderRadius: SIZES.small,
        marginBottom: 50,
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 65,
        color: COLORS.white,
        borderColor: COLORS.dark,
        borderWidth: StyleSheet.hairlineWidth,
        padding: SIZES.small,
    },
    listItem_text: {
        color: COLORS.white,
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
    },
    errorText: {
        color: 'red',
        fontSize: SIZES.medium,
        marginTop: 50,
    }
});

export default styles;