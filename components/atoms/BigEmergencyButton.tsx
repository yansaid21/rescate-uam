import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Image } from 'react-native';

// Definimos los tipos de los props
interface BigEmergencyButtonProps {
    initialIsYellow: boolean;
    buttonWidth: number;
    buttonHeight: number;
    buttonBorderRadius: number;
    logoWidth: number;
    logoHeight: number;
}

export const BigEmergencyButton: React.FC<BigEmergencyButtonProps> = ({
    initialIsYellow,
    buttonWidth,
    buttonHeight,
    buttonBorderRadius,
    logoWidth,
    logoHeight
}) => {
    const [isYellow, setIsYellow] = useState(initialIsYellow);

    const handlePress = () => {
        setIsYellow(!isYellow);
    };

    const logoSource = isYellow
        ? require('../../assets/UAM/Logos_UAM-08.png')
        : require('../../assets/UAM/Logos_UAM-10.png');

    return (
        <Pressable onPress={handlePress} style={styles.buttonContainer}>
            <View
                style={[
                    styles.button,
                    {
                        width: buttonWidth,
                        height: buttonHeight,
                        borderRadius: buttonBorderRadius,
                        backgroundColor: isYellow ? '#F4D73B' : '#0090D0',
                    },
                ]}
            >
                <Image
                    source={logoSource}
                    style={{ width: logoWidth, height: logoHeight }}
                />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
