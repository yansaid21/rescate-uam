import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type CustomButtonProps = {
    text: string;
    riskId: number;
    isSelected: boolean;
    onSelectRisk: (riskId: number) => void;
};

const TypeEmergencyButton = ({ text, riskId, isSelected, onSelectRisk }: CustomButtonProps) => {
    const handlePress = () => {
        onSelectRisk(riskId);
    };

    return (
        <Pressable onPress={handlePress} style={styles.buttonContainer}>
            <View style={[styles.button, isSelected ? styles.buttonPressed : null]}>
                <Text style={[styles.buttonText, isSelected ? styles.buttonPressedText : null]}>
                    {text}
                </Text>
            </View>
        </Pressable>
    );
};

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
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 3,
    },
    buttonPressed: {
        backgroundColor: '#F4D73B',
    },
    buttonPressedText: {
        color: '#000000',
    },
});

export default TypeEmergencyButton;
