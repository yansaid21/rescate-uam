import React, { useState } from 'react';
import { Pressable, TextInput, View, KeyboardAvoidingView, ScrollView, Platform, StyleSheet } from 'react-native';
import { EyeIcon, EyeOffIcon } from './Icons';
import { Text } from 'react-native-elements';

type CustomButtonProps = {
    text: string,
    value: string;
    onChangeText: (text: string) => void;
}

export default function InputPassword({ text, value, onChangeText }: CustomButtonProps) {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    return (
           
                <View>
                    <TextInput
                        className='w-[280px] h-12 rounded-[20px] bg-[#D9D9D9] px-[15px]'
                        placeholder={text}
                        placeholderTextColor={'#000000'}
                        secureTextEntry={!isPasswordVisible}  
                        value={value}
                        onChangeText={onChangeText}
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

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
    }
});
