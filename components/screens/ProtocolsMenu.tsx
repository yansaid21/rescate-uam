import { View, Text } from 'react-native'
import React from 'react'
import SectionMenu from '../atoms/SectionMenu'

export default function ProtocolsMenu() {

    return (
        <View>
        <SectionMenu color="#0090D0" text="Añadir protocolo" href="/loggedIn/main" logo="warning-amber"/>
        <SectionMenu color="#0090D0" text="Modificar indicaciones Antes" href="/loggedIn/main" logo="warning-amber"/>
        <SectionMenu color="#E36727" text="Modificar indicaciones Durante" href="/loggedIn/main" logo="warning-amber"/>
        <SectionMenu color="#9CD04D" text="Modificar indicaciones a Salvo" href="/loggedIn/meetPoints" logo="warning-amber"/>
        <SectionMenu color="#CE0071" text="Modificar indicaciones en Peligro" href="/loggedIn/main" logo="warning-amber"/>
        </View>
    )
}
