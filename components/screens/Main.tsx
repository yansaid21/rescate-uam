import React from "react";
import { StyleSheet, View, StatusBar,SafeAreaView } from "react-native";
import TypeEmergencyButton from "../atoms/TypeEmergencyButton";
import Navbar from "../molecules/Nav";
import { BigEmergencyButton } from "../atoms/BigEmergencyButton";
import RedBrigadistaButton from "../atoms/RedBrigadistaButton"
import ModBrigadistaButton from "../atoms/ModBrigadistaButton"

export default function Main() {
  return (
    <View className="h-full " >  
      
      <View className=" justify-center items-center pt-12">
        <View className="pb-4" >
        <BigEmergencyButton/>
        </View>
        <View className="p-5">
        <TypeEmergencyButton text="Evacuación" />
        </View>
        <View className="p-5">
        <TypeEmergencyButton text="Incendio" />
        </View>
        <View className="p-5">
        <TypeEmergencyButton text="Sismo" />
        </View>
      </View>
    </View>
  );
}
