import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BigEmergencyButton } from '../atoms/BigEmergencyButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from '../../auth/get';
import CompleteRegister from '../organisms/CompleteRegister';

export default function Emergency() {
  const [role, setRole] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleRole = async () => {
    try {
        const userId = await AsyncStorage.getItem('id'); 
        const token = await AsyncStorage.getItem('token');

        if (userId) {
            const userData = await getUserInfo(Number(userId), String(token)); 
            if (userData) {
              console.log('userData ', userData);
              
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                if (userData.data.role_id === 2) {
                    setRole('BRIGADISTA');
                } else if (userData.data.role_id === 3) {
                    setRole('USUARIO');
                }

                if (!userData.data.rhgb || !userData.data.social_security || !userData.data.phone_number) {
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

  return (
    <View className="flex p-1 pt-7 bg-white justify-center items-center">
      <Text className="text-2xl font-bold mb-32">BIENVENIDO {role}</Text>
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
