import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Slot, Stack } from 'expo-router';


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
    }
})

export default Layout;