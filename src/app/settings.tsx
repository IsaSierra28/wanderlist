import Constants from "expo-constants";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { usePlaces } from "../lib/places-context";

export default function Settings() {
    const { places, resetPlaces } = usePlaces();

    function confirmReset() {
        Alert.alert("Reset places?", "This brings back the three starting places.", [
            { text: "Cancel", style: "cancel" },
            { text: "Reset", style: "destructive", onPress: resetPlaces },
        ]);
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Wanderlist</Text>
            <Text style={styles.note}>Built by Isabela Sierra</Text>
            <Text style={styles.note}>Application development 2 (Mobile)</Text>
            <Text style={styles.note}>Version {Constants.expoConfig?.version}</Text>
            <Text style={styles.note}>{places.length} places saved</Text>
            <Button title="Reset to the starting places" onPress={confirmReset} />
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
    title: { fontSize: 24, fontWeight: "bold" },
    note: { color: "#666" },
});
