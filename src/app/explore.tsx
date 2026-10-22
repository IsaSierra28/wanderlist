import { StyleSheet, Text, View } from "react-native";
export default function Explore(){
  return (
 <View style={styles.screen}>
  <Text style={styles.title}>Explore</Text>
  <Text style={styles.note}>Live data arrives in Week 6.</Text>
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
title: {fontSize: 24, fontWeight: "bold"},
note: {color: "#666"},
});