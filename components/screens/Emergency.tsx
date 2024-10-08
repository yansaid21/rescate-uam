import { View, Text } from 'react-native';
import React from 'react';
import { BigEmergencyButton } from '../atoms/BigEmergencyButton';

export default function Emergency() {
  return (
    <View className="flex p-1 pt-7 bg-white justify-center items-center">
      <Text className="text-2xl font-bold mb-32">BIENVENIDO USUARIO</Text>

      <BigEmergencyButton 
        initialIsYellow={false}
        buttonWidth={150} 
        buttonHeight={150}
        buttonBorderRadius={75}
        logoWidth={100}
        logoHeight={120}
      />
      <Text className="text-2xl font-bold mt-5 mb-12">ESTOY A SALVO</Text>


      <BigEmergencyButton 
        initialIsYellow={true}
        buttonWidth={150} 
        buttonHeight={150}
        buttonBorderRadius={75}
        logoWidth={75}
        logoHeight={120}
      />
      <Text className="text-2xl font-bold mt-5">ESTOY EN PELIGRO</Text>
    </View>
  );
}
