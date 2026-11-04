import { router } from "expo-router";
import { useState} from "react";
import {
   Button, 
   Pressable, 
   ScrollView, 
   StyleSheet, 
   Text, 
   TextInput, 
   View, 

} from "react-native";
import Badge from "../components/Badge";
import { usePlaces } from "../lib/places-context";
import { Place } from "../lib/types";

type FormErrors = {
  name?: string, 
  notes? : string, 
  category?: string, 

};
const allowed = ["city", "nature", "food", "other"];
function isValidCategory(value: string): boolean {
   return allowed.includes(value.trim().toLowerCase());
}
export default function Add() {
   const{ places, addPlace } = usePlaces();
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
         next.notes = "That place is already in the list.";
      }
      if (!isValidCategory(category)) {
         next.category = `Category must be one of: ${allowed.join(",")}.`;
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
        addPlace(newPlace);
        setName("");
        setNotes("");
        setCategory("");
        setErrors({});
        router.navigate("/");
    }

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
                {allowed.map((c) => (
                    <Pressable key={c} onPress={() => setCategory(c)}>
                        <Badge
                            label={`${c} (${places.filter((p) => p.category === c).length})`}
                        />
                    </Pressable>
                ))}
            </View>
            <Button title="Add place" onPress={handleAdd} />
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
