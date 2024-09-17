import { View, Text, Image } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import GoogleButton from "../atoms/GoogleButton";
import CustomButton from "../atoms/CustomButton";
import InputPassword from "../atoms/InputPassword";
import { Link } from "expo-router";
import Input from "../atoms/Input";

export default function Login() {
    const insets = useSafeAreaInsets();
    return (
        <View className="flex-1 flex-col justify-between items-center m-5">
            <Image
                className="w-52 h-24"
                source={require('../../assets/UAM/Logos_UAM-07.png')}
            />
            <Text className="text-4xl text-center text-[#0090D0]">Bienvenido a Rescates UAM</Text>
            <Input text="Correo"/>
            <InputPassword text="Contraseña"/>
            <CustomButton 
                text="Aceptar" 
                href="/loggedIn/main"
            />
            <Text className="text-lg text-center text-[#BDBDBD]">Entrar con</Text>
            <GoogleButton/>
            <Link href='/loggedOut/register' className="text-lg text-center text-[#BDBDBD] underline">Registrarse</Link>
        </View>
    )
}

