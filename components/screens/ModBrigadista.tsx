import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { getAllUsers } from '../../auth/get';
import * as SQLite from 'expo-sqlite'
import Spinner from '../molecules/Spinner';

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


export default function ModBrigadista() {
  const [tableData, setTableData] = useState([]);  

  // Encabezado de la tabla sin la columna "Rol"
  const [tableHead, setTableHead] = useState(['Cedula', 'Nombre', 'Admin', 'Brigadier']); 
  const widthArr = [100, 100, 100, 100]; // Ajuste del ancho de columnas
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [rawUsers,setRawUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await getAllUsers(); 
        console.log("users raw>>>> ", users);
  
        const db = await SQLite.openDatabaseAsync('users.db');
        
        // Crea las tablas roles y users, si no existen
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
            id_card BIGINT NOT NULL
          );
        `);
  
        // Mapea los usuarios y asegura que el acceso a la base de datos es asíncrono
        const formattedData = await Promise.all(
          users.map(async (user) => {
            const idCard = user.id_card || 'N/A'; 
            const fullName = `${user.name || ''} ${user.last_name || ''}`.trim(); 
            
            const isAdmin = user.role && user.role.name === 'Administrator';
            const isBrigadier = user.role && user.role.name === 'Brigadier';
            console.log("idcard>>>> ", typeof idCard);
            console.log("fullName>>>> ", fullName);
            
            
            // Inserta en la base de datos cada usuario
/*             await db.execAsync(`
              INSERT INTO users (name, id_card)
              VALUES ('${fullName}', ${idCard});
            `); */

  
            return [
              idCard,
              fullName,
              isAdmin ? '🟦' : '⬜',  // Si es admin, cuadro azul, sino blanco
              (isAdmin || isBrigadier) ? '🟦' : '⬜'  // Si es admin o brigadier, cuadro azul, sino blanco
            ];
          })
        );
  
        // Establecer los datos formateados
        console.log("formattedData>>>> ", formattedData);
        setTableData(formattedData); 
        setRawUsers(users);
        setUserData(users[0]);
  
        // Verifica las tablas
        const roles = await db.getAllAsync('SELECT * FROM roles');
        console.log('ROLES--', roles);
  
        const dbUsers = await db.getAllAsync('SELECT * FROM users');
        console.log('USERS', dbUsers);
  
      } catch (e) {
        console.error("Error obteniendo usuarios: ", e);
      } finally {
        setIsLoading(false);
      }
    };
  
    getUsers();
  }, []);
  
  useEffect(() => {
    const executeDatabaseOperations = async () => {
        setIsLoading(false);
  };

  executeDatabaseOperations();

}, []);  

if (isLoading ){
  return (
    <Spinner/>
  )
}

  return (
    <View className="flex p-1 pt-7 bg-white justify-center items-center">
      <Text className="text-base font-bold mb-1">Lista comunidad UAM</Text>
      <View className="border-2 border-[#000000]">
        <Table borderStyle={{ borderWidth: 2, borderColor: '#000000' }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.headText} widthArr={widthArr} />
          <Rows data={tableData} textStyle={styles.text} widthArr={widthArr} />
        </Table>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  head: { height: 50, backgroundColor: '#ffffff' },
  headText: { margin: 10, fontSize: 16, fontWeight: 'bold' },
  text: { margin: 10, fontSize: 12 },
});
