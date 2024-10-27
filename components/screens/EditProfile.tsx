import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Input from '../atoms/Input';
import CustomButton from '../atoms/CustomButton';
import { getUserInfo } from '../../auth/get';
import { updateUserInfo, updateUserInfoWithoutEmail } from '../../auth/put'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_IP } from '../../utils/constants';
import { ProfileIcon } from '../atoms/Icons';
import { set } from 'react-hook-form';
import Spinner from '../molecules/Spinner';

const EditProfile = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [id, setId] = useState('');
    const [dif, setDif] = useState(false);
    const [loadedEmail, setLoadedEmail] = useState(false); // Para manejar el estado inicial de la carga del email
    const [photo, setPhoto] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = await AsyncStorage.getItem('token'); 
                const id_user = await AsyncStorage.getItem('id'); 

                if (token && id_user) {
                    const user = await getUserInfo(Number(id_user), token); 
                    if (user && user.data) {
                        const fetchedEmail = user.data.email;

                        // Verificar si ya cargamos el email inicial
                        if (!loadedEmail) {
                            setEmail(fetchedEmail);
                            setLoadedEmail(true); // Marcar como cargado
                        } else if (fetchedEmail !== email) {
                            setEmail(fetchedEmail);
                            setDif(true);  // Actualiza `dif` solo si el email es diferente
                        } else {
                            setDif(false); // No se requiere actualización si el email es el mismo
                        }

                        setName(user.data.name);
                        setLastname(user.data.last_name);
                        setId(user.data.id_card.toString()); 

                        if (user.data.photo_path) {
                            const photoUri = user.data.photo_path.replace(/\\/g, '/');  // Reemplazar las barras invertidas por barras normales
                            console.log('photoUri ', photoUri);
                            setPhoto(photoUri);  // Guardar la URL de la imagen en el estado
                        }
                        setIsLoading(false);
                        
                    }
                }
            } catch (error) {
                console.error("Error get info user: ", error);
            }
        };

        fetchUserInfo();
    }, [loadedEmail, email]); // Añadido email y loadedEmail como dependencias para evitar bucles infinitos

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('token'); 
            const id_user = await AsyncStorage.getItem('id'); 

            if (token && id_user) {
                const userData = {
                    email,
                    name,
                    last_name: lastname,
                    id_card: id
                };

                

                let response;
                if (dif) {
                    console.log("Actualizando con email");
                    response = await updateUserInfo(Number(id_user), token, userData);
                } else {
                    console.log("Actualizando sin email");
                    response = await updateUserInfoWithoutEmail(Number(id_user), token, userData);
                }

                if (response) {
                    Alert.alert("Éxito", "Perfil actualizado correctamente");
                } else {
                    Alert.alert("Error", "No se pudo actualizar el perfil");
                }
            }
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al actualizar el perfil");
            console.error("Error updating user info:", error);
        }
    };

    if(isLoading) {
        return (
            <View className='flex-1 flex-col items-center justify-center'>
                <Spinner/>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        >
            <ScrollView contentContainerStyle={styles.container} >  
                <View className='flex-col justify-evenly items-center m-5'>
                    
                        {photo ? (
                            <Image 
                                source={{ uri: `http://${SERVER_IP}:8000${photo}` }} 
                                style={{ width: 150, height: 150, borderRadius: 100 }} 
                            />
                        ) : (
                            <ProfileIcon size={150} color='#000' />
                        )}
                        <Text className='font-medium text-center text-[24px] m-5'>Editar perfil</Text>
                    
                    <View className='flex-col justify-evenly items-center m-5 w-full'>
                        <View className="mb-5">
                            <Input 
                                text="Correo"
                                value={email}
                                onChangeText={setEmail}    
                            />
                        </View>
                        <View className="mb-5">
                            <Input 
                                text="Nombre"
                                value={name}
                                onChangeText={setName}    
                                />
                        </View>
                        <View className="mb-5">
                            <Input 
                                text="Apellido"
                                value={lastname}
                                onChangeText={setLastname}    
                                />
                        </View>
                        <View className="mb-5">
                            <Input 
                                text="Identificación"
                                value={id}
                                onChangeText={setId}    
                                />
                        </View>
                        <View className="mb-5">
                            <CustomButton 
                                text="Guardar" 
                                onPress={handleSave}  
                                />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditProfile;
