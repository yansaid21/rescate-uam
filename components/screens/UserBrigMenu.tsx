import { View, Text } from 'react-native'
import React from 'react'
import SectionMenu from '../atoms/SectionMenu'

export default function UserBrigMenu() {
  
  return (
    <View>
      <SectionMenu color="#000000" text="Brigadistas" href="/loggedIn/main" logo="person"/>
      <SectionMenu color="#F4D73B" text="Indicaciones antes" href="/loggedIn/incidents" logo="warning-amber"/>
      <SectionMenu color="#C20590" text="Indicaciones durante" href="/loggedIn/risksMenu" logo="warning-amber"/>
      <SectionMenu color="#9CD04D" text="Indicaciones a salvo" href="/loggedIn/meetPoints" logo="warning-amber"/>
    </View>
  )
}