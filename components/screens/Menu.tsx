import { View, Text } from 'react-native'
import React from 'react'
import SectionMenu from '../atoms/SectionMenu'

export default function Menu() {
  
  return (
    <View>
      <SectionMenu color="#000000" text="Administradores/Brigadistas" href="/loggedIn/main" logo="person"/>
      <SectionMenu color="#F4D73B" text="Incidentes" href="/loggedIn/incidents" logo="warning-amber"/>
      <SectionMenu color="#C20590" text="Protocolos" href="/loggedIn/createRisk" logo="warning"/>
      <SectionMenu color="#9CD04D" text="Puntos de encuentro" href="/loggedIn/meetPoints" logo="place"/>
      <SectionMenu color="#E36727" text="Estructura" href="/loggedIn/buildingStructure" logo="location-city"/>
    </View>
  )
}
