import { Image, ScrollView, StyleSheet, View } from "react-native";
import PlaceCard from "@/components/PlaceCard";
import { ThemedText } from "@/components/themed-text";
import { BottomTabInset, Spacing } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const appName = "Wanderlist";

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="subtitle" style={styles.appName}>
            {appName}
          </ThemedText>
          <ThemedText type="small" style={styles.tagline}>
            Places I want to visit someday
          </ThemedText>
        </View>

        <Image
          source={{ uri: "https://picsum.photos/400/200" }}
          style={styles.image}
        />

        <PlaceCard name="Kyoto" category="City" notes="Temples in autumn" />
        <PlaceCard
          name="Banff"
          category="Nature"
          notes="Lake Louise at sunrise"
        />
        <PlaceCard name="Lisbon" category="Food" notes="Pasteis de nata tour" />
        <PlaceCard name="Pelotas" category="Food" notes="Barbeque" />
        <PlaceCard name="Toronto" category="City" notes="CN tower" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    gap: Spacing.three,
  },
  header: {
    backgroundColor: "#ff7a59",
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  appName: {
    color: "#fff",
  },
  tagline: {
    color: "#fff",
    opacity: 0.9,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 12,
  },
});
