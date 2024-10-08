import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Input from '../atoms/Input';
import CustomButton from '../atoms/CustomButton';
import { getUserInfo } from '../../auth/get';
import { updateUserInfo } from '../../auth/put'; // Importa la función de actualización
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = await AsyncStorage.getItem('token'); 
                const id_user = await AsyncStorage.getItem('id'); 

                if (token && id_user) {
                    const user = await getUserInfo(Number(id_user), token); 
                    
                    if (user && user.data) {
                        setEmail(user.data.email);
                        setName(user.data.name);
                        setLastname(user.data.last_name);
                        setId(user.data.id_card.toString()); 
                    }
                }
            } catch (error) {
                console.error("Error get info user: ", error);
            }
        };

        fetchUserInfo();
    }, []);

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

                const response = await updateUserInfo(Number(id_user), token, userData); 
                
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

    return (
        <View className='flex-1 flex-col justify-between items-center m-5'>
            <Text className='font-medium text-center text-[24px] m-5'>Editar perfil</Text>
            <Input 
                text="Correo"
                value={email}
                onChangeText={setEmail}    
            />
            <Input 
                text="Nombre"
                value={name}
                onChangeText={setName}    
            />
            <Input 
                text="Apellido"
                value={lastname}
                onChangeText={setLastname}    
            />
            <Input 
                text="Identificación"
                value={id}
                onChangeText={setId}    
            />
            <CustomButton 
                text="Guardar" 
                onPress={handleSave}  // Llama a handleSave al presionar el botón
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default EditProfile;
