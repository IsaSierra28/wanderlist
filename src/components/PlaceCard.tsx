import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

type PlaceCardProps = {
  name: string;
  category: string;
  notes: string;
};

export default function PlaceCard({ name, category, notes }: PlaceCardProps) {
  const theme = useTheme();

  return (
    <ThemedView
      type="backgroundElement"
      style={[styles.card, { borderColor: theme.backgroundSelected }]}
    >
      <View style={styles.header}>
        <ThemedText type="smallBold">{name}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {category}
        </ThemedText>
      </View>

      <ThemedText type="small" themeColor="textSecondary">
        {notes}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    borderWidth: 1,
    gap: Spacing.two,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
