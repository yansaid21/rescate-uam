import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function GoogleButton() {
  return (
    <View className='flex-row items-center justify-center bg-[#fff] p-[10px] rounded-[10px]
                    border-[#D1D1D6] border-2  shadow-black w-[200px] shadow-2xl z-10'>
      <Image
        source={require('../../assets/google.png')}
        className='w-12 h-12 mr-2'
      />
      <Text className='text-base font-sans font-black'>Google</Text>
    </View>
  );
}
