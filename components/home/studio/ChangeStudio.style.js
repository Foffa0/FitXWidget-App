import { StyleSheet } from 'react-native';

import { SIZES, COLORS, FONT } from '../../../constants';

const styles = StyleSheet.create({
    button: {
        //height: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        borderRadius: SIZES.small,
        backgroundColor: COLORS.lightDark,
        marginHorizontal: SIZES.medium,
        padding: SIZES.xSmall,
    },
    btnImage: {
        width: 40,
        height: 40,
        borderRadius: SIZES.xSmall,
    },
    btnText: {
        fontFamily: FONT.bold, 
        fontSize: SIZES.medium, 
        color: COLORS.white, 
        letterSpacing: 0.5,
        paddingHorizontal: SIZES.large,
    },
    text: {
        fontFamily: FONT.bold, 
        fontSize: SIZES.medium, 
        color: COLORS.white, 
        paddingLeft: SIZES.large, 
        paddingVertical: SIZES.large,
    }
});

export default styles;