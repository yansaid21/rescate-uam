import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput } from 'react-native';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, View } from 'react-native';
import CustomButton from '../atoms/CustomButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiskScheme } from '../../schemes/riskScheme';
import * as Tokens from '../tokens';
import Spinner from "../molecules/Spinner";
import Input from '../atoms/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createRisk } from '../../auth/risks';
import { router } from 'expo-router';

interface RiskModalProps {
    visible: boolean;
    onClose: () => void;
}

interface FormData {
    name: string,
    description: string,
}

const Risk: React.FC<RiskModalProps> = ({visible, onClose}) => {
    //validaciones con el scheme
    const { control, handleSubmit, formState: { errors }  } = useForm<FormData>({
        resolver: zodResolver(RiskScheme), 
        mode: "onChange",
    });
    const [loading, setLoading] = useState(true);

    //crear situación de riesgo
    const onSubmit = async (data: FormData) => {
        console.log('data en risk ', data);
        try {
            const token = await AsyncStorage.getItem('token'); 
            if (token) {
                const result = await createRisk(1, data.name, data.description, token);
                console.log('result in risk ', result);
                
                if (result) {
                    onClose();
                    router.push("/loggedIn/main");
                }
            }
        } catch (error: any) {
            console.log('en risk ', error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        >
            <Modal
                transparent={true}
                visible={visible}
                animationType="slide"
                onRequestClose={onClose}
            >
                <View className='flex-1 justify-center items-center bg-black/50'>
                    <ScrollView 
                    contentContainerStyle={styles.container} 
                    >
                    <View className='w-[350px] p-5 bg-white rounded-[10px] items-center'>
                        <Text className='mb-5 text-4xl text-center text-[#0090D0]'>¡Añadir riesgo!</Text>
                        <View className="my-5">
                            <Controller
                                control={control}
                                name="name"
                                render={({ field: { onChange } }) => (
                                    <>
                                    <Input
                                        text="Nombre Riesgo"
                                        onChangeText={onChange} 
                                        autoCapitalize="sentences"
                                        />
                                    </>
                                )}
                            />
                            {errors.name && <Text className="text-red-500">{errors.name.message}</Text>}
                        </View>
                        <View className="mb-5 mt-5">
                            <Controller
                                control={control}
                                name="description"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholder="Descripción"
                                        placeholderTextColor={'#000000'}
                                        value={value}
                                        onChangeText={onChange}
                                        multiline
                                        style={styles.textArea}
                                        className={`${Tokens.TextAreaStyle}`}
                                    />
                                )}
                            />
                            {errors.description && <Text className="text-red-500">{errors.description.message}</Text>}
                        </View>
                        <View className='mb-5'>
                            <CustomButton 
                                text="Aceptar" 
                                onPress={handleSubmit(onSubmit)}
                            />
                        </View>
                        <View className='mb-3'>
                            <CustomButton 
                                text="Cancelar" 
                                onPress={onClose} 
                            />
                        </View>
                    </View>
                </ScrollView>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textArea: {
        textAlignVertical: 'top', 
        padding: 15
    },
})

export default Risk;
