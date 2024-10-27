import { View, TextInput } from 'react-native'
import React from 'react'
import * as Tokens from '../tokens';

type CustomButtonProps = {
    text: string,
    value?: string
    onChangeText: (text: string) => void;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
    keyboardType?: 'default' | 'email-address' | 'numeric'
}

export default function Input({ text, value, onChangeText, autoCapitalize = 'none', keyboardType = 'default' }: CustomButtonProps) {
    return (   
        <View>
            <TextInput 
                className={`${Tokens.InputStyle}`}
                placeholder={text}
                placeholderTextColor={'#000000'}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                />
        </View>
    )
}

