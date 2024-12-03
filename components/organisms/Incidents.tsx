import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../atoms/CustomButton';
import * as Tokens from '../tokens';
import { zodResolver } from '@hookform/resolvers/zod';
import { IncidentScheme } from '../../schemes/incidentScheme';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateIncident } from '../../auth/incident';

interface IncidentModalProps {
    visible: boolean;
    onClose: () => void;
    risk: number;
}

interface FormData {
    description: string,
}

const Incidents: React.FC<IncidentModalProps> = ({ visible, onClose, risk }) => {

    const { control, handleSubmit, formState: { errors }  } = useForm<FormData>({
        resolver: zodResolver(IncidentScheme), 
        mode: "onChange",
    });

    const onSubmit = async (data: FormData) => {
        console.log('data en incident ', data);
        try {
            const token = await AsyncStorage.getItem('token'); 
            const id_incident = await AsyncStorage.getItem('id_incident'); 
            console.log('id_incident ', id_incident);
            
            if (token && id_incident) {
                const result = await updateIncident(1, risk,  data.description, token, id_incident);
                console.log('result in incident ', result);
                
                if (result) {
                    onClose();
                    router.push("/loggedIn/main");
                }
            }
        } catch (error: any) {
            console.log('en incident ', error);
        }
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
                            <Text className='mb-5 text-4xl text-center text-[#0090D0]'>¡Llena tu reporte!</Text>
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
    textArea: {
        textAlignVertical: 'top', 
        padding: 15
    },
})

export default Incidents;

