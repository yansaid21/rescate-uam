import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar,SafeAreaView, Text } from "react-native";
import TypeEmergencyButton from "../atoms/TypeEmergencyButton";
import { BigEmergencyButton } from "../atoms/BigEmergencyButton";
import RedBrigadistaButton from "../atoms/RedBrigadistaButton"
import ModBrigadistaButton from "../atoms/ModBrigadistaButton"
import CompleteRegister from "../organisms/CompleteRegister";
import CustomButton from "../atoms/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from "../../auth/get";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite'


export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const checkUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); 
      const id_user = await AsyncStorage.getItem('id'); 

      console.log('id en main ', id_user);
      console.log('token en main ', token);
      

      if (token && id_user) {
        const user = await getUserInfo(Number(id_user), token); 
        console.log('user en main ', user);
        
        if (user && user.data) {
          console.log('user data en main ', user.data);
          setUserData(user);
          if (!user.data.rhgb || !user.data.social_security || !user.data.phone_number) {
            setModalVisible(true); 
          }
        }
      }

    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  useEffect(() => {
    checkUserInfo();
  }, []);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [isLoading,setIsLoading] = useState(true)
  
  
  
  useEffect(() => {
    const executeDatabaseOperations = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('example.db');

      await db.execAsync(`
      CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
      SET @adminRoleId = (SELECT id FROM roles WHERE name = 'Administrator' LIMIT 1);
      SET @brigadierRoleId = (SELECT id FROM roles WHERE name = 'Brigadier' LIMIT 1);
      SET @finalUserRoleId = (SELECT id FROM roles WHERE name = 'Final User' LIMIT 1);

      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        id_card BIGINT NOT NULL,
        rhgb VARCHAR(3) NOT NULL,
        social_security VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        role_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
      );
      `);
        if(userData){
          await db.execAsync(`
            INSERT INTO users (name, last_name, email, id_card, role_id)
            VALUES 
            ('${userData.name}', '${userData.last_name}', '${userData.email}', '${userData.id_card}',${userData.adminRoleId});
            `);
            }

      setIsLoading(false);

    } catch (error) {
      console.error("Error ejecutando operaciones de base de datos: ", error);
    }
  };

  executeDatabaseOperations();

}, []);  
 

  if (isLoading ){
    return (
      <View>
        <Text>Cargando lo que se necesita mientras añadimos un spin</Text>
      </View>
    )
  }

  return (
    <View className="h-full">
      <View className="justify-center items-center pt-12">
        <View className="pb-4">
          <BigEmergencyButton
            initialIsYellow={false} 
            buttonWidth={250} 
            buttonHeight={250} 
            buttonBorderRadius={125} 
            logoWidth={100} 
            logoHeight={150} 
          />
        </View>
        <View className="p-5">
          <TypeEmergencyButton text="Evacuación" />
        </View>
        <View className="p-5">
          <TypeEmergencyButton text="Incendio" />
        </View>
        <View className="p-5">
          <TypeEmergencyButton text="Sismo" />
        </View>
      </View>
      <CompleteRegister visible={modalVisible} onClose={handleCloseModal} />
    </View>
  );
}
