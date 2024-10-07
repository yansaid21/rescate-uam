import { View, TextInput } from 'react-native'
import React from 'react'

type CustomButtonProps = {
    text: string,
    onChangeText: (text: string) => void;
}

export default function Input({ text, onChangeText }: CustomButtonProps) {
    return (   
        <View className='w-full'>
            <TextInput 
                className='w-[300px] h-12 rounded-[20px] bg-[#D9D9D9] px-[15px]'
                placeholder={text}
                placeholderTextColor={'#000000'}
                onChangeText={onChangeText}
                autoCapitalize='none' 
                />
        </View>
    )
}

