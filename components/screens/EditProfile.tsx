import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProfileIcon } from '../atoms/Icons';
import Input from '../atoms/Input';
import CustomButton from '../atoms/CustomButton';
import { getUserInfo } from '../../auth/get';
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

    return (
        <View className='flex-1 flex-col justify-evenly items-center m-5'>
            {/* <ProfileIcon size={200} color='#000' /> */}
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
                />
        </View>
    );
}

const styles = StyleSheet.create({})

export default EditProfile;

