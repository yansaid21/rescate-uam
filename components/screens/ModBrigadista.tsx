import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { getAllUsers } from '../../auth/get';

export default function ModBrigadista() {
  const [tableData, setTableData] = useState([]);  

  
  const [tableHead, setTableHead] = useState(['Cedula', 'Nombre', 'Admin', 'Brigadier']); 
  const widthArr = [100, 100, 100, 100]; 

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await getAllUsers(); 

        
        const formattedData = users.map(user => {
          const idCard = user.id_card || 'N/A'; 
          const fullName = `${user.name || ''} ${user.last_name || ''}`.trim(); 
          
          const isAdmin = user.role && user.role.name === 'Administrator';
          const isBrigadier = user.role && user.role.name === 'Brigadier';

          
          return [
            idCard,
            fullName,
            isAdmin ? 'True' : 'False',  
            (isAdmin || isBrigadier) ? 'True' : 'False'  
          ];
        });
        
        setTableData(formattedData); 
      } catch (e) {
        console.log(e);
      }
    };
    getUsers();
  }, []);

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
