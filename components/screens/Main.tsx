import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import TypeEmergencyButton from "../atoms/TypeEmergencyButton";
import Navbar from "../molecules/Nav";
import { BigEmergencyButton } from "../atoms/BigEmergencyButton";


export default function Main() {
  return (
    <View style={styles.container}>
        <View style={{backgroundColor: "#0069A3"}}>
      <StatusBar barStyle="light-content" backgroundColor="#0069A3" />
      <Navbar />
        </View>
      <View style={styles.content}>
        <BigEmergencyButton />
        <TypeEmergencyButton text="Evacuación" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60, // Ajusta para que el contenido no se superponga con el navbar
  },
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#444444',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
