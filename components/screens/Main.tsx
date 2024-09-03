import { Text, View } from "react-native"
import { Link } from "expo-router"
import EmergencyButton from "../atoms/EmergencyButton"

export default function Main() {
    return (
        <View>
            {/* <Text style={{color: 'black'}}>Main</Text>
            <Link href="/login">Login</Link> */}
            <EmergencyButton/>
        </View>
    )
}
