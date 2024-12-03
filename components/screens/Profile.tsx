import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { KeyIcon, LoggOutIcon, PencilIcon, ProfileIcon } from '../atoms/Icons';
import { Link } from 'expo-router';
import { getUserInfo } from '../../auth/get';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const [role, setRole] = useState('');

    const handleEditProfile = async () => {
        try {
            const userId = await AsyncStorage.getItem('id'); 
            const token = await AsyncStorage.getItem('token');
            if (userId) {
                const userData = await getUserInfo(Number(userId), String(token)); 
                if (userData) {
                    await AsyncStorage.setItem('userData', JSON.stringify(userData));
                    if (userData.data.role_id === 1) {
                        setRole('Administrador');
                    } else if (userData.data.role_id === 2) {
                        setRole('Brigadista');
                    } else if (userData.data.role_id === 3) {
                        setRole('Usuario');
                    }
                }
            }
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token'); 
            await AsyncStorage.removeItem('id');    
            console.log('Sesión cerrada, token eliminado');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    useEffect(() => {
        handleEditProfile();
    }, []);

    return (
        <View className='justify-start items-center flex-col m-5'>
            <Text className='font-medium text-center text-[24px]'>{role}</Text>
            <View className='m-9 items-start'>
                <View className='flex-row items-center m-2'>
                    <View className='w-[52px] h-[50px] bg-[#0090D0] rounded-[50px] items-center justify-center mr-3'>
                        <PencilIcon size={35} color='#fff'/>
                    </View>
                    <Link 
                        href='/loggedIn/editAccount' 
                        className='font-medium text-center text-[24px]'
                        onPress={handleEditProfile}
                    > 
                        Editar perfil
                    </Link>
                </View>
            </View>
            <Link href="/loggedOut/login" onPress={handleLogout}>
                <View className='justify-items-end items-center m-7'>
                    <LoggOutIcon size={40} color='#0090D0'/>
                    <Text className='text-center mt-4 text-[#0090D0] text-lg'>Cerrar sesión</Text>
                </View>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Profile;
