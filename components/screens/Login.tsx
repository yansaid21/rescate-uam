import { View, Text, Image, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import GoogleButton from "../atoms/GoogleButton";

export default function Login() {
    const insets = useSafeAreaInsets();
    return (
        <View style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
            <Image
            style={styles.logo}
            source={require('../../assets/UAM/Logos_UAM-07.png')}/>
{/*             <Text style={{color: 'white'}}>Here is login</Text> */}
            <GoogleButton/>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
            flex:1,
            justifyContent:"center",
    },
    logo:{
    width:"auto",
    height:60}
})
