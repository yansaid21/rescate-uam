import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import CustomButton from '../atoms/CustomButton';
import MeetPoint from '../organisms/MeetPoint';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMeetPoints } from '../../auth/meetPoint';

interface MeetPoint {
    name: string;
    description: string;
    zones: [];
}

const MeetPointsList = () => {
    const [tableData, setTableData] = useState([]);
    const [tableHead, setTableHead] = useState(['Nombre', 'Zona', 'Descripción']); 
    const widthArr = [100, 100, 200];
    const [modalVisible, setModalVisible] = useState(false);

    const handleAddPoint = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false); 
    };

    const getMeetPointsList = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if(token){
                const meetPoints = await getMeetPoints(1, token); 
                console.log('meetPoints ', meetPoints.data);
                const formattedData = meetPoints.data.map((meetPoint: MeetPoint) => {
                    const zoneNames = meetPoint.zones.map((zone: { name: string }) => zone.name).join(', ');
                    return [
                        meetPoint.name,
                        zoneNames, 
                        meetPoint.description,
                    ];
                });
                setTableData(formattedData);
            }
        } catch (e) {
            console.log('Error en listar zonas MeetPointList', e);
        }
    };

    useEffect(() => {
        getMeetPointsList();
    }, []);

    return (
        <ScrollView horizontal>
            <View className='flex justify-center items-center flex-col p-1 pt-7'>
                <Text className="text-base font-bold mb-1">Puntos de encuentro</Text>
                <View className='mb-5 mt-5'>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#000000' }}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.headText} widthArr={widthArr} />
                        <Rows data={tableData} textStyle={styles.text} widthArr={widthArr} />
                    </Table>
                </View>
                <CustomButton text='Añadir punto' onPress={handleAddPoint}/>
                <MeetPoint visible={modalVisible} onClose={handleModalClose}/>
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
});

export default MeetPointsList;

