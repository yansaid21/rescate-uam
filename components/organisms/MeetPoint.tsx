import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Input from '../atoms/Input';
import CustomButton from '../atoms/CustomButton';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MeetPointScheme } from '../../schemes/meetPointsScheme';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMeetPoint } from '../../auth/meetPoint';
import { getZones } from '../../auth/zones';
import Spinner from "../molecules/Spinner";
import * as Tokens from '../tokens';

interface MeetPointsModalProps {
    visible: boolean;
    onClose: () => void;
}

interface FormData {
    name: string,
    zones: string,
    description: string,
}

const MeetPoint: React.FC<MeetPointsModalProps> = ({ visible, onClose }) => {
    const { control, handleSubmit, formState: { errors }  } = useForm<FormData>({
        resolver: zodResolver(MeetPointScheme), 
    });
    const [loading, setLoading] = useState(true);
    
    const [zones, setZones] = useState([]);
    const fetchZones = async () => {
        setLoading(true); 
        console.log("estoy en fetchZones");
        
        try {
            const token = await AsyncStorage.getItem('token');
            console.log('token ', token);
            
            if (token) {
                const zonesData = await getZones(1, token);
                console.log('zones meetpoints ', zonesData.data);
                setZones(zonesData.data); 
            }
            console.log('zones ', zones);
            
        } catch (error) {
            console.log('Error al obtener zonas:', error);
        } finally {
            setLoading(false); 
        }
    };
    
    useEffect(()=>{

            fetchZones();   
    }, [])

    const onSubmit = async (data: FormData) => {
        console.log('data en meet point ', data);
        try {
            const token = await AsyncStorage.getItem('token'); 
            if (token) {
                const result = await createMeetPoint(1, data.name, parseInt(data.zones), data.description, token);
                console.log('result in meet point ', result);
                
                if (result) {
                    onClose();
                    router.push("/loggedIn/meetPoints");
                }
            }
        } catch (error: any) {
            console.log('en meet point ', error);
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
                        <Text className='mb-5 text-4xl text-center text-[#0090D0]'>¡Añadir punto de encuentro!</Text>
                        {loading ? ( // Mostrar indicador de carga
                            <Spinner/>
                        ) : (
                            <>
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
                        <View className="mb-5 w-[300px] h-12 rounded-[20px] px-[2px] bg-[#D9D9D9]">
                            <Controller
                                control={control}
                                name="zones"
                                render={({ field: { onChange, value } }) => (
                                    <Picker
                                        selectedValue={value}
                                        onValueChange={(itemValue) => {
                                            if (itemValue === "add_zone") {
                                                onClose();
                                                // Lógica para abrir la vista/agregar zona
                                            } else {
                                                onChange(itemValue);
                                            }
                                        }}
                                        prompt="Zona"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            backgroundColor: 'transparent'
                                        }}
                                        dropdownIconColor="#000"
                                    >
                                        {zones.length >0 ? (
                                            zones.map((zone: any) => (
                                                <Picker.Item key={zone.id} label={zone.name} value={zone.id.toString()} />
                                            ))
                                        ) : (
                                            <Picker.Item label="Agregar zona" value="add_zone" />
                                        )}
                                    </Picker>
                                )}
                            />
                        {errors.zones && <Text className="text-red-500 text-left">{errors.zones.message}</Text>}
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
                        </>
                    )}
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
});

export default MeetPoint;

