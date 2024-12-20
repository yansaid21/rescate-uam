import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';
import CustomButton from '../atoms/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getIncidents } from '../../auth/incident';

interface Incident {
    incident: string;
    description: string;
    risk_situation: {
        name: string;
    };
    initial_date: string; // Fecha y hora en formato "YYYY-MM-DD HH:mm:ss"
    final_date: string;   // Fecha y hora en formato "YYYY-MM-DD HH:mm:ss"
}

const IncidentsList = () => {
    const [tableData, setTableData] = useState<string[][]>([]);
    const [tableHead, setTableHead] = useState(['Incidente', 'Fecha', 'Hora Inicio - Fin']); 
    const widthArr = [100, 100, 170];
    
    const [filteredData, setFilteredData] = useState<string[][]>([]);
    const [searchText, setSearchText] = useState('');
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

    const handleSearch = (text: string) => {
        setSearchText(text);
        if (text.trim() === '') {
            setFilteredData(tableData);
        } else {
            const lowercasedText = text.toLowerCase();
            const filtered = tableData.filter((row) =>
                row[0].toLowerCase().includes(lowercasedText)
            );
            setFilteredData(filtered);
        }
    };

    useEffect(() => {
        setFilteredData(tableData);
    }, [tableData]);

    const handleRowPress = (index: number) => {
        const incident = tableData[index];
        if (incident) {
            // Aquí puedes buscar el incidente completo usando el índice o algún identificador
            Alert.alert('Detalles del Incidente', `Incidente: ${incident[0]}\nFecha: ${incident[1]}\nHora: ${incident[2]}`);
            // Si necesitas más información del incidente puedes obtenerla desde otro lugar o almacenarla en el estado
        }
    };

    const getIncidentsList = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if(token){
                const incidents = await getIncidents(token); 
                console.log('incidents ', incidents.data);
                const formattedData = incidents.data.map((incident: Incident) => {
                    return [
                        incident.risk_situation.name,
                        incident.initial_date.split(' ')[0],
                        `${incident.initial_date.split(' ')[1]} - ${incident.final_date.split(' ')[1]}`,
                    ];
                });
                setTableData(formattedData);
            }
        } catch (e) {
            console.log('Error en listar incidents', e);
        }
    };

    useEffect(() => {
        getIncidentsList();
    }, []);
    
    return (
        <ScrollView>
            <View className='flex justify-center items-center flex-col p-1 pt-7 m-5'>
                <Text className="text-base font-bold mb-1">Lista de incidentes</Text>
                <TextInput
                    style={{
                        height: 49,
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginBottom: 10,
                        paddingHorizontal: 10,
                        borderRadius: 40,
                        marginTop: 10
                    }}
                    placeholder="Buscar por nombre del riesgo"
                    value={searchText}
                    onChangeText={handleSearch}
                />
                <View className='mb-5 mt-5'>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#000000' }}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.headText} widthArr={widthArr} />
                        {filteredData.map((rowData, index) => (
                            <Row 
                                key={index} 
                                data={rowData} 
                                textStyle={styles.text} 
                                widthArr={widthArr} 
                                onPress={() => handleRowPress(index)} // Agregar evento onPress
                                style={{ cursor: 'pointer' }} // Estilo opcional para indicar que es clickeable
                            />
                        ))}
                    </Table>
                </View>
                {/* <CustomButton text='Ver Información' onPress={() => handleAddPoint()}/> */}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    head: { height: 50, backgroundColor: '#ffffff' },
    headText: { margin: 10, fontSize: 16, fontWeight: 'bold' },
    text: { margin: 10, fontSize: 12 },
})

export default IncidentsList;