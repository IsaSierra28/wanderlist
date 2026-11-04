import { Link } from "expo-router";
import { Button, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import PlaceCard from "../components/PlaceCard";
import { BottomTabInset } from "../constants/theme";
import { usePlaces } from "@/lib/places-context";

export default function Index() {
    const { places, clearPlaces } = usePlaces();

    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <FlatList
                data={[...places].sort((a, b) => a.name.localeCompare(b.name))}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <Link
                        href={{
                            pathname: "/place/[id]",
                            params: { id: item.id },
                        }}
                        asChild
                    >
                        <Pressable>
                            <PlaceCard place={item} />
                        </Pressable>
                    </Link>
                )}
                ListHeaderComponent={
                    <View style={styles.section}>
                        <Header title="Wanderlist" tagline="Places you want to see" />
                        <Image
                            source={{ uri: "https://picsum.photos/400/200" }}
                            style={styles.image}
                        />
                    </View>
                }
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={
                    <Text style={styles.empty}>No places yet - add one on the Add tab.</Text>
                }
                ListFooterComponent={
                    <View style={styles.section}>
                        <Text>{places.length} places</Text>
                        <Button title="Clear list" onPress={clearPlaces} />
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1 },
    list: {
        padding: 16,
        paddingBottom: BottomTabInset + 16,
        gap: 12,
    },
    section: { gap: 12 },
    image: { width: "100%", height: 140, borderRadius: 12 },
    empty: { color: "#666", textAlign: "center", marginTop: 24 },
    separator: { height: 1, backgroundColor: "#ddd" },
});
