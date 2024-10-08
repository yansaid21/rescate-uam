
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Slot, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Layout = () => {
    return (
            <View style={styles.container}>
                <Slot/>
            </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:50,
        paddingBottom:20
    }
})

export default Layout;
