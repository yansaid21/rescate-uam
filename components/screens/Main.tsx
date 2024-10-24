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
import Spinner from "../molecules/Spinner";

interface UserData {
  data: {
    name: string;
    last_name: string;
    email: string;
    id_card: number; // O el tipo que corresponda
    adminRoleId: number; // O el tipo que corresponda
    // Otras propiedades que puedas necesitar
  };
}

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const checkUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); 
      const id_user = await AsyncStorage.getItem('id'); 

      console.log('id en main ', id_user);
      console.log('token en main ', token);
      

      if (token && id_user) {
        const user = await getUserInfo(Number(id_user), token); 
        
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
          /* await db.execAsync(`
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS roles;
          `); */
          await db.execAsync(`
          CREATE TABLE IF NOT EXISTS roles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );

          INSERT OR IGNORE INTO roles (name) VALUES 
          ('Administrator'), 
          ('Brigadier'), 
          ('Final User');

          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255),
            id_card BIGINT NOT NULL,
            rhgb VARCHAR(3),
            social_security VARCHAR(255),
            phone_number VARCHAR(20),
            is_active BOOLEAN DEFAULT 1,
            role_id INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
          );
          `);
          if (userData && userData.data && userData.data.name && userData.data.last_name && userData.data.email && userData.data.id_card && userData.data.adminRoleId) {
            await db.execAsync(`
              INSERT INTO users (name, last_name, email, id_card, role_id)
              VALUES 
              ('${userData.data.name}', '${userData.data.last_name}', '${userData.data.email}', '${userData.data.id_card}', '${userData.data.adminRoleId}');
            `);
            console.log("user creado con ", userData.data);
          } else {
            /* console.log('Faltan datos de usuario para insertar en la base de datos:', userData.data.adminRoleId); */
          }
          

            await db.withTransactionAsync(async() => {
              const roles = await db.getFirstAsync('SELECT * FROM roles');
              console.log('ROLES', roles);
            });

            await db.withTransactionAsync(async() => {
              const users = await db.getFirstAsync('SELECT * FROM users');
              console.log('USERS', users);
            });
            
          } catch (error) {
            console.error("Error ejecutando operaciones de base de datos: ", error);
          }
          setIsLoading(false);
    };

    executeDatabaseOperations();

  }, []);  

  if (isLoading ){
    return (
      <Spinner />
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
