import { View, Text, Image, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Modal, Button, Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
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
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@autonoma\.([a-z]{2,})(\.[a-z]{2,})?$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async () => {
        let isValid = true;

        // Validar el correo
        if (!validateEmail(email)) {
            setEmailError('Correo inválido');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (email.length === 0) {
            setEmailError('La contraseña es requerida');
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
                console.log('data error ', data.error);
                
                if (data == undefined) {
                } else {
                    console.log("Inicio de sesión exitoso", data);
                    router.push("/loggedIn/main");
                }
            } catch (error:any) {
                setErrorMessage(error.message);
                setModalVisible(true);
                console.error("Error:", error);
            }
        }
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Diferente comportamiento en iOS vs Android
        >
            <Image
                className="w-52 h-24 mx-auto"
                source={require('../../assets/UAM/Logos_UAM-07.png')}
            />
            <ScrollView 
                contentContainerStyle={styles.container} 
            >
                <View className="flex-1 flex-col justify-between items-center m-5">
                    <View className="mb-5">
                        <Text className="text-4xl text-center text-[#0090D0] mb-10">Bienvenido a Rescates UAM</Text>
                        <Input 
                            text="Correo"
                            value={email}
                            onChangeText={setEmail}    
                        />
                        {emailError ? <Text className="text-red-500">{emailError}</Text> : null}
                    </View>
                    <View className="mb-5">
                        <InputPassword 
                            text="Contraseña"
                            value={password}
                            onChangeText={setPassword}    
                        />
                        {passwordError ? <Text className="text-red-500">{passwordError}</Text> : null}
                    </View>
                    <CustomButton 
                        text="Aceptar" 
                        onPress={handleSubmit}
                        />
                    <Text className="text-lg text-center text-[#BDBDBD]">Entrar con</Text>
                    <GoogleButton/>
                    <Link href='/loggedOut/register' className="text-lg text-center text-[#BDBDBD] underline">Registrarse</Link>
                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        animationType="slide"
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View className='flex-1 justify-center items-center bg-black/50'>
                            <View className='w-72 p-5 bg-white rounded-lg items-center'>
                                <Text className='mb-4 text-lg text-center'>
                                    {errorMessage}
                                </Text>
                                <Pressable 
                                    onPress={() => setModalVisible(false)}
                                    className='p-[10px] rounded-[19px] w-[212px] h-[49px] bg-[#0069A3] justify-center items-center'
                                >
                                    <Text className='text-white text-lg'>Cerrar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
    }
});
