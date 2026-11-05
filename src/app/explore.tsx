import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { City, getCities, getWeather } from "../lib/api";

export default function Explore() {
    const [cities, setCities] = useState<City[]>([]);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            try {
                setCities(await getCities());
                try {
                    const weather = await getWeather(45.5, -73.6);
                    setTemperature(weather.current.temperature_2m);
                } catch {
                    setTemperature(null);
                }
            } catch {
                setError("Could not load cities. Check your internet connection and try again.");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size="large" />
                <Text style={styles.note}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.screen}>
                <Text style={styles.note}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            {temperature !== null ? (
                <Text style={styles.title}>Montreal now: {temperature} °C</Text>
            ) : (
                <Text style={styles.note}>Montreal weather unavailable</Text>
            )}
            <FlatList
                data={cities}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}, {item.country}</Text>
                        <Text style={styles.population}>
                            {item.population.toLocaleString()} people
                        </Text>
                        {item.region && <Text style={styles.population}>{item.region}</Text>}
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.empty}>No cities found</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    title: { fontSize: 24, fontWeight: "bold" },
    note: { color: "#666" },
    population: { color: "#666" },
    empty: { color: "#666", textAlign: "center" },
});
