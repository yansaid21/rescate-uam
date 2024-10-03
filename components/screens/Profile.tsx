import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { KeyIcon, PencilIcon, ProfileIcon } from '../atoms/Icons';
import { Link } from 'expo-router';
import { getUserInfo } from '../../auth/get';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const handleEditProfile = async () => {
        
        try {
            const userId = await AsyncStorage.getItem('id'); 
            const token = await AsyncStorage.getItem('token');
            console.log("user id ", userId);
            console.log("token ", token);
            if (userId) {
                const userData = await getUserInfo(Number(userId), String(token)); 
                if (userData) {
                    await AsyncStorage.setItem('userData', JSON.stringify(userData));
                }
            }
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    };
    useEffect(() => {
        handleEditProfile();
    }, []);
    return (
        <View className='justify-start items-center flex-col m-5'>
            {/* <ProfileIcon size={200} color='#000' /> */}
            <Text className='font-medium text-center text-[24px]'>Administrador</Text>
            <View className='m-9 items-start'>
                <View className='flex-row items-center m-2'>
                    <View className='w-[52px] h-[50px] b-[#0090D0] rounded-[50px] items-center justify-center'>
                        <PencilIcon size={35} color='#D9D9D9'/>
                    </View>
                    <Link 
                        href='/loggedIn/editAccount' 
                        className='font-medium text-center text-[24px] '
                        onPress={handleEditProfile}
                    > 
                        Editar perfil
                    </Link>
                </View>
                <View className='flex-row items-center m-2'>
                    <View className='w-[52px] h-[50px] b-[#0090D0] rounded-[50px] items-center justify-center'>
                        <KeyIcon size={35} color='#D9D9D9'/>
                    </View>
                    <Link href='/loggedIn/changePassword' className='font-medium text-center text-[24px]'>Cambiar contraseña</Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Profile;

