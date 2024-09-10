import { Text, View } from "react-native"
import { Link } from "expo-router"
import EmergencyButton from "../atoms/EmergencyButton"
import TypeEmergencyButton from "../atoms/TypeEmergencyButton"
import RedBrigadistaButton from "../atoms/RedBrigadistaButton"
import ModBrigadistaButton from "../atoms/ModBrigadistaButton"

export default function Main() {
    return (
        <View>
            {/* <Text style={{color: 'black'}}>Main</Text>
            <Link href="/login">Login</Link> */}
            {/* <EmergencyButton/> */}
            <TypeEmergencyButton text= 'Evacuación'/>
            <ModBrigadistaButton text = 'Tabla'/>

        </View>
    )
}
