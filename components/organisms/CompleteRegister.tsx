import React from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Input from '../atoms/Input';
import CustomButton from '../atoms/CustomButton';
import { useForm, Controller } from "react-hook-form";
import { router } from 'expo-router';
import ImageUploadComponent from '../atoms/ImageUploadComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserInfoComplete } from '../../auth/put';
import { zodResolver } from '@hookform/resolvers/zod';
import { CompleteRegisterScheme } from '../../schemes/completeRegisterScheme';
import { Picker } from '@react-native-picker/picker';

interface CompleteRegisterModalProps {
    visible: boolean;
    onClose: () => void;
}

interface FormData {
    rhgb: string,
    social_security: string,
    phone_number: number,
    code: string,
    photo_path: string | null;
}

const CompleteRegister: React.FC<CompleteRegisterModalProps> = ({ visible, onClose }) => {
    console.log('visible en complete register ', visible);
    
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
        resolver: zodResolver(CompleteRegisterScheme), 
    });

    const onSubmit = async (data: FormData) => {
        console.log('data en complete register ', data);
        try {
            const token = await AsyncStorage.getItem('token'); 
            const id_user = await AsyncStorage.getItem('id');
            if (token && id_user) {
                const result = await updateUserInfoComplete(Number(id_user), token, data);
                console.log('result in complete register ', result);
                
                if (result) {
                    onClose(); // Cierra el modal tras registro exitoso
                    router.push("/loggedIn/main");
                }
            }
        } catch (error: any) {
            console.log('en complete register ', error);
        }
    };

    const handleImageSelect = (imageUri: string) => {
        setValue('photo_path', imageUri); // Set image URI in form data
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Modal
                    transparent={true}
                    visible={false}
                    animationType="slide"
                    onRequestClose={onClose}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.title}>¡Completa tu registro!</Text>
                            
                            <View style={styles.pickerContainer}>
                                <Controller
                                    control={control}
                                    name="rhgb"
                                    render={({ field: { onChange, value } }) => (
                                        <Picker
                                            selectedValue={value}
                                            onValueChange={onChange}
                                            prompt="Grupo sanguíneo"
                                            style={styles.picker}
                                            dropdownIconColor="#000"
                                        >
                                            <Picker.Item label="Grupo sanguíneo" value=""  />
                                            <Picker.Item label="A+" value="A+" />
                                            <Picker.Item label="A-" value="A-" />
                                            <Picker.Item label="B+" value="B+" />
                                            <Picker.Item label="B-" value="B-" />
                                            <Picker.Item label="AB+" value="AB+" />
                                            <Picker.Item label="AB-" value="AB-" />
                                            <Picker.Item label="O+" value="O+" />
                                            <Picker.Item label="O-" value="O-" />
                                        </Picker>
                                    )}
                                />
                                {errors.rhgb && <Text style={styles.errorText}>{errors.rhgb.message}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Controller
                                    control={control}
                                    name="phone_number"
                                    render={({ field: { onChange } }) => (
                                        <Input
                                            text="Celular"
                                            onChangeText={onChange} 
                                            keyboardType="numeric"
                                        />
                                    )}
                                />
                                {errors.phone_number && <Text style={styles.errorText}>{errors.phone_number.message}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Controller
                                    control={control}
                                    name="social_security"
                                    render={({ field: { onChange } }) => (
                                        <Input
                                            text="EPS"
                                            onChangeText={onChange} 
                                            autoCapitalize="sentences"
                                        />
                                    )}
                                />
                                {errors.social_security && <Text style={styles.errorText}>{errors.social_security.message}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Controller
                                    control={control}
                                    name="code"
                                    render={({ field: { onChange } }) => (
                                        <Input
                                            text="Código UAM"
                                            onChangeText={onChange} 
                                        />
                                    )}
                                />
                                {errors.code && <Text style={styles.errorText}>{errors.code.message}</Text>}
                            </View>

                            <ImageUploadComponent onImageSelect={handleImageSelect} />
                            {errors.photo_path && <Text style={styles.errorText}>{errors.photo_path.message}</Text>}

                            <CustomButton 
                                text="Aceptar" 
                                onPress={handleSubmit(onSubmit)}
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 350,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        marginBottom: 20,
        fontSize: 24,
        textAlign: 'center',
        color: '#0090D0',
    },
    pickerContainer: {
        width: 300,
        height: 50,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 5,
    },
    picker: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
    },
    inputContainer: {
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        textAlign: 'left',
        marginTop: 5,
    },
});

export default CompleteRegister;
