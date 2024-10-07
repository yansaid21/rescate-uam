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
import { useForm, Controller } from "react-hook-form";

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
            const result = await loginUser(data.email, data.password, "any");
            if (result) {
                router.push("/loggedIn/main");
            }
        } catch (error: any) {
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
                <View className="flex-1 flex-col justify-between items-center m-5">
                    <View className="mb-5">
                        <Text className="text-4xl text-center text-[#0090D0] mb-10">Bienvenido a Rescates UAM</Text>
                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: 'El correo es requerido',
                                pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@autonoma\.([a-z]{2,})(\.[a-z]{2,})?$/,
                                message: 'Correo inválido',
                                }
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
