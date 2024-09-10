import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { EyeIcon } from './Icons';

export default function InputPassword() {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor={'#000000'}
                    secureTextEntry={!isPasswordVisible}  // Controla si la contraseña es visible o no
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                    <EyeIcon
                        size={24}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    inputContainer: {
        flexDirection: 'row',  // Para alinear el TextInput y el ícono en la misma línea
        alignItems: 'center',
    },
    input: {
        height: 48,
        width: 280,
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 15,
    },
});
