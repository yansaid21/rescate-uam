import React from "react";
import { StyleSheet, View } from "react-native";
import TypeEmergencyButton from "../atoms/TypeEmergencyButton";
import { BigEmergencyButton } from "../atoms/BigEmergencyButton";

export default function Main() {
  return (
    <View className="h-full">
      <View className="justify-center items-center pt-12">
        <View className="pb-4">
          <BigEmergencyButton
            initialIsYellow={false} 
            buttonWidth={250} 
            buttonHeight={250} 
            buttonBorderRadius={125} 
            logoWidth={100} 
            logoHeight={150} 
          />
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
