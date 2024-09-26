
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Slot, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Layout = () => {
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Slot/>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Layout;
