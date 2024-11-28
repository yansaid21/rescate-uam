import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type CustomButtonProps = {
    text: string,
    riskId: number;
    isSelected: boolean; 
    onSelectRisk: (riskId: number) => void;
}

const TypeEmergencyButton = ({ text, riskId, isSelected, onSelectRisk } : CustomButtonProps) => {
    const [isYellow, setIsYellow] = useState(true);
    const handlePress = () => {
        onSelectRisk(riskId);
        setIsYellow(!isYellow); 
    };

    return (
        <Pressable 
            onPress={handlePress}
            style={[styles.buttonContainer, ]}
        >
            <View style={[styles.button, isYellow ? styles.button : styles.buttonPressed]}>
                <Text style={[styles.buttonText, isYellow ? styles.buttonText: styles.buttonPressedText]}>{text}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 19, // Para asegurar que el TouchableOpacity también sea redondo
        shadowColor: '#000',   // Color de la sombra
        shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra
        shadowOpacity: 0.25,   // Opacidad de la sombra
        shadowRadius: 4,       // Radio de la sombra
        elevation: 4,          // Elevación para Android
    },
    button: {
        backgroundColor: '#8CB7D0',
        width: 212,  
        height: 49, 
        borderRadius: 19,  
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',  
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.25)', // Color de la sombra
        textShadowOffset: { width: 0, height: 3 }, // Desplazamiento de la sombra
        textShadowRadius: 3, // Difuminado de la sombra
    },
    buttonPressed: {
        backgroundColor: '#F4D73B', 
    },
    buttonPressedText: {
        color: '#000000', 
    },
})

export default TypeEmergencyButton;
