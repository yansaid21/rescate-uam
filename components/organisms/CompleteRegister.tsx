import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Input from '../atoms/Input';
import CustomButton from '../atoms/CustomButton';
import { useForm, Controller } from "react-hook-form";
import { router } from 'expo-router';
import ImageUploadComponent from '../atoms/ImageUploadComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserInfoComplete } from '../../auth/put';
interface CompleteRegisterModalProps {
    visible: boolean;
    onClose: () => void;
}

interface FormData {
    rhgb: string,
    social_security: string,
    phone_number: Number,
    code: string,
    photo_path: string | null;
}

const CompleteRegister: React.FC<CompleteRegisterModalProps> = ({ visible, onClose }) => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
    const [imageError, setImageError] = useState<string | null>(null);

    const onSubmit = async (data: FormData) => {
        console.log('data en complete register ', data);
        
        if (!data.photo_path) {
            setImageError('La foto es obligatoria');
            return;
        }else{
            console.log("lo que llega porque si hay photo_path>>>>>>",data.photo_path);
            
        }
        try {
            const token = await AsyncStorage.getItem('token'); 
            const id_user = await AsyncStorage.getItem('id');
            if (token && id_user) {
                const result = await updateUserInfoComplete(Number(id_user), token, data);
                console.log('result in complete register ', result);
                
                if (result) {
                    router.push("/loggedIn/main");
                }
            }
        } catch (error: any) {
            console.log('en complete register ', error);
        }
    };

    const handleImageSelect = (imageUri: string) => {
        setValue('photo_path', imageUri); // Set image URI in form data
        setImageError(null); // Clear image error
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className='flex-1 justify-center items-center bg-black/50'>
                <View className='w-[350px] p-5 bg-white rounded-lg items-center'>
                    <Text className='mb-5 text-4xl text-center text-[#0090D0]'>¡Completa tu registro!</Text>
                    <View className="mb-5">
                        <Controller
                            control={control}
                            name="rhgb"
                            rules={{
                                required: 'Campo requerido',
                                pattern: {
                                    value: /^(A|B|AB|O)[+-]$/,
                                    message: 'Inválido',
                                }
                            }}
                            render={({ field: { onChange } }) => (
                                <>
                                <Input
                                    text="Grupo sanguíneo"
                                    onChangeText={onChange} 
                                    autoCapitalize="characters"
                                    />
                                {errors.rhgb && <Text className="text-red-500">{errors.rhgb.message}</Text>}
                                </>
                            )}
                            />
                    </View>
                    <View className="mb-5">
                        <Controller
                            control={control}
                            name="phone_number"
                            rules={{
                                required: 'Campo requerido',
                                pattern: {
                                value: /^[0-9]+$/,
                                message: 'Inválido',
                            }
                        }}
                        render={({ field: { onChange } }) => (
                                <>
                                <Input
                                    text="Celular"
                                    onChangeText={onChange} 
                                    />
                                {errors.phone_number && <Text className="text-red-500">{errors.phone_number.message}</Text>}
                                </>
                            )}
                            />
                    </View>
                    <View className="mb-5">
                        <Controller
                            control={control}
                            name="social_security"
                            rules={{
                                required: 'Campo requerido',
                                pattern: {
                                    value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                                message: 'Inválido',
                                }
                            }}
                            render={({ field: { onChange } }) => (
                                <>
                                <Input
                                    text="EPS"
                                    onChangeText={onChange} 
                                    autoCapitalize="sentences"
                                />
                                {errors.social_security && <Text className="text-red-500">{errors.social_security.message}</Text>}
                                </>
                            )}
                            />
                    </View>
                    <View className="mb-5">
                        <Controller
                            control={control}
                            name="code"
                            rules={{
                                required: 'Campo requerido',
                                pattern: {
                                    value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/,
                                    message: 'Inválido',
                                }
                            }}
                            render={({ field: { onChange } }) => (
                                <>
                                <Input
                                    text="Código UAM"
                                    onChangeText={onChange} 
                                />
                                {errors.social_security && <Text className="text-red-500">{errors.social_security.message}</Text>}
                                </>
                            )}
                            />
                    </View>
                    <ImageUploadComponent onImageSelect={handleImageSelect}/>
                    {imageError && <Text className="text-red-500">{imageError}</Text>}
                    <CustomButton 
                        text="Aceptar" 
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </View>
        </Modal>
    );
}

export default CompleteRegister;
