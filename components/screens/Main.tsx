import React, { useEffect, useState } from "react";
import { Alert, View, BackHandler } from "react-native";
import TypeEmergencyButton from "../atoms/TypeEmergencyButton";
import { BigEmergencyButton } from "../atoms/BigEmergencyButton";
import CompleteRegister from "../organisms/CompleteRegister";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from "../../auth/get";
import Spinner from "../molecules/Spinner";
import * as SQLite from 'expo-sqlite';
import { getRiskSituation } from "../../auth/risks";
import { createIncident } from "../../auth/incident";
import Incidents from "../organisms/Incidents";
import { getInstitutionInfo } from "../../auth/institution";
import { usePathname, useRouter } from "expo-router";

interface UserData {
  data: {
    id?: number;
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
  const [risks, setRisks] = useState([]);
  //gestionar incidente
  const [isIncidentActive, setIsIncidentActive] = useState(false);
  const [selectedRiskId, setSelectedRiskId] = useState<number | null>(null);
  const [showReport, setShowReport] = useState(false);

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
    if (pathname === "/loggedIn/main") {
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

  const getRisks = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); 

      if (token ) {
        const risks = await getRiskSituation(token, 1); 
        setRisks(risks.data);
        /* console.log("riesgos traidos", risks); */
        
      }
    } catch (error) {
      console.error("Error al obtener la información de los riesgos:", error);
    }
  }
  const checkUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); 
      const id_user = await AsyncStorage.getItem('id'); 

      if (token && id_user) {
        const user = await getUserInfo( Number(id_user), token); 
        if (user && user.data) {
          /* console.log('user data en main ', user.data); */
          setUserData(user);
          /* console.log('user.data ', user.data); */

          // Solo abre el modal si falta algún dato
          const isInfoIncomplete = !user.data.rhgb || !user.data.social_security || !user.data.phone_number || !user.data.photo_path;
          /* console.log(' isInfoIncomplete ', isInfoIncomplete); */
          setModalVisible(isInfoIncomplete);
          /* console.log("Modal visibility set to:", isInfoIncomplete); */
        }
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  useEffect(() => {
    checkUserInfo();
    getRisks();
  }, []); // Este `useEffect` solo se ejecuta una vez al montar el componente

  const handleCloseModal = () => {
    setModalVisible(false);
    setShowReport(false);
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
          const userExists = await db.getFirstAsync(`
            SELECT * FROM users WHERE id = '${userData.data.id}';
          `);
          /* console.log("Usuario encontrado en la base de datos:", userExists); */
          
          if (userExists) {
            // Actualizar el usuario existente
            const existingUserId =userData.data.id;
            await db.runAsync(`
              UPDATE users 
              SET name = '${userData.data.name}', 
                  last_name = '${userData.data.last_name}', 
                  id_card = '${userData.data.id_card}', 
                  role_id = '${userData.data.adminRoleId}' 
              WHERE id = ${existingUserId};
            `);
            /* console.log("Usuario actualizado en la base de datos:", userData.data); */
          } else {
            // Insertar un nuevo usuario
            await db.runAsync(`
              INSERT INTO users (name, last_name, email, id_card, role_id)
              VALUES 
              ('${userData.data.name}', '${userData.data.last_name}', '${userData.data.email}', '${userData.data.id_card}', '${userData.data.adminRoleId}');
            `);
            /* console.log("Usuario creado en la base de datos:", userData.data); */
          }
          
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error ejecutando operaciones de base de datos:", error);
      }
    };

    executeDatabaseOperations();
  }, []); 

  if (isLoading) {
    return <Spinner />;
  }

  //crear el incidente
  const toggleIncident = async () => {
    if (!isIncidentActive) {
      if (selectedRiskId === null) {
          Alert.alert('Error', 'Por favor selecciona un tipo de emergencia.');
          return;
      }
      try {
        const token = await AsyncStorage.getItem("token");
        const institutionId = 1; 

        if (token) {
          const incident = await createIncident(institutionId, selectedRiskId, token); 
          console.log('incident ', incident.data.id);
          
          await AsyncStorage.setItem("id_incident", String(incident.data.id));
          console.log("Incidente creado.");
          setIsIncidentActive(true);
        }
      } catch (error) {
        console.error("Error al crear el incidente:", error);
      }
    } else {
      console.log("Incidente finalizado.");
      setIsIncidentActive(false);
      setShowReport(true);
    }
  };

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
            onToggleIncident={toggleIncident}
            available={selectedRiskId? true : false}
          />
        </View>
        {risks.map((risk: any) => (
          <View className="p-5" key={risk.id}>
            <TypeEmergencyButton 
              text={risk.name} 
              riskId={risk.id}
              isSelected={selectedRiskId === risk.id} 
              onSelectRisk={() => setSelectedRiskId(risk.id)}
            />
          </View>
        ))}
      </View>
      <CompleteRegister visible={modalVisible} onClose={handleCloseModal} />
      <Incidents visible={showReport} onClose={handleCloseModal} risk={selectedRiskId} />
    </View>
  );
}


