import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { Slot, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navbar from '../../components/molecules/Nav';

const Layout = () => {
    return (
<>
            <StatusBar barStyle="light-content" backgroundColor="#0069A3" />
            <Navbar/>
            <View style={styles.container}>
                <Stack/>
            </View>
</>

    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',



    }
})

export default Layout;