import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { EyeIcon, EyeOffIcon } from './Icons';

type CustomButtonProps = {
    text: string,
}

export default function InputPassword({ text }: CustomButtonProps) {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    return (
        <View>
            <TextInput
                className='w-[280px] h-12 rounded-[20px] bg-[#D9D9D9] px-[15px]'
                placeholder={text}
                placeholderTextColor={'#000000'}
                secureTextEntry={!isPasswordVisible}  // Controla si la contraseña es visible o no
            />
            <View className='absolute top-[10px] right-[10px]'>
            <Pressable onPress={() => setPasswordVisible(!isPasswordVisible)}>
                    {isPasswordVisible ? (
                        <EyeOffIcon size={24} color="black" />  // Ícono de ojo cerrado
                    ) : (
                        <EyeIcon size={24} color="black" />     // Ícono de ojo abierto
                    )}
                </Pressable>
            </View>
        </View>
    );
}

