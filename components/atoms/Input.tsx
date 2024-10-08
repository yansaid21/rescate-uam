import { View, TextInput } from 'react-native'
import React from 'react'
import * as Tokens from '../tokens';

type CustomButtonProps = {
    text: string,
    value?: string
    onChangeText: (text: string) => void;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
}

export default function Input({ text, value, onChangeText, autoCapitalize = 'none' }: CustomButtonProps) {
    return (   
        <View>
            <TextInput 
                className={`${Tokens.InputStyle}`}
                placeholder={text}
                placeholderTextColor={'#000000'}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize={autoCapitalize}
                />
        </View>
    )
}

