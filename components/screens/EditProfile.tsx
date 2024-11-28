import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Input from '../atoms/Input';
import CustomButton from '../atoms/CustomButton';
import { getUserInfo } from '../../auth/get';
import { updateUserInfo, updateUserInfoWithoutEmail } from '../../auth/put'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_IP } from '../../utils/constants';
import { ProfileIcon } from '../atoms/Icons';
import Spinner from '../molecules/Spinner';
import { Picker } from '@react-native-picker/picker';
import EditImage from '../organisms/EditImage';

const EditProfile = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [id, setId] = useState('');
    const [dif, setDif] = useState(false);
    const [loadedEmail, setLoadedEmail] = useState(false);
    const [photo, setPhoto] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [EPS, setEPS] = useState('');
    const [rhgb, setRhgb] = useState(''); 
    const [isEditImageModalVisible, setEditImageModalVisible] = useState(false); // Estado para la visibilidad del modal

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = await AsyncStorage.getItem('token'); 
                const id_user = await AsyncStorage.getItem('id'); 
                console.log("Estoy entrando al fetch");
                
                if (token && id_user) {
                    const user = await getUserInfo(Number(id_user), token); 
                    console.log("user: "+user);
                    
                    if (user && user.data) {
                        const fetchedEmail = user.data.email;

                        if (!loadedEmail) {
                            setEmail(fetchedEmail);
                            setLoadedEmail(true);
                        } else if (fetchedEmail !== email) {
                            setEmail(fetchedEmail);
                            setDif(true);
                        } else {
                            setDif(false);
                        }

                        setName(user.data.name);
                        setLastname(user.data.last_name);
                        setId(user.data.id_card.toString()); 

                        if (user.data.photo_path) {
                            const photoUri = user.data.photo_path.replace(/\\/g, '/');
                            console.log('photoUri ', photoUri);
                            setPhoto(photoUri);
                        }
                        setIsLoading(false);
                    }
                }
            } catch (error) {
                console.error("Error get info user: ", error);
            }
        };

        fetchUserInfo();
    }, [loadedEmail, email]);

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('token'); 
            const id_user = await AsyncStorage.getItem('id'); 

            if (token && id_user) {
                const userData = {
                    email,
                    name,
                    last_name: lastname,
                    id_card: id,
                    rhgb: rhgb,
                    social_security: social_security,
                };

                let response;
                if (dif) {
                    console.log("Actualizando con email");
                    response = await updateUserInfo(Number(id_user), token, userData);
                } else {
                    console.log("Actualizando sin email");
                    response = await updateUserInfoWithoutEmail(Number(id_user), token, userData);
                }

                if (response) {
                    Alert.alert("Éxito", "Perfil actualizado correctamente");
                } else {
                    Alert.alert("Error", "No se pudo actualizar el perfil");
                }
            }
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al actualizar el perfil");
            console.error("Error updating user info:", error);
        }
    };

    const handleImageSelect = (imageUri: string) => {
        setPhoto(imageUri);
        setEditImageModalVisible(false); // Cierra el modal después de seleccionar la imagen
    };

    if(isLoading) {
        return (
            <View className='flex-1 flex-col items-center justify-center'>
                <Spinner/>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        >
            <ScrollView contentContainerStyle={styles.container}>  
                <View className='flex-col justify-evenly items-center m-5'>
                    
                    {photo ? (
                        <Image 
                            source={{ uri: `http://${SERVER_IP}:8000${photo}` }} 
                            style={{ width: 150, height: 150, borderRadius: 100 }} 
                        />
                    ) : (
                        <ProfileIcon size={150} color='#000' />
                    )}
                    <Text className='font-medium text-center text-[24px] m-5'>Editar perfil</Text>
                
                    <View className='flex-col justify-evenly items-center m-5 w-full'>
                        <View className="mb-5">
                            <Input 
                                text="Correo"
                                value={email}
                                onChangeText={setEmail}    
                            />
                        </View>
                        <View className="mb-5">
                            <Input 
                                text="Nombre"
                                value={name}
                                onChangeText={setName}    
                            />
                        </View>
                        <View className="mb-5">
                            <Input 
                                text="Apellido"
                                value={lastname}
                                onChangeText={setLastname}    
                            />
                        </View>
                        <View className="mb-5">
                            <Input 
                                text="Identificación"
                                value={id}
                                onChangeText={setId}    
                            />
                        </View>
                        <View className="mb-5">
                            <Input
                                text="EPS"
                                value={EPS}
                                onChangeText={setEPS}
                            />
                        </View>
                        <View className="mb-5 w-[300px] h-12 rounded-[20px] px-[2px] bg-[#D9D9D9]">
                            <Picker
                                selectedValue={rhgb}
                                onValueChange={(itemValue) => setRhgb(itemValue)}
                                prompt="Grupo sanguíneo"
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    backgroundColor: 'transparent'
                                }}
                                dropdownIconColor="#000"
                            >
                                <Picker.Item label="Grupo sanguíneo" value="" />
                                <Picker.Item label="A+" value="A+" />
                                <Picker.Item label="A-" value="A-" />
                                <Picker.Item label="B+" value="B+" />
                                <Picker.Item label="B-" value="B-" />
                                <Picker.Item label="AB+" value="AB+" />
                                <Picker.Item label="AB-" value="AB-" />
                                <Picker.Item label="O+" value="O+" />
                                <Picker.Item label="O-" value="O-" />
                            </Picker>
                        </View>
                        
                        <View className="mb-5">
                            <CustomButton
                                text="Cambiar foto"
                                onPress={() => setEditImageModalVisible(true)}
                            />
                        </View>
                        <View className="mb-5">
                            <CustomButton 
                                text="Guardar" 
                                onPress={handleSave}  
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Modal para editar imagen */}
            <EditImage 
                visible={isEditImageModalVisible}
                onClose={() => setEditImageModalVisible(false)}
                onImageSelect={handleImageSelect}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditProfile;
