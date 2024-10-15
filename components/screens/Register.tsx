import React, { useState } from 'react';
import { Image, View, Text, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import Input from '../atoms/Input';
import InputPassword from '../atoms/InputPassword';
import CustomButton from '../atoms/CustomButton';
import { Checkbox } from 'react-native-paper'; 
import { Link } from 'expo-router';
import { useRouter } from "expo-router";
import { useForm, Controller } from 'react-hook-form'; 
import { registerUser } from '../../auth/register';
import { getAllUsers } from '../../auth/get';
import ErrorModal from '../molecules/ErrorModal';
import * as Tokens from '../tokens';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterScheme } from '../../schemes/registerScheme';

interface FormData {
    email: string;
    password: string;
    repassword: string;
    id: string;
    name: string;
    lastname: string;
    termsAccepted: boolean;
}

const Register = () => {
    const router = useRouter();
    
    const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
        resolver: zodResolver(RegisterScheme), 
        defaultValues: {
            termsAccepted: false,
        }
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const onSubmit = async (data: FormData) => {
        const users = await getAllUsers();
        
        const userExists = users.some(
            (user: any) => user.email === data.email || user.id_card === Number(data.id)
        );

        if (userExists) {
            console.log('user exists ', userExists);
            
            setErrorMessage("El usuario ya está registrado.");
            setModalVisible(true); 
            return; 
        }
        try {
            const numericId = Number(data.id);
            let result = await registerUser(
                data.name,
                data.lastname,
                data.email,
                data.password,
                numericId,
                1,
                "XYZ123"
            );

            if (result) {
                router.push("/");
            }
        } catch (error: any) {
            console.log("Error al registrar", error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        >
        <View className="flex-1 flex-col justify-between items-center m-5">
            <Image
                className="w-52 h-24"
                source={require('../../assets/UAM/Logos_UAM-07.png')}
            />
            <ScrollView 
                contentContainerStyle={styles.container} 
            >
            <Text className={`${Tokens.textTitleStyle}`}>Regístrate en Rescates UAM</Text>
            <View className="mb-5">
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange } }) => (
                        <>
                            <Input
                                text="Correo UAM"
                                onChangeText={onChange}
                                autoCapitalize="none"
                            />
                        </>
                    )}
                />
                {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
            </View>
            <View className="mb-5">
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange } }) => (
                        <>
                            <InputPassword
                                text="Contraseña"
                                onChangeText={onChange}
                            />
                        </>
                    )}
                />
                {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
            </View>
            <View className="mb-5">
                <Controller
                    control={control}
                    name="repassword"
                    render={({ field: { onChange } }) => (
                        <>
                            <InputPassword
                                text="Repetir contraseña"
                                onChangeText={onChange}
                            />
                        </>
                    )}
                />
                {errors.repassword && <Text className="text-red-500">{errors.repassword.message}</Text>}
            </View>
            <View className="mb-5">
                <Controller
                control={control}
                name="id"
                render={({ field: { onChange } }) => (
                    <>
                        <Input
                            text="Cédula/Tarjeta de identidad"
                            onChangeText={onChange}
                            autoCapitalize="none"
                        />
                    </>
                )}
            />
            {errors.id && <Text className="text-red-500">{errors.id.message}</Text>}
            </View>
            <View className="mb-5">
                <Controller
                control={control}
                name="name"
                render={({ field: { onChange } }) => (
                    <>
                        <Input
                            text="Nombre"
                            onChangeText={onChange}
                            autoCapitalize="sentences"
                        />
                    </>
                )}
            />
            {errors.name && <Text className="text-red-500">{errors.name.message}</Text>}
            </View>
            <View className="mb-5">
                <Controller
                    control={control}
                    name="lastname"
                    render={({ field: { onChange } }) => (
                        <>
                            <Input
                                text="Apellido"
                                onChangeText={onChange}
                                autoCapitalize="sentences"
                            />
                        </>
                    )}
                />
                {errors.lastname && <Text className="text-red-500">{errors.lastname.message}</Text>}
            </View>
            <View className="mb-5">
                <View className="flex-row items-center">
                    <Controller
                        control={control}
                        name="termsAccepted"
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Checkbox
                                    status={value ? 'checked' : 'unchecked'}
                                    onPress={() => onChange(!value)}
                                    color="#0090D0"
                                />
                                <Link className="text-sm underline text-[#0090D0]" href='/loggedOut/conditions'>
                                    Términos y condiciones
                                </Link>
                            </>
                        )}
                    />
                </View>
                {errors.termsAccepted && <Text className="text-red-500">{errors.termsAccepted.message}</Text>}
            </View>
            <View className="mb-5">
                <CustomButton 
                text="Registrarse" 
                onPress={handleSubmit(onSubmit)} 
                />
            </View>
            <Link href='/' className={`${Tokens.textLinkStyle}`}>Iniciar Sesión</Link>
            <ErrorModal 
                visible={modalVisible} 
                errorMessage={errorMessage} 
                onClose={() => setModalVisible(false)} 
            />
            </ScrollView>
        </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Register;
