import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const EmergencyButton = () => {
    // Estado para controlar el color del botón
    const [isYellow, setIsYellow] = useState(true);
    // Función para manejar el cambio de color
    const handlePress = () => {
        setIsYellow(!isYellow); // Alterna entre amarillo y azul
    };
    return (
        <Pressable 
            onPress={handlePress}
            style={[styles.buttonContainer, ]}
        >
            <View style={[styles.button, isYellow ? styles.button : styles.buttonPressed]}>
                <Image source={require('../../assets/UAM/Logos_UAM-08 1.png')} style={styles.buttonImage} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 360, // Para asegurar que el TouchableOpacity también sea redondo
        shadowColor: '#000',   // Color de la sombra
        shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra
        shadowOpacity: 0.25,   // Opacidad de la sombra
        shadowRadius: 4,       // Radio de la sombra
        elevation: 4,          // Elevación para Android
    },
    button: {
        backgroundColor: '#F4D73B',
        width: 308,  
        height: 308, 
        borderRadius: 360,  
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonImage: {
        width: 159,  
        height: 261, 
        resizeMode: 'contain',  // Ajusta el tamaño de la imagen dentro del botón
    },
    buttonPressed: {
        backgroundColor: '#0090D0', // Color del botón cuando se presiona
    },
})

export default EmergencyButton;
