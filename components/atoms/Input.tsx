import { View, TextInput } from 'react-native'
import React from 'react'
import { Text } from 'react-native-elements';

type CustomButtonProps = {
    text: string,
    value: string;
    onChangeText: (text: string) => void;
    errorMessage?: string;
}

export default function Input({ text, value, onChangeText, errorMessage }: CustomButtonProps) {
    return (
        <View>
            <TextInput 
                className='w-[280px] h-12 rounded-[20px] bg-[#D9D9D9] px-[15px]'
                placeholder={text}
                placeholderTextColor={'#000000'}
                value={value}
                onChangeText={onChangeText}
            />
            {errorMessage ? <Text className="text-red-500" >{errorMessage}</Text> : null}
        </View>
    )
}
