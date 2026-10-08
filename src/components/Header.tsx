import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
  title: string;
  tagline: string;
};

export default function Header({ title, tagline }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.tagline}>{tagline}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingVertical: 24, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "700" },
  tagline: { fontSize: 14, color: "#548" },
});
