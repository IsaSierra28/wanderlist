import Constants from "expo-constants";
import {StyleSheet, Text, View} from "react-native";

export default function Settings(){
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Wanderlist</Text>
            <Text style={styles.note}>Built by Isabela Sierra</Text>
            <Text style={styles.note}>Application development 2 (Mobile)</Text>
            <Text style={styles.note}>Version {Constants.expoConfig?.version}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {fontSize: 24, fontWeight: "bold"},
    note: {color: "#666"},
});
