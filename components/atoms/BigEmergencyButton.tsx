    import React, { useState } from 'react';
    import { Pressable, StyleSheet, View, Image } from 'react-native';

    export const BigEmergencyButton = () => {
        const [isYellow, setIsYellow] = useState(true);

        const handlePress = () => {
            setIsYellow(!isYellow); 
        };

        const logoSource = isYellow 
            ? require('../../assets/UAM/Logos_UAM-08.png') 
            : require('../../assets/UAM/Logos_UAM-10.png');

        return (
            <Pressable 
                onPress={handlePress}
                style={styles.buttonContainer}
            >
                <View style={[styles.button, isYellow ? styles.button : styles.buttonPressed]}>
                    <Image
                        source={logoSource}  
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
            backgroundColor: '#F4D73B', 
            width: 300,  
            height: 300, 
            borderRadius: 150, 
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonPressed: {
            backgroundColor: '#0090D0',
        },
        logo: {
            width: 150,
            height: 250,
        },
    });
