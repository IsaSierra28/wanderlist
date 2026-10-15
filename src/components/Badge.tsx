import { Accent, Spacing } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

type BadgeProps = {
  label: string;
  icon?: string;
};

export default function Badge({ label, icon }: BadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.label}>
        {icon ? `${icon} ${label}` : label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: Accent,
    borderRadius: 999,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
});
