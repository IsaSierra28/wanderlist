import PlaceCard from "@/components/PlaceCard";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const appName = "Wanderlist";

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to {appName}!</Text>
        </View>
        <Image
          source={{ uri: "https://picsum.photos/id/40/1000/600" }}
          style={{
            width: "93%",
            height: 140,
            borderRadius: 12,
            alignSelf: "center",
            marginTop: 16,
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
  content: { paddingVertical: 24 },
  header: { alignItems: "center" },
  title: { fontSize: 24, fontWeight: "600" },
});
