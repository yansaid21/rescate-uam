import { View, TextInput, KeyboardAvoidingView, ScrollView, Platform, StyleSheet } from 'react-native'
import React from 'react'

type CustomButtonProps = {
    text: string,
    value: string;
    onChangeText: (text: string) => void;
}

export default function Input({ text, value, onChangeText }: CustomButtonProps) {
    return (   
        <View>
            <TextInput 
                className='w-[280px] h-12 rounded-[20px] bg-[#D9D9D9] px-[15px]'
                placeholder={text}
                placeholderTextColor={'#000000'}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize='none' 
                />
        </View>
    )
}

