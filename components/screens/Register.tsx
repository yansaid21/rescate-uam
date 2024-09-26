import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';
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
    const [program, setProgram] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repasswordError, setRepasswordError] = useState('');
    const [idError, setIdError] = useState('');
    const [nameError, setNameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [programError, setProgramError] = useState('');
    const [checkboxError, setCheckboxError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@autonoma\.([a-z]{2,})(\.[a-z]{2,})?$/;
        return emailRegex.test(email);
    }
    const validateString = (string) => {
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

        if (validateString(program)) {
            setProgramError('El programa solo debe contener letras');
            isValid = false;
        } else {
            setProgramError('');
        }

        if (program.length === 0) {
            setProgramError('El programa es requerido');
            isValid = false;
        } else {
            setProgramError('');
        }

        if (!isChecked) {
            setCheckboxError('Debes aceptar los términos y condiciones');
            isValid = false;
        } else {
            setCheckboxError('');
        }

        if (isValid) {
            let data=registerUser(name,lastname,email,password,1,"s","d","211",true,3)
            if(!data){
                console.log("no hay nada para registrar mi rey, hay un error");
                
            }else{
                router.push("/")
            }
        }
    }

    return (
        <View className="flex-1 flex-col justify-between items-center m-5">
            <Image
                className="w-52 h-24"
                source={require('../../assets/UAM/Logos_UAM-07.png')}
            />
            <Text className="text-4xl text-center text-[#0090D0] mb-[10px]">Regístrate en Rescates UAM</Text>
            <Input 
                text='Correo UAM'
                value={email}
                onChangeText={setEmail}   
            />
            {emailError ? <Text className="text-red-500">{emailError}</Text> : null}
            <InputPassword 
                text='Contraseña'
                value={password}
                onChangeText={setPassword}
            />
            {passwordError ? <Text className="text-red-500">{passwordError}</Text> : null}
            <InputPassword 
                text='Repetir contraseña'
                value={repassword}
                onChangeText={setRepassword} 
            />
            {repassword ? <Text className="text-red-500">{repasswordError}</Text> : null}
            <Input 
                text='Cédula/Tarjeta de identidad'
                value={id}
                onChangeText={setId}
            />
            {id ? <Text className="text-red-500">{idError}</Text> : null}
            <Input 
                text='Nombre'
                value={name}
                onChangeText={setName}
            />
            {name ? <Text className="text-red-500">{nameError}</Text> : null}
            <Input 
                text='Apellido'
                value={lastname}
                onChangeText={setLastname}
            />
            {lastname ? <Text className="text-red-500">{lastnameError}</Text> : null}
            <Input 
                text='Programa'
                value={program}
                onChangeText={setProgram}
            />
            {program ? <Text className="text-red-500">{programError}</Text> : null}
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
            <CustomButton 
                text="Registrarse" 
                onPress={handleSubmit}
            />
        </View>
    );
}

export default Register;
