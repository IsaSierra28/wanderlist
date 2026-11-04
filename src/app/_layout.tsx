import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router/js-tabs";
import { PlacesProvider } from "../lib/places-context";

export default function TabLayout() {
    return (
        <PlacesProvider>
            <Tabs>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Places",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="cloud" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen name="add" options={{ title: "Add" }} />
                <Tabs.Screen name="explore" options={{ title: "Explore" }} />
                <Tabs.Screen name="settings" options={{ title: "Settings" }} />
                <Tabs.Screen name="place/[id]" options={{ href: null, title: "Place" }} />
            </Tabs>
        </PlacesProvider>
    );
}
