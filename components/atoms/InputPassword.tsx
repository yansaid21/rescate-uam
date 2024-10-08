import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { EyeIcon, EyeOffIcon } from './Icons';

type CustomButtonProps = {
    text: string,
    onChangeText: (text: string) => void;
}

export default function InputPassword({ text, onChangeText }: CustomButtonProps) {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    return (
        <View className='relative w-[300px]'>
            <TextInput
                className='w-full h-12 rounded-[20px] bg-[#D9D9D9] px-4 pr-10'
                placeholder={text}
                placeholderTextColor={'#000000'}
                secureTextEntry={!isPasswordVisible} 
                onChangeText={onChangeText}
                autoCapitalize='none' 
                />
            <View className='absolute top-[10px] right-[10px]'>
                <Pressable onPress={() => setPasswordVisible(!isPasswordVisible)}>
                    {isPasswordVisible ? (
                        <EyeOffIcon size={24} color="black" />  
                    ) : (
                        <EyeIcon size={24} color="black" />    
                    )}
                </Pressable>
            </View>
        </View>
    );
}

