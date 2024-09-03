import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

type CustomButtonProps = {
    text: string,
};


function AddBrigadistaButton({ text }: CustomButtonProps) {
  return (
    <Pressable style={styles.buttonContainer}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>
                <Link href='../screens/Brigadista'>{text}</Link>
            </Text>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 19, 
        shadowColor: '#000',   
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    button: {
        marginTop: 10,
        backgroundColor: 'ff8c00',
        width: 212,  
        height: 49,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',  
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 3,
    },
});

export default AddBrigadistaButton;