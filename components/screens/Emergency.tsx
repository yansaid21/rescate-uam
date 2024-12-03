import { View, Text, Alert, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BigEmergencyButton } from '../atoms/BigEmergencyButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from '../../auth/get';
import CompleteRegister from '../organisms/CompleteRegister';
import CustomButton from '../atoms/CustomButton';
import { router, usePathname, useRouter } from 'expo-router';

export default function Emergency() {
  const [role, setRole] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleRole = async () => {
    try {
        const userId = await AsyncStorage.getItem('id'); 
        const token = await AsyncStorage.getItem('token');
        console.log('token ', typeof(token));
        
        if (userId && token) {
            const userData = await getUserInfo(Number(userId), token); 
            if (userData) {
              console.log('userData ', userData);
              
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                if (userData.data.role.id === 2) {
                    setRole('BRIGADISTA');
                } else if (userData.data.role.id === 3) {
                    setRole('USUARIO');
                }

                if (!userData.data.rhgb || !userData.data.social_security || !userData.data.phone_number || !userData.data.photo_path) {
                  setModalVisible(true); 
                }
            }
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
    }
  };

  useEffect(() => {
    handleRole();
  }, []);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  //validar si se desea cerrar sesión en caso de retroceder
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("id");
        console.log("Sesión cerrada, token eliminado");
        router.push("/loggedOut/login"); // Redirigir al login
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
  };

  const handleBackPress = () => {
    if (pathname === "/loggedIn/emergency") {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro de que deseas cerrar sesión?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Aceptar", onPress: handleLogout },
            ]
        );
        return true; // Bloquea la acción de retroceso predeterminada
    }

    return false; // Permite la acción de retroceso normal
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
    );

    return () => backHandler.remove(); // Limpieza al desmontar el componente
  }, [pathname]);

  //ver protocolos (temporal)
  const handleVerProtocolos = () => {
    router.push("/loggedIn/protocolsView");
  }

  return (
    <View className="flex p-1 pt-7 bg-white justify-center items-center">
      <Text className="text-2xl font-bold mb-32">BIENVENIDO {role}</Text>
      {/* <View className='mb-3'>
          <CustomButton 
              text="Ver protocolo" 
              onPress={handleVerProtocolos} 
          />
      </View> */}
      <BigEmergencyButton 
        initialIsYellow={false}
        buttonWidth={150} 
        buttonHeight={150}
        buttonBorderRadius={75}
        logoWidth={100}
        logoHeight={120}
      />
      <Text className="text-2xl font-bold mt-5 mb-12">ESTOY A SALVO</Text>
      <BigEmergencyButton 
        initialIsYellow={true}
        buttonWidth={150} 
        buttonHeight={150}
        buttonBorderRadius={75}
        logoWidth={75}
        logoHeight={120}
      />
      <Text className="text-2xl font-bold mt-5">ESTOY EN PELIGRO</Text>
      <CompleteRegister visible={modalVisible} onClose={handleCloseModal} />
    </View>
  );
}
