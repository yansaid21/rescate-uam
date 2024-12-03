// Login.tsx
import { View, Text, Image, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native"
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
import * as Tokens from '../tokens';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginScheme } from "../../schemes/loginScheme";
import Spinner from "../molecules/Spinner";
import { getAllUsers } from "../../auth/get"; 

interface FormData {
    email: string;
    password: string;
}

export default function Login() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(LoginScheme)
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            let email = data.email;
            const domain = '@autonoma.edu.co';

            if (!email.includes(domain)) {
                email += domain;
            }

            const result = await loginUser(email, data.password, "any");
            
            if (result) {
                const users = await getAllUsers();
                
                const currentUser = users.find((user) => user.email === email);

                if (currentUser) {
                    const userRole = currentUser.role.id;

                    switch (userRole) {
                        case 1: 
                            router.push("/loggedIn/main");
                            break;
                        case 2:
                            router.push("/loggedIn/emergency");
                        case 3:
                            router.push("/loggedIn/emergency");
                            break;
                        default:
                            router.push("/loggedIn/emergency");
                            break;
                    }
                } else {
                    setErrorMessage("Usuario no encontrado.");
                    setModalVisible(true);
                }
                setIsLoading(false);
            }
        } catch (error: any) {
            setIsLoading(false);
            console.log('en login ', error);
            setErrorMessage(error.message);
            setModalVisible(true);
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

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
                        <Text className={`${Tokens.textTitleStyle}`}>Bienvenido a Rescates UAM</Text>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange } }) => (
                                <Input
                                    text="Correo"
                                    onChangeText={onChange}
                                    autoCapitalize="none"
                                />
                            )}
                        />
                        {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
                    </View>
                    <View className="mb-5">
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange } }) => (
                                <InputPassword
                                    text="Contraseña"
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
                    </View>
                    <CustomButton 
                        text="Aceptar" 
                        onPress={handleSubmit(onSubmit)}
                    />
                    <Link href='/loggedOut/register' className={`${Tokens.textLinkStyle}`}>Registrarse</Link>
                    <ErrorModal 
                        visible={modalVisible} 
                        errorMessage={errorMessage} 
                        onClose={() => setModalVisible(false)} 
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
    }
});
