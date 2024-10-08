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

interface FormData {
    email: string;
    password: string;
    repassword: string;
    id: string;
    name: string;
    lastname: string;
    isChecked: boolean;
}

const Register = () => {
    const router = useRouter();
    
    const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
    const [isChecked, setIsChecked] = useState(false);
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const onSubmit = async (data: FormData) => {
        setHasAttemptedSubmit(true); 
        if (!isChecked) {
            return; 
        }
        const users = await getAllUsers();

        // Verificar si el email o el id ya están registrados
        const userExists = users.some(
            (user: any) => user.email === data.email || user.id_card === Number(data.id)
        );

        if (userExists) {
            // Mostrar error si ya existe el usuario
            setErrorMessage("El usuario ya está registrado.");
            setModalVisible(true); // Si tienes un modal para errores
            return; // No continuar con el registro
        }
        try {
            const numericId = Number(data.id);
            let result = await registerUser(
                data.name,
                data.lastname,
                data.email,
                data.password,
                numericId,
                "O+",
                "1234567890",
                "3216549870",
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
            <Text className="text-4xl text-center text-[#0090D0] mb-[10px]">Regístrate en Rescates UAM</Text>
            <View className="mb-5">
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: 'El correo es requerido',
                        pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@autonoma\.([a-z]{2,})(\.[a-z]{2,})?$/,
                        message: 'Correo inválido',
                        },
                    }}
                    render={({ field: { onChange } }) => (
                        <>
                        <Input
                            text="Correo UAM"
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
                    rules={{ required: 'La contraseña es requerida', minLength: { value: 8, message: 'Mínimo 8 caracteres' } }}
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
            <View className="mb-5">
                <Controller
                    control={control}
                    name="repassword"
                    rules={{
                        required: 'La contraseña es requerida',
                        validate: value => value === watch('password') || 'Las contraseñas no coinciden'
                    }}
                    render={({ field: { onChange } }) => (
                        <>
                        <InputPassword
                            text="Repetir contraseña"
                            onChangeText={onChange}
                        />
                        {errors.repassword && <Text className="text-red-500">{errors.repassword.message}</Text>}
                        </>
                    )}
                />
            </View>
            <View className="mb-5">
                <Controller
                control={control}
                name="id"
                rules={{
                    required: 'La identificación es requerida',
                    pattern: {
                    value: /^[0-9]+$/,
                    message: 'La identificación debe contener solo números',
                    },
                }}
                render={({ field: { onChange } }) => (
                    <>
                    <Input
                        text="Cédula/Tarjeta de identidad"
                        onChangeText={onChange}
                    />
                    {errors.id && <Text className="text-red-500">{errors.id.message}</Text>}
                    </>
                )}
                />
            </View>
            <View className="mb-5">
                <Controller
                control={control}
                name="name"
                rules={{ required: 'El nombre es requerido', pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, message: 'El nombre solo debe contener letras' } }}
                render={({ field: { onChange } }) => (
                    <>
                    <Input
                        text="Nombre"
                        onChangeText={onChange}
                    />
                    {errors.name && <Text className="text-red-500">{errors.name.message}</Text>}
                    </>
                )}
                />
            </View>
            <View className="mb-5">
                <Controller
                    control={control}
                    name="lastname"
                    rules={{ required: 'El apellido es requerido', pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, message: 'El apellido solo debe contener letras' } }}
                    render={({ field: { onChange } }) => (
                        <>
                        <Input
                            text="Apellido"
                            onChangeText={onChange}
                        />
                        {errors.lastname && <Text className="text-red-500">{errors.lastname.message}</Text>}
                        </>
                    )}
                />
            </View>
            <View className="mb-5">
                <View className="flex-row items-center">
                    <Checkbox
                        status={isChecked ? 'checked' : 'unchecked'}
                        onPress={() => setIsChecked(!isChecked)}
                        color="#0090D0"
                    />
                    <Link className="text-sm underline text-[#0090D0]" href='/loggedOut/conditions'>
                        Términos y condiciones
                    </Link>
                </View>
                {!isChecked && hasAttemptedSubmit && (
                    <Text className="text-red-500">Debes aceptar los términos y condiciones</Text>
                )}
            </View>
            <View className="mb-5">
                <CustomButton 
                text="Registrarse" 
                onPress={handleSubmit(onSubmit)} 
                />
            </View>
            <Link href='/' className="text-lg text-center text-[#BDBDBD] underline">Iniciar Sesión</Link>
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
