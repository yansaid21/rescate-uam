import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { EyeIcon } from './Icons';

export default function InputPassword() {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={'#000000'}
                secureTextEntry={!isPasswordVisible}  // Controla si la contraseña es visible o no
            />
            <View style={styles.icon}>
                <EyeIcon
                    size={24}
                    color="black"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',  // Para alinear el TextInput y el ícono en la misma línea
        alignItems: 'center',
        position: 'relative',
    },
    input: {
        height: 48,
        width: 280,
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 15
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 10
    }
});
