import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { KeyIcon, PencilIcon, ProfileIcon } from '../atoms/Icons';
import { Link } from 'expo-router';

const Profile = () => {
    return (
        <View className='justify-start items-center flex-col m-5'>
            <ProfileIcon size={200} color='#000' />
            <Text className='font-medium text-center text-[24px]'>Administrador</Text>
            <View className='m-9 items-start'>
                <View className='flex-row items-center m-2'>
                    <View className='w-[52px] h-[50px] b-[#0090D0] rounded-[50px] items-center justify-center'>
                        <PencilIcon size={35} color='#D9D9D9'/>
                    </View>
                    <Link href='/loggedIn/editAccount' className='font-medium text-center text-[24px] '>Editar perfil</Link>
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

