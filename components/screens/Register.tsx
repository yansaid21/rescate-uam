import React, { useState } from 'react';
import { Image, View, Text, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import Input from '../atoms/Input';
import InputPassword from '../atoms/InputPassword';
import CustomButton from '../atoms/CustomButton';
import { Checkbox } from 'react-native-paper'; 
import { Link } from 'expo-router';
import { useRouter } from "expo-router";
import { registerUser } from '../../auth/register';

const Register = () => {
    const router = useRouter();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repasswordError, setRepasswordError] = useState('');
    const [idError, setIdError] = useState('');
    const [nameError, setNameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [checkboxError, setCheckboxError] = useState('');

    const validateEmail = (email:string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@autonoma\.([a-z]{2,})(\.[a-z]{2,})?$/;
        return emailRegex.test(email);
    }
    const validateString = (string:string) => {
        const stringRegex = /^[0-9]+$/;
        return stringRegex.test(string);
    }

    //validar los campos
    const handleSubmit = () => {
        let isValid = true;
        
        if (!validateEmail(email)) {
            setEmailError('Correo inválido');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (email.length === 0) {
            setEmailError('El correo es requerido');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (password.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (password.length === 0) {
            setPasswordError('La contraseña es requerida');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (repassword !== password) {
            setRepasswordError('Las contraseñas no coinciden');
            isValid = false;
        } else {
            setRepasswordError('');
        }

        if (repassword.length === 0) {
            setRepasswordError('La contraseña es requerida');
            isValid = false;
        } else {
            setRepasswordError('');
        }

        const idRegex = /^[0-9]+$/;
        if (!idRegex.test(id)) {
            setIdError('La identificación debe contener solo números');
            isValid = false;
        } else {
            setIdError('');
        }

        if (id.length === 0) {
            setIdError('La identificación es requerida');
            isValid = false;
        } else {
            
            setIdError('');
        }

        if (validateString(name)) {
            setNameError('El nombre solo debe contener letras');
            isValid = false;
        } else {
            setNameError('');
        }

        if (name.length === 0) {
            setNameError('El nombre es requerido');
            isValid = false;
        } else {
            setNameError('');
        }

        if (validateString(lastname)) {
            setLastnameError('El apellido solo debe contener letras');
            isValid = false;
        } else {
            setLastnameError('');
        }

        if (lastname.length === 0) {
            setLastnameError('El apellido es requerido');
            isValid = false;
        } else {
            setLastnameError('');
        }

        if (!isChecked) {
            setCheckboxError('Debes aceptar los términos y condiciones');
            isValid = false;
        } else {
            setCheckboxError('');
        }

        if (isValid) {
            const numericId = Number(id);
            let data = registerUser(name,lastname,email,password,numericId,"O+","1234567890","3216549870",1,"XYZ123")
            if(!data){
                console.log("no hay nada para registrar mi rey, hay un error");
                
            }else{
                router.push("/")
            }
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Diferente comportamiento en iOS vs Android
        >
        <View className="flex-1 flex-col justify-between items-center m-5">
            <Image
                className="w-52 h-24"
                source={require('../../assets/UAM/Logos_UAM-07.png')}
                />
            <ScrollView 
                contentContainerStyle={styles.container} 
            >
            <Text className="text-4xl text-center text-[#0090D0] mb-[10px]">Regístrate en Rescates UAM</Text>
            <View className="mb-5">
                <Input 
                    text='Correo UAM'
                    value={email}
                    onChangeText={setEmail}   
                    />
                {emailError ? <Text className="text-red-500">{emailError}</Text> : null}
            </View>
            <View className="mb-5">
                <InputPassword 
                    text='Contraseña'
                    value={password}
                    onChangeText={setPassword}
                    />
                {passwordError ? <Text className="text-red-500">{passwordError}</Text> : null}
            </View>
            <View className="mb-5">
                <InputPassword 
                    text='Repetir contraseña'
                    value={repassword}
                    onChangeText={setRepassword} 
                />
                {repassword ? <Text className="text-red-500">{repasswordError}</Text> : null}
            </View>
            <View className="mb-5">
                <Input 
                    text='Cédula/Tarjeta de identidad'
                    value={id}
                    onChangeText={setId}
                    />
                {id ? <Text className="text-red-500">{idError}</Text> : null}
            </View>
            <View className="mb-5">
                <Input 
                    text='Nombre'
                    value={name}
                    onChangeText={setName}
                    />
                {name ? <Text className="text-red-500">{nameError}</Text> : null}
            </View>
            <View className="mb-5">
                <Input 
                    text='Apellido'
                    value={lastname}
                    onChangeText={setLastname}
                    />
                {lastname ? <Text className="text-red-500">{lastnameError}</Text> : null}
            </View>
            <View className="mb-5">
            <View className="flex-row items-center">
                <Checkbox
                    status={isChecked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setIsChecked(!isChecked);
                    }}
                    color="#0090D0"
                    />
                <Link className="text-sm underline text-[#0090D0]" href='/loggedOut/conditions'>
                    Términos y condiciones
                </Link>
            </View>
            {checkboxError ? <Text className="text-red-500">{checkboxError}</Text> : null}
            </View>
            <View className="mb-5">
                <CustomButton 
                    text="Registrarse" 
                    onPress={handleSubmit}
                    />
            </View>
            </ScrollView>
        </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Register;
