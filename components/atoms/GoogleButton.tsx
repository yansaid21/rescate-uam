import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function GoogleButton() {
  return (
    <View className='flex-row items-center justify-center bg-[#fff] p-[10px] rounded-[10px] border-gray-400
                    shadow-black w-[200px]'>
      <Image
        source={require('../../assets/google.png')}
        className='w-12 h-12 mr-2'
      />
      <Text className='text-base font-sans font-black'>Google</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#fff',
    padding: 10, 
    borderRadius: 10, 
    borderColor: "gray",
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    elevation: 5, 
    width: 200
  },
});
