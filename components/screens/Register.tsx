import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';
import Input from '../atoms/Input';
import InputPassword from '../atoms/InputPassword';
import CustomButton from '../atoms/CustomButton';
import { Checkbox } from 'react-native-paper'; 
import { Link } from 'expo-router';

const Register = () => {
    const [isChecked, setIsChecked] = useState(false);
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
            <View className="flex-row items-center">
                <Checkbox
                    status={isChecked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setIsChecked(!isChecked);
                    }}
                    color="#0090D0"
                />
                <Link className="text-sm underline text-[#0090D0]" href='./conditions'>
                    Términos y condiciones
                </Link>
            </View>
            <CustomButton 
                text="Registrarse" 
                href='/' 
            />
        </View>
    );
}

export default Register;
