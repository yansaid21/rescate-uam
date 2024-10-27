import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Input from '../atoms/Input';
import CustomButton from '../atoms/CustomButton';
import { useForm, Controller } from "react-hook-form";
import { router } from 'expo-router';
import ImageUploadComponent from '../atoms/ImageUploadComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserInfoComplete } from '../../auth/put';
import { zodResolver } from '@hookform/resolvers/zod';
import { CompleteRegisterScheme } from '../../schemes/completeRegisterScheme';
import { Picker } from '@react-native-picker/picker';
import * as Tokens from '../tokens';

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

    const { control, handleSubmit, formState: { errors }, setValue  } = useForm<FormData>({
        resolver: zodResolver(CompleteRegisterScheme), 
    });
    const onSubmit = async (data: FormData) => {
        console.log('data en complete register ', data);
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
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        >
        <ScrollView 
        contentContainerStyle={styles.container} 
        >
            <Modal
                transparent={true}
                visible={visible}
                animationType="slide"
                onRequestClose={onClose}
            >
                <View className='flex-1 justify-center items-center bg-black/50'>
                    <View className='w-[350px] p-5 bg-white rounded-lg items-center'>
                        <Text className='mb-5 text-4xl text-center text-[#0090D0]'>¡Completa tu registro!</Text>
                        <View className="mb-5 w-[300px] h-12 rounded-[20px] px-[2px] bg-[#D9D9D9]">
                            <Controller
                                control={control}
                                name="rhgb"
                                render={({ field: { onChange, value } }) => (
                                    <Picker
                                        selectedValue={value}
                                        onValueChange={onChange}
                                        prompt="Grupo sanguíneo"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            backgroundColor: 'transparent'
                                        }}
                                        dropdownIconColor="#000"
                                    >
                                        <Picker.Item label="Grupo sanguíneo" value=""  />
                                        <Picker.Item label="A+" value="A+" />
                                        <Picker.Item label="A-" value="A-" />
                                        <Picker.Item label="B+" value="B+" />
                                        <Picker.Item label="B-" value="B-" />
                                        <Picker.Item label="AB+" value="AB+" />
                                        <Picker.Item label="AB-" value="AB-" />
                                        <Picker.Item label="O+" value="O+" />
                                        <Picker.Item label="O-" value="O-" />
                                    </Picker>
                                )}
                            />
                        </View>
                        {errors.rhgb && <Text className="text-red-500 text-left">{errors.rhgb.message}</Text>}
                        <View className="mb-5">
                            <Controller
                                control={control}
                                name="phone_number"
                                render={({ field: { onChange } }) => (
                                    <>
                                    <Input
                                        text="Celular"
                                        onChangeText={onChange} 
                                        keyboardType="numeric"
                                        />
                                    </>
                                )}
                            />
                            {errors.phone_number && <Text className="text-red-500">{errors.phone_number.message}</Text>}
                        </View>
                        <View className="mb-5">
                            <Controller
                                control={control}
                                name="social_security"
                                render={({ field: { onChange } }) => (
                                    <>
                                    <Input
                                        text="EPS"
                                        onChangeText={onChange} 
                                        autoCapitalize="sentences"
                                    />
                                    </>
                                )}
                            />
                            {errors.social_security && <Text className="text-red-500">{errors.social_security.message}</Text>}
                        </View>
                        <View className="mb-5">
                            <Controller
                                control={control}
                                name="code"
                                render={({ field: { onChange } }) => (
                                    <>
                                        <Input
                                            text="Código UAM"
                                            onChangeText={onChange} 
                                        />
                                    </>
                                )}
                            />
                            {errors.social_security && <Text className="text-red-500">{errors.social_security.message}</Text>}
                        </View>
                        <ImageUploadComponent onImageSelect={handleImageSelect}/>
                        {errors.photo_path && <Text className="text-red-500 mb-5">{errors.photo_path.message}</Text>}
                        <CustomButton 
                            text="Aceptar" 
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </View>
            </Modal>
        </ScrollView>
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

export default CompleteRegister;
