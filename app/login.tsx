import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

const login = () => {
    return (
        <View style={styles.container}>
            <Text> Login Screen </Text>
            <Link href='/'>
                Go to home
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40
    }
})

export default login;

