import { View, Text, Image, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import GoogleButton from "../atoms/GoogleButton";
import CustomButton from "../atoms/CustomButton";
import InputPassword from "../atoms/InputPassword";
import { Link } from "expo-router";
import Input from "../atoms/Input";


export default function Login() {
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/UAM/Logos_UAM-07.png')}
            />
            <Text style={styles.title}>Bienvenido a Rescates UAM</Text>
            <Input text="Correo"/>
            <InputPassword/>
            <CustomButton 
                text="Aceptar" 
                customFun={() => alert('Button Pressed!')} 
                color="#0069A3" 
            />
            <Text style={styles.text}>Entrar con</Text>
            <GoogleButton/>
            <Link href='/Register' style={styles.register}>Registrarse</Link>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
            flex:1,
            justifyContent:"space-between",
            flexDirection: "column",
            alignItems: 'center',
            margin: 20
    },
    logo:{
        width:"auto",
        height: 100
    },
    title:{
        fontFamily: 'Fira Sans',
        fontSize: 36,
        textAlign: 'center',
        color: '#0090D0'
    },
    input: {
        height: 48,
        width: 280,
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 15,
    },
    btn:{
        justifyContent: 'center'
    },
    text:{
        fontSize: 18,
        textAlign: 'center',
        color: '#BDBDBD'
    },
    register:{
        fontSize: 18,
        textAlign: 'center',
        color: '#BDBDBD',
        textDecorationLine: 'underline'
    }
})
