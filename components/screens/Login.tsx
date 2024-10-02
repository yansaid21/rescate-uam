import { View, Text, Image, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GoogleButton from "../atoms/GoogleButton";
import CustomButton from "../atoms/CustomButton";
import InputPassword from "../atoms/InputPassword";
import { Link } from "expo-router";
import Input from "../atoms/Input";
import { useState } from "react";
import { useRouter } from "expo-router";
import { loginUser } from "../../auth/auth";

export default function Login() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@autonoma\.([a-z]{2,})(\.[a-z]{2,})?$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async () => {  // Convertimos handleSubmit en una función asíncrona
        let isValid = true;

        // Validar el correo
        if (!validateEmail(email)) {
            setEmailError('Correo inválido');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (email.length === 0) {
            setEmailError('El correo es requerido');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (password.length === 0) {
            setPasswordError('La contraseña es requerida');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (isValid) {
            try {
                const data = await loginUser(email, password, "any");
                console.log("data que llega antes del if",data);
                
                if (data !=null) {
                    console.log("Inicio de sesión exitoso", data);
                    router.push("/loggedIn/main");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 30}
        >
            <Image
                className="w-52 h-24 mx-auto"
                source={require('../../assets/UAM/Logos_UAM-07.png')}
            />
            <ScrollView 
                contentContainerStyle={styles.container} 
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 flex-col justify-between items-center m-5 py-8">
                    <Image
                        className="w-52 h-24"
                        source={require('../../assets/UAM/Logos_UAM-07.png')}
                    />
                    <Text className="text-4xl text-center text-[#0090D0]">Bienvenido a Rescates UAM</Text>
                    <Input 
                        text="Correo"
                        value={email}
                        onChangeText={setEmail}    
                    />
                    {emailError ? <Text className="text-red-500">{emailError}</Text> : null}
                    <InputPassword 
                        text="Contraseña"
                        value={password}
                        onChangeText={setPassword}    
                    />
                    {passwordError ? <Text className="text-red-500">{passwordError}</Text> : null}
                    <CustomButton 
                        text="Aceptar" 
                        onPress={handleSubmit}
                    />
                    <Text className="text-lg text-center text-[#BDBDBD]">Entrar con</Text>
                    <GoogleButton />
                    <Link href='/loggedOut/register' className="text-lg text-center text-[#BDBDBD] underline">Registrarse</Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});
