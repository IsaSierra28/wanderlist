import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const appName = "Wanderlist";

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome to {appName}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "600" },
});
