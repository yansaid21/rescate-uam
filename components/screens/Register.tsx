import React from 'react';
import { Image, View, Text } from 'react-native';
import Input from '../atoms/Input';
import InputPassword from '../atoms/InputPassword';
import CustomButton from '../atoms/CustomButton';

const Register = () => {
    return (
        <View className="flex-1 flex-col justify-between items-center m-5">
            <Image
                className="w-52 h-24"
                source={require('../../assets/UAM/Logos_UAM-07.png')}
            />
            <Text className="text-4xl text-center text-[#0090D0] mb-[10px]">Regístrate en Rescates UAM</Text>
            <Input text='Correo UAM'/>
            <InputPassword text='Contraseña'/>
            <InputPassword text='Repetir contraseña'/>
            <Input text='Cédula/Tarjeta de identidad'/>
            <Input text='Nombre'/>
            <Input text='Apellido'/>
            <Input text='Programa'/>
            <CustomButton 
                text="Registrarse" 
                href='/' 
            />
        </View>
    );
}

export default Register;
