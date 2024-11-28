import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ProfileIcon } from '../atoms/Icons';
import { Text } from 'react-native';
import Input from '../atoms/Input';
import CustomButton from '../atoms/CustomButton';
import InputPassword from '../atoms/InputPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from '../../auth/get';

const NewPassword = () => {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [photo, setPhoto] = useState('');

    const loadData = async () => {
        const token = await AsyncStorage.getItem('token');
        const id_user = await AsyncStorage.getItem('id');

        if (token && id_user) {
            const user = await getUserInfo(Number(id_user), token); 
            if (user & user.data){
                if (user.data.photo_path) {
                    const photoUri = user.data.photo_path.replace(/\\/g, '/');
                    console.log('photoUri ', photoUri);
                    setPhoto(photoUri);  
                }
            }
        }
    }
    
    useEffect(() => {
        loadData();
    }, []);

    return (
        <View className='flex-1 flex-col justify-evenly items-center m-5'>
            {photo ? (
                <Image 
                    source={{ uri: `http://192.168.43.164:8000:8000${photo}` }} 
                    style={{ width: 150, height: 150, borderRadius: 100 }} 
                />
            ) : (
                <ProfileIcon size={150} color='#000' />
            )}
            <Text className='font-medium text-center text-[24px] m-5'>Cambiar contraseña</Text>
            <InputPassword 
                text="Contraseña actual"
                onChangeText={setCurrentPassword}    
            />
            <InputPassword 
                text="Contraseña nueva"
                onChangeText={setNewPassword}    
            />
            <CustomButton 
                text="Guardar" 
            />
        </View>
    );
}


export default NewPassword;
