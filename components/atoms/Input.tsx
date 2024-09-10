import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

type CustomButtonProps = {
    text: string,
}

export default function Input({ text }: CustomButtonProps) {
    return (
        <View>
            <TextInput 
                style={styles.input}
                placeholder={text}
                placeholderTextColor={'#000000'}
            />
        </View>
    )
}

const styles= StyleSheet.create({
    input: {
        height: 48,
        width: 280,
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 15,
    },
})
