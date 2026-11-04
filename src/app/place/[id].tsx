import { useLocalSearchParams } from "expo-router";
import { Tabs } from "expo-router/js-tabs";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import Badge from "../../components/Badge";
import { usePlaces } from "../../lib/places-context";

export default function PlaceDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { places, removePlace } = usePlaces();
    const place = places.find((candidate) => candidate.id === id);

    if (!place) {
        return (
            <View style={styles.screen}>
                <Text style={styles.notes}>That place is no longer here.</Text>
            </View>
        );
    }

    function confirmRemove(id: string) {
        Alert.alert("Remove this place?", "It will be gone from your list.", [
            { text: "Cancel", style: "cancel" },
            { text: "Remove", style: "destructive", onPress: () => removePlace(id) },
        ]);
    }

    return (
        <View style={styles.screen}>
            <Tabs.Screen options={{ title: place.name }} />
            <Text style={styles.name}>{place.name}</Text>
            <Badge label={place.category} />
            <Text style={styles.notes}>{place.notes || "No notes yet."}</Text>
            <Button title="Remove this place" onPress={() => confirmRemove(place.id)} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, padding: 24, gap: 12 },
    name: { fontSize: 28, fontWeight: "700" },
    notes: { color: "#444", fontSize: 16 },
});
