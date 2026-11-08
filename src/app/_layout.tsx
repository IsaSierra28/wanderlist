import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router/js-tabs";
import { PlacesProvider } from "../lib/places-context";

export default function TabLayout() {
    return (
        <PlacesProvider>
            <Tabs screenOptions={{ tabBarActiveTintColor: "#548" }}>
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
                <Tabs.Screen
                    name="add"
                    options={{
                        title: "Add",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="add-circle" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: "Explore",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="compass" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: "Settings",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="settings" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen name="place/[id]" options={{ href: null, title: "Place" }} />
            </Tabs>
        </PlacesProvider>
    );
}
