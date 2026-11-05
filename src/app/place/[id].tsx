import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { Tabs } from "expo-router/js-tabs";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import Badge from "../../components/Badge";
import { usePlaces } from "../../lib/places-context";

export default function PlaceDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { places, removePlace, setPhoto } = usePlaces();
    const place = places.find((candidate) => candidate.id === id);

    if (!place) {
        return (
            <View style={styles.screen}>
                <Text style={styles.notes}>That place is no longer here.</Text>
            </View>
        );
    }

    async function takePhoto(placeId: string) {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert(
                "Camera not allowed",
                "Wanderlist needs the camera to take a photo. You can allow it in your phone's settings.",
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
            setPhoto(placeId, result.assets[0].uri);
        }
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
            {place.photoUri && (
                <Image source={{ uri: place.photoUri }} style={styles.photo} />
            )}
            <Button title="Take a photo" onPress={() => takePhoto(place.id)} />
            {place.photoUri && (
                <Button title="Remove photo" onPress={() => setPhoto(place.id, undefined)} />
            )}
            <Button title="Remove this place" onPress={() => confirmRemove(place.id)} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, padding: 24, gap: 12 },
    name: { fontSize: 28, fontWeight: "700" },
    notes: { color: "#444", fontSize: 16 },
    photo: { width: "100%", height: 220, borderRadius: 12 },
});
