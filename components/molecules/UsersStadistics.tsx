import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SectionUsers from '../atoms/SectionUsers'
import { Title } from 'react-native-paper';

interface UsersStadisticsProps {  
    titleText: string,
    }
  

export default function UsersStadistics ({titleText}: UsersStadisticsProps) {
    return (
      <View className='flex items-center justify-evenly p-8'>
        <Text style={styles.title}>{titleText}</Text>
        <SectionUsers number="500" text="sin reporte"  href="/loggedIn/crudBrigadist"  color="#575757"/>
        <SectionUsers number="70" text="a salvo"  href="/loggedIn/crudBrigadist"  color="#9CD04D"/>
        <SectionUsers number="10" text="en peligro"  href="/loggedIn/crudBrigadist"  color="#CE0071"/>
      </View>
    )
}
const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold', // Negrita
    fontSize: 24, // Tamaño de fuente similar a un h1
  },
});