import { DarkTheme, DefaultTheme, Tabs, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { PlacesProvider } from '@/lib/places-context';


SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>   
      <AnimatedSplashOverlay />
      <PlacesProvider>
      <Tabs>
        <Tabs.Screen name="index" options={{ title: "Places", headerShown: false }} />
        <Tabs.Screen name="add" options={{ title: "Add" }} />
        <Tabs.Screen name="explore" options={{ title: "Explore" }} />
        <Tabs.Screen name="settings" options={{ title: "Settings"}} />
      </Tabs>
      </PlacesProvider>

    </ThemeProvider>
  );
}
