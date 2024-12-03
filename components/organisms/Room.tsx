import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from '../atoms/CustomButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { RoomScheme } from '../../schemes/roomsScheme';
import Spinner from "../molecules/Spinner";
import Input from '../atoms/Input';
import { Picker } from '@react-native-picker/picker';
import * as Tokens from '../tokens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getZones } from '../../auth/zones';
import { createRoom } from '../../auth/room';
import { router } from 'expo-router';
import { getLevelsInfo } from '../../auth/levels';

interface RoomsModalProps {
    visible: boolean;
    onClose: () => void;
}

interface FormData {
    name: string,
    code: string,
    zones: string,
    levels: string,
    description: string,
}

const Room: React.FC<RoomsModalProps> = ({visible, onClose}) => {
    //evaluación del scheme
    const { control, handleSubmit, formState: { errors }  } = useForm<FormData>({
        resolver: zodResolver(RoomScheme), 
    });
    const [loading, setLoading] = useState(true);

    //obtener zonas
    const [zones, setZones] = useState([]);
    const fetchZones = async () => {
        setLoading(true); 
        console.log("estoy en fetchZones");
        
        try {
            const token = await AsyncStorage.getItem('token');
            console.log('token ', token);
            
            if (token) {
                const zonesData = await getZones(1, token);
                console.log('zones room ', zonesData.data);
                setZones(zonesData.data); 
            }
            console.log('zones ', zones);
            
        } catch (error) {
            console.log('Error al obtener zonas:', error);
        } finally {
            setLoading(false); 
        }
    };

    //obtener niveles
    const [levels, setLevels] = useState([]);
    const fetchLevels = async () => {
        setLoading(true); 
        console.log("estoy en fetchZones");
        
        try {
            const token = await AsyncStorage.getItem('token');
            console.log('token ', token);
            
            if (token) {
                const levelsData = await getLevelsInfo(1, token);
                console.log('levels room ', levelsData.data);
                setLevels(levelsData.data); 
            }
            console.log('levels ', levels);
            
        } catch (error) {
            console.log('Error al obtener zonas:', error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(()=>{
        fetchZones();   
        fetchLevels();
    }, [])

    //crear un salón
    const onSubmit = async (data: FormData) => {
        console.log('data en room ', data);
        try {
            const token = await AsyncStorage.getItem('token'); 
            if (token) {
                const zone_id = parseInt(data.zones);
                const level_id = parseInt(data.levels);
                const result = await createRoom(1, zone_id, level_id, data.name, data.code, data.description, token);
                console.log('result in room ', result);
                
                if (result) {
                    onClose();
                    router.push("/loggedIn/buildingStructure");
                }
            }
        } catch (error: any) {
            console.log('en room ', error);
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
                            <Text className='mb-5 text-4xl text-center text-[#0090D0]'>¡Añadir salón!</Text>
                            {loading ? ( // Mostrar indicador de carga
                                <Spinner />
                            ) : (
                                <>
                                <View className="my-5">
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
                                <View className="my-5">
                                    <Controller
                                        control={control}
                                        name="code"
                                        render={({ field: { onChange } }) => (
                                            <>
                                            <Input
                                                text="Código"
                                                onChangeText={onChange} 
                                                autoCapitalize="sentences"
                                                />
                                            </>
                                        )}
                                    />
                                    {errors.code && <Text className="text-red-500">{errors.code.message}</Text>}
                                </View>
                                <View style={Platform.OS === 'ios' ? styles.pickerContainerIos: styles.pickerContainerAndroid}>
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
                                            }
                                        }
                                        mode="dialog"
                                            prompt="Zona"
                                            style={{
                                                height: 100,
                                                width: '108%',
                                                backgroundColor: 'transparent',
                                                color: '#000',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                
                                            }}
                                            /* pickerStyleType={{"basic"}} */
                                            itemStyle={{
                                                color: '#000',
                                                textAlign: 'center',
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
                            <View style={Platform.OS === 'ios' ? styles.pickerContainerIos: styles.pickerContainerAndroid}>
                                <Controller
                                    control={control}
                                    name="levels"
                                    render={({ field: { onChange, value } }) => (
                                        <Picker
                                            selectedValue={value}
                                            onValueChange={(itemValue) => {
                                                if (itemValue === "add_level") {
                                                    onClose();
                                                    // Lógica para abrir la vista/agregar zona
                                                } else {
                                                    onChange(itemValue);
                                                }
                                            }
                                        }
                                        mode="dialog"
                                            prompt="Nivel"
                                            style={{
                                                height: 100,
                                                width: '108%',
                                                backgroundColor: 'transparent',
                                                color: '#000',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                
                                            }}
                                            /* pickerStyleType={{"basic"}} */
                                            itemStyle={{
                                                color: '#000',
                                                textAlign: 'center',
                                            }}
                                            dropdownIconColor="#000"
                                        >
                                            {levels.length >0 ? (
                                                levels.map((level: any) => (
                                                    <Picker.Item key={level.id} label={level.name} value={level.id.toString()} />
                                                ))
                                            ) : (
                                                <Picker.Item label="Agregar nivel" value="add_level" />
                                            )}
                                        </Picker>
                                    )}
                                />
                            {errors.levels && <Text className="text-red-500 text-left">{errors.levels.message}</Text>}
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
    pickerContainerIos:{
        marginVertical: 40, 
        width: 300,         
        height: 50,         
        borderRadius: 10,   
        paddingHorizontal: 2, 
        backgroundColor: '#D9D9D9', 
        display: 'flex',    
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    pickerContainerAndroid:{
        marginVertical: 8, 
        width: 300,         
        height: 50,         
        borderRadius: 10,   
        paddingHorizontal: 2, 
        backgroundColor: '#D9D9D9', 
        display: 'flex',    
        justifyContent: 'center', 
        alignItems: 'center', 
    }
})

export default Room;
