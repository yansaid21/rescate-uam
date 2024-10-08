import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import Main from '../../components/screens/Main';

const main = () => {
    return (
        <Main/>
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

export default main;

