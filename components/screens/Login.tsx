import { View, Text, Image, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Modal, Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import CustomButton from "../atoms/CustomButton";
import InputPassword from "../atoms/InputPassword";
import { Link } from "expo-router";
import Input from "../atoms/Input";
import { useState } from "react";
import { useRouter } from "expo-router";
import { loginUser } from "../../auth/auth";
import { useForm, Controller } from "react-hook-form";
import ErrorModal from "../molecules/ErrorModal";

interface FormData {
    email: string;
    password: string;
}

export default function Login() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            let email = data.email;
            const domain = '@autonoma.edu.co';
    
            // Si el correo no contiene el dominio, se lo añadimos
            if (!email.includes(domain)) {
                email += domain;
            }
    
            // Realiza el login con el correo completo
            const result = await loginUser(email, data.password, "any");
            
            if (result) {
                const userRole = result.user.role_id;

                switch (userRole) {
                    case 1: // Administrator
                        router.push("/loggedIn/main");
                        break;
                    case 2: // Brigadier
                        router.push("/loggedIn/emergency");
                        break;
                    case 3: // Final User
                        router.push("/loggedIn/emergency");
                        break;
                    default:
                        router.push("/loggedIn/emergency");
                        break;
                }
            }
        } catch (error: any) {
            console.log('en login ', error);
            setErrorMessage(error.message);
            setModalVisible(true);
        }
    };
    

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        >
            <Image
                className="w-52 h-24 mx-auto"
                source={require('../../assets/UAM/Logos_UAM-07.png')}
            />
            <ScrollView 
                contentContainerStyle={styles.container} 
            >
                <View className="flex-1 flex-col justify-evenly items-center m-20">
                    <View className="mb-5">
                        <Text className="text-4xl text-center text-[#0090D0] mb-10">Bienvenido a Rescates UAM</Text>
                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: 'El correo es requerido',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+(@autonoma\.([a-z]{2,})(\.[a-z]{2,})?)?$/,
                                    message: 'Correo inválido',
                                },
                            }}
                            render={({ field: { onChange } }) => (
                                <>
                                    <Input
                                        text="Correo"
                                        onChangeText={onChange} 
                                    />
                                    {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
                                </>
                            )}
                        />
                    </View>
                    <View className="mb-5">
                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: 'La contraseña es requerida' }}
                        render={({ field: { onChange } }) => (
                            <>
                            <InputPassword
                                text="Contraseña"
                                onChangeText={onChange}
                            />
                            {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
                            </>
                        )}
                        />
                    </View>
                    <CustomButton 
                        text="Aceptar" 
                        onPress={handleSubmit(onSubmit)}
                        />
                    <Link href='/loggedOut/register' className="text-lg text-center text-[#BDBDBD] underline">Registrarse</Link>
                    <ErrorModal 
                        visible={modalVisible} 
                        errorMessage={errorMessage} 
                        onClose={() => setModalVisible(false)} 
                    />
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
