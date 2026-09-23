import { StyleSheet, Text, View } from "react-native";

type PlaceCardProps = {
  name: string;
  category: string;
  notes: string;
};

export default function PlaceCard({ name, category, notes }: PlaceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <Text>{notes}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "beige",
    padding: 16,
    margin: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#8d6868",
    elevation: 10,
  },
  name: { fontSize: 18, fontWeight: "bold" },
  category: { color: "teal", marginBottom: 4 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
