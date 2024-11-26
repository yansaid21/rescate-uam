import { View, Text } from 'react-native'
import React from 'react'
import SectionMenu from '../atoms/SectionMenu'


export default function RisksMenu = () => {
    <View>
            <SectionMenu color="#F4D73B" text="Añadir Riesgo" href="/loggedIn/main" logo="warning-amber"/>
            <SectionMenu color="#0090D0" text="Sismo" href="/loggedIn/main" logo="warning-amber"/>
            <SectionMenu color="#E36727" text="Incendio" href="/loggedIn/main" logo="warning-amber"/>
            <SectionMenu color="#9CD04D" text="Evacuacion" href="/loggedIn/meetPoints" logo="warning-amber"/>
    </View>
}