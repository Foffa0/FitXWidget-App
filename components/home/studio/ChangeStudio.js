import { useState } from "react";
import { View, Text, Dimensions, Pressable, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { COLORS, icons } from "../../../constants";

import styles from "./ChangeStudio.style"

const ChangeStudio = () => {
    const router = useRouter();

    const { height, width } = Dimensions.get('window');

    return (
        <View>
            <Text style={styles.text}>Nicht dein FitX?</Text>
            <Link href="/search" asChild>
                <Pressable style={styles.button} >
                    <View>
                        <Image source={icons.change} style={styles.btnImage} />
                    </View>
                    <Text style={styles.btnText}>Studio wechseln</Text>
                </Pressable>
            </Link>
        </View>
    );
}

export default ChangeStudio;