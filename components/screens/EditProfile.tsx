import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProfileIcon } from '../atoms/Icons';
import Input from '../atoms/Input';
import CustomButton from '../atoms/CustomButton';

const EditProfile = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [program, setProgram] = useState('');
    const [id, setId] = useState('');

    return (
        <View className='flex-col justify-between items-center m-5'>
            <ProfileIcon size={200} color='#000' />
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
                text="Programa"
                value={program}
                onChangeText={setProgram}    
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

