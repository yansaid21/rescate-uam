import React, { useEffect, useState } from "react";
import { View } from "react-native";
import TypeEmergencyButton from "../atoms/TypeEmergencyButton";
import { BigEmergencyButton } from "../atoms/BigEmergencyButton";
import CompleteRegister from "../organisms/CompleteRegister";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from "../../auth/get";
import Spinner from "../molecules/Spinner";
import * as SQLite from 'expo-sqlite';

interface UserData {
  data: {
    name: string;
    last_name: string;
    email: string;
    id_card: number;
    adminRoleId: number;
    rhgb?: string;
    social_security?: string;
    phone_number?: string;
  };
}

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); 
      const id_user = await AsyncStorage.getItem('id'); 

      if (token && id_user) {
        const user = await getUserInfo(token, Number(id_user)); 
        
        if (user && user.data) {
          console.log('user data en main ', user.data);
          setUserData(user);

          // Solo abre el modal si falta algún dato
          const isInfoIncomplete = !user.rhgb || !user.social_security || !user.phone_number;
          setModalVisible(isInfoIncomplete);
          console.log("Modal visibility set to:", isInfoIncomplete);
        }
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  useEffect(() => {
    checkUserInfo();
  }, []); // Este `useEffect` solo se ejecuta una vez al montar el componente

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const executeDatabaseOperations = async () => {
      try {
        const db = await SQLite.openDatabaseAsync('example.db');

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

        if (userData && userData.data) {
          await db.execAsync(`
            INSERT INTO users (name, last_name, email, id_card, role_id)
            VALUES 
            ('${userData.data.name}', '${userData.data.last_name}', '${userData.data.email}', '${userData.data.id_card}', '${userData.data.adminRoleId}');
          `);
          console.log("Usuario creado en la base de datos:", userData.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error ejecutando operaciones de base de datos:", error);
      }
    };

    executeDatabaseOperations();
  }, [userData]); 

  if (isLoading) {
    return <Spinner />;
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
