import PlaceCard from "@/components/PlaceCard";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Spacing } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.appName}>Wanderlist</Text>
      <Text style={styles.tagline}>Places you want to see</Text>
    </View>
  );
}

export default function Index() {
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header />
        <Image
          source={{ uri: "https://picsum.photos/id/40/1000/600" }}
          style={{
            width: "100%",
            height: 140,
            borderRadius: 12,
          }}
        />

        <PlaceCard name="Kyoto" category="City" notes="Temples in autumn" />
        <PlaceCard
          name="Banff"
          category="Nature"
          notes="Lake Louise at sunrise"
        />
        <PlaceCard name="Lisbon" category="Food" notes="Pasteis de nata tour" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.three,
    gap: Spacing.three,
  },
  header: { paddingVertical: 24, alignItems: "center" },
  appName: { fontSize: 28, fontWeight: "700" },
  tagline: { fontSize: 14, color: "#548" },
});
