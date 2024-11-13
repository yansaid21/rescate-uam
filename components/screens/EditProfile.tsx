import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Input from '../atoms/Input';
import CustomButton from '../atoms/CustomButton';
import { getAllUsers } from '../../auth/get';
import { updateUserInfo, updateUserInfoWithoutEmail } from '../../auth/put'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileIcon } from '../atoms/Icons';
import Spinner from '../molecules/Spinner';

const EditProfile = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [id, setId] = useState('');
    const [dif, setDif] = useState(false);
    const [loadedEmail, setLoadedEmail] = useState(false);
    const [photo, setPhoto] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const id_user = await AsyncStorage.getItem('id');
                
                if (id_user) {
                    const users = await getAllUsers();
                    const user = users.find((user: any) => user.id === Number(id_user));

                    if (user) {
                        const fetchedEmail = user.email;

                        // Verificar si ya cargamos el email inicial
                        if (!loadedEmail) {
                            setEmail(fetchedEmail);
                            setLoadedEmail(true);
                        } else if (fetchedEmail !== email) {
                            setEmail(fetchedEmail);
                            setDif(true);
                        } else {
                            setDif(false);
                        }

                        setName(user.name);
                        setLastname(user.last_name);
                        setId(user.id_card.toString());

                        if (user.photo_path) {
                            const photoUri = user.photo_path.replace(/\\/g, '/');
                            setPhoto(photoUri);
                        }
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                console.error("Error fetching user info editProfile :", error);
            }
        };

        fetchUserInfo();
    }, [loadedEmail, email]);

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const id_user = await AsyncStorage.getItem('id');

            if (token && id_user) {
                const userData = {
                    email,
                    name,
                    last_name: lastname,
                    id_card: id,
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

    if (isLoading) {
        return (
            <View className='flex-1 flex-col items-center justify-center'>
                <Spinner />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View className='flex-col justify-evenly items-center m-5'>
                    {photo ? (
                        <Image 
                            source={{ uri: `http://rescueapi.xyz${photo}` }} 
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
