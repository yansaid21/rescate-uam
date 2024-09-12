import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import TypeEmergencyButton from "../atoms/TypeEmergencyButton";
import Navbar from "../molecules/Nav";
import { BigEmergencyButton } from "../atoms/BigEmergencyButton";
import RedBrigadistaButton from "../atoms/RedBrigadistaButton"
import ModBrigadistaButton from "../atoms/ModBrigadistaButton"

export default function Main() {
  return (
    <View className="h-full flex flex-col" >
        
      <StatusBar barStyle="light-content" backgroundColor="#0069A3" />
      <Navbar />
      <View className="flex justify-center align-center paddingTop:60">
        <BigEmergencyButton />
        <TypeEmergencyButton text="Evacuación" />
        <ModBrigadistaButton text = 'Tabla'/>
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
    paddingTop: 60, 
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
    borderBottomLeftRadius: 15,  
    borderBottomRightRadius: 15,
  },
});
