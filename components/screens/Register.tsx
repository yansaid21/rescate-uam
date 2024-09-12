import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import Input from '../atoms/Input';
import InputPassword from '../atoms/InputPassword';
import CustomButton from '../atoms/CustomButton';

const Register = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/UAM/Logos_UAM-07.png')}
            />
            <Text style={styles.title}>Regístrate en Rescates UAM</Text>
            <Input text='Correo UAM'/>
            <InputPassword/>
            <InputPassword/>
            <Input text='Cédula/Tarjeta de identidad'/>
            <Input text='Nombre'/>
            <Input text='Apellido'/>
            <Input text='Programa'/>
            <CustomButton 
                text="Registrarse" 
                href='/' 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-between",
        flexDirection: "column",
        alignItems: 'center',
        margin: 10
    },
    logo:{
        width:"auto",
        height: 100
    },
    title:{
        fontFamily: 'Fira Sans',
        fontSize: 36,
        textAlign: 'center',
        color: '#0090D0',
        marginBottom: 10
    }
})

export default Register;
