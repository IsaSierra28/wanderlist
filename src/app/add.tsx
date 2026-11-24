import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Badge from "../components/Badge";
import { usePlaceForm } from "../hooks/use-place-form";
import { categories } from "../lib/validation";

export default function Add() {
    const {
        places,
        name,
        setName,
        notes,
        setNotes,
        category,
        setCategory,
        errors,
        submit,
    } = usePlaceForm();

    return (
        <ScrollView contentContainerStyle={styles.form}>
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
            {errors.notes && <Text style={styles.error}>{errors.notes}</Text>}
            <TextInput
                value={category}
                onChangeText={setCategory}
                placeholder="Category"
                style={styles.input}
            />
            {errors.category && <Text style={styles.error}>{errors.category}</Text>}
            <View style={styles.badgeRow}>
                {categories.map((c) => (
                    <Pressable key={c} onPress={() => setCategory(c)}>
                        <Badge
                            label={`${c} (${places.filter((p) => p.category === c).length})`}
                        />
                    </Pressable>
                ))}
            </View>
            <Button title="Add place" onPress={submit} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: { padding: 16, gap: 12 },
    formTitle: { fontSize: 20, fontWeight: "600", marginTop: 12 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
    },
    error: { color: "#c00" },
    badgeRow: { flexDirection: "row", gap: 8 },
});
