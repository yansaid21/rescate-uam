import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProfileIcon } from '../atoms/Icons';
import { Text } from 'react-native';
import Input from '../atoms/Input';
import CustomButton from '../atoms/CustomButton';
import InputPassword from '../atoms/InputPassword';

const NewPassword = () => {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    return (
        <View className='flex-1 flex-col justify-evenly items-center m-5'>
            <ProfileIcon size={200} color='#000' />
            <Text className='font-medium text-center text-[24px] m-5'>Editar perfil</Text>
            <Input 
                text="Correo"
                value={email}
                onChangeText={setEmail}    
            />
            <InputPassword 
                text="Contraseña actual"
                value={currentPassword}
                onChangeText={setCurrentPassword}    
            />
            <InputPassword 
                text="Contraseña nueva"
                value={newPassword}
                onChangeText={setNewPassword}    
            />
            <CustomButton 
                text="Guardar" 
            />
        </View>
    );
}


export default NewPassword;
