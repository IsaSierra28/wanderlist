import { StyleSheet, Text, View } from "react-native";

import { Spacing } from "@/constants/theme";
import Badge from "./Badge";
import { Place } from "@/lib/types";

type PlaceCardProps = {
 place : Place;
};

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{place.name}</Text>
        <Badge label={place.category} />
      </View>

          {place.notes && <Text style={styles.notes} numberOfLines={2}>{place.notes}</Text>}


    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff8f3",
    borderRadius: Spacing.three,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: "#f3d9cc",
    gap: Spacing.two,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  notes: {
    fontSize: 14,
    color: "#555",
  },
});
