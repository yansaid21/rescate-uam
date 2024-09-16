import { View, TextInput } from 'react-native'
import React from 'react'

type CustomButtonProps = {
    text: string,
}

export default function Input({ text }: CustomButtonProps) {
    return (
        <View>
            <TextInput 
                className='w-[280px] h-12 rounded-[20px] bg-[#D9D9D9] px-[15px]'
                placeholder={text}
                placeholderTextColor={'#000000'}
            />
        </View>
    )
}
