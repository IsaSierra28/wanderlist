import { useState } from "react";
import {
    Button,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Badge from "../components/Badge";
import Header from "../components/Header";
import PlaceCard from "../components/PlaceCard";
import { BottomTabInset } from "../constants/theme";
import { Place } from "@/lib/types";

type FormErrors = {
    name?: string;
    notes?: string;
    category?: string;
};

const allowed = ["city", "nature", "food", "other"];

function isValidCategory(value: string): boolean {
    return allowed.includes(value.trim().toLowerCase());
}

export default function Index() {
    const [places, setPlaces] = useState<Place[]>([
        { id: "kyoto", name: "Kyoto", category: "city", notes: "Temples in autumn" },
        { id: "banff", name: "Banff", category: "nature", notes: "Lake Louise at sunrise" },
        { id: "lisbon", name: "Lisbon", category: "food", notes: "Pasteis de nata tour" },
    ]);
    const [name, setName] = useState("");
    const [notes, setNotes] = useState("");
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});

    function validate() {
        const next: FormErrors = {};
        if (!name.trim()) next.name = "Name is required.";
        if (name.trim().length > 40) {
            next.name = "Name must be 40 characters or fewer.";
        }
        if (places.some((p) => p.name === name.trim())) {
            next.name = "That place is already in the list.";
        }
        if (notes.trim().length > 200) {
            next.notes = "Notes must be 200 characters or fewer.";
        }
        if (!isValidCategory(category)) {
            next.category = `Category must be one of: ${allowed.join(", ")}.`;
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function handleAdd() {
        if (!validate()) return;
        const newPlace: Place = {
            id: Date.now().toString(),
            name: name.trim(),
            notes: notes.trim() || undefined,
            category: category.trim().toLowerCase() as Place["category"],
        };
        setPlaces([newPlace, ...places]);
        setName("");
        setNotes("");
        setCategory("");
        setErrors({});
    }

    // const many: Place[] = Array.from({ length: 500 }, (_, i) => ({
    //     id: String(i),
    //     name: `Place ${i}`,
    //     category: "city",
    // }));

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <FlatList
                data={[...places].sort((a, b) => a.name.localeCompare(b.name))}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => <PlaceCard place={item} />}
                ListHeaderComponent={
                    <View style={styles.section}>
                        <Header title="Wanderlist" tagline="Places you want to see" />

                        <Image
                            source={{ uri: "https://picsum.photos/400/200" }}
                            style={styles.image}
                        />

                        <Text style={styles.formTitle}>Add a place</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Name"
                            style={styles.input}
                        />
                        {errors.name && <Text style={styles.error}>{errors.name}</Text>}
                        <TextInput
                            value={notes}
                            onChangeText={setNotes}
                            placeholder="Notes"
                            style={styles.input}
                        />
                        {errors.notes && (
                            <Text style={styles.error}>{errors.notes}</Text>
                        )}
                        <TextInput
                            value={category}
                            onChangeText={setCategory}
                            placeholder="Category"
                            style={styles.input}
                        />
                        {errors.category && (
                            <Text style={styles.error}>{errors.category}</Text>
                        )}
                        <View style={styles.badgeRow}>
                            {allowed.map((c) => (
                                <Pressable key={c} onPress={() => setCategory(c)}>
                                    <Badge
                                        label={`${c} (${places.filter((p) => p.category === c).length})`}
                                    />
                                </Pressable>
                            ))}
                        </View>
                        <Button title="Add place" onPress={handleAdd} />
                    </View>
                }
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={
                    <Text style={styles.empty}>No places yet - add your first one above.</Text>
                }
                ListFooterComponent={
                    <View style={styles.section}>
                        <Text>{places.length} places</Text>
                        <Button title="Clear list" onPress={() => setPlaces([])} />
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1 },
    list: {
        padding: 16,
        paddingBottom: BottomTabInset + 16,
        gap: 12,
    },
    section: { gap: 12 },
    image: { width: "100%", height: 140, borderRadius: 12 },
    badgeRow: { flexDirection: "row", gap: 8 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
    },
    formTitle: { fontSize: 20, fontWeight: "600", marginTop: 12 },
    error: { color: "#c00" },
    empty: { color: "#666", textAlign: "center", marginTop: 24 },
    separator: { height: 1, backgroundColor: "#ddd" },
});
