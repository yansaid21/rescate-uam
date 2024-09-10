import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Image } from 'react-native';

export const BigEmergencyButton = () => {
    const [isYellow, setIsYellow] = useState(true);

    const handlePress = () => {
        setIsYellow(!isYellow); 
    };

    return (
        <Pressable 
            onPress={handlePress}
            style={styles.buttonContainer}
        >
            <View style={[styles.button, isYellow ? styles.button : styles.buttonPressed]}>
                <Image
                    source={require('../../assets/UAM/Logos_UAM-10.png')}
                    style={styles.logo} 
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    button: {
        backgroundColor: '#0090D0',
        width: 300,  // Ajusta el tamaño según lo grande que lo quieras
        height: 300, // Ajusta el tamaño según lo grande que lo quieras
        borderRadius: 150,  // Mitad de width y height para que sea un círculo
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPressed: {
        backgroundColor: '#F4D73B', 
    },
    logo: {
        width: 150,
        height: 250,
    },
});
