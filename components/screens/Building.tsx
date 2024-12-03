import React, { useEffect, useRef, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import Input from '../atoms/Input';
import * as Tokens from '../tokens';
import { Picker } from '@react-native-picker/picker';
import { Row, Rows, Table } from 'react-native-table-component';
import CustomButton from '../atoms/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getInstitutionInfo, putInstitutionInfo } from '../../auth/institution';
import { getZones } from '../../auth/zones';
import { getRoomsInfo as fetchRooms } from '../../auth/room';
import Room from '../organisms/Room';

interface Room {
    name: string;
    description: string;
    code: string;
    zones: number;
    level_id: number;
}

const Building = () => {
    //institutions props
    const [institutionName, setInstitutionName] = useState("");
    const [institutionDescription, setInstitutionDescription] = useState("");
    const [initialName, setInitialName] = useState("");
    const [initialDescription, setInitialDescription] = useState("");

    //zones props
    const [zones, setZones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateZone, setShowCreateZone] = useState(true);
    const [selectedZone, setSelectedZone] = useState<string | null>(null);

    //table props
    const [tableData, setTableData] = useState<string[][]>([]);
    const [tableHead, setTableHead] = useState(['Salón', 'Código', 'Piso/Nivel', 'Descripción']); 
    const widthArr = [70, 80, 100, 110];

    //rooms props
    const [showCreateRoom, setShowCreateRoom] = useState(false);
    const [selectedZoneId, setSelectedZoneId] = useState("");

    // Flags para detectar edición
    const isEdited = useRef(false);

    // gestionar información de la institución
    const getInstitution = async () => {
        try {
            const token = await AsyncStorage.getItem('token'); 
            
            if (token ) {
                const institution = await getInstitutionInfo(token); 
                //console.log('institution ', institution.data.name);
                setInstitutionName(institution.data.name);
                setInstitutionDescription(institution.data.description);
                setInitialName(institution.data.name);
                setInitialDescription(institution.data.description);
            }
        } catch (error) {
            console.error("Error al obtener la información de los riesgos:", error);
        }
    }

    //obtener zonas
    const fetchZones = async () => {
        setLoading(true); 
        console.log("estoy en fetchZones");
        
        try {
            const token = await AsyncStorage.getItem('token');
            console.log('token ', token);
            
            if (token) {
                const zonesData = await getZones(1, token);
                console.log('zones build ', zonesData.data);
                setZones(zonesData.data); 
            }
            console.log('zones ', zones);
            
        } catch (error) {
            console.log('Error al obtener zonas:', error);
        } finally {
            setLoading(false); 
        }
    };

    //obtener salones
    const getRooms = async (zoneId: string) => {
        setTableData([]); // Limpiar tabla antes de cargar datos.
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const rooms = await fetchRooms(1, token, Number(zoneId)); 
                console.log('rooms ', rooms.data);
                
                if (rooms.data.length > 0) {
                    const formattedData = rooms.data.map((room: Room) => [
                        room.name,
                        room.code,
                        room.level_id.toString(),
                        room.description,
                    ]);
                    setTableData(formattedData);
                } else {
                    setTableData([['No hay salones disponibles', '', '', '']]);
                }
            }
        } catch (error) {
            console.error("Error al obtener salones:", error);
            setTableData([['Error al cargar salones', '', '', '']]);
        }
    };

    //modal de crear las zonas
    const handleModalClose = () => {
        setShowCreateZone(false); 
    };

    //modal crear salones
    const handleAddRoom = () => {
        setShowCreateRoom(true);
    };
    const closeRoom = () => {
        setShowCreateRoom(false);
    };
    
    useEffect(() => {
        getInstitution();
        fetchZones();
    }, []);

    return (
        <View className='flex justify-center items-center flex-col p-1 pt-7 m-5'>
            <Text className="text-base font-bold mb-4">Institución</Text>
            <View className='m-3'>
                <Input
                    text={institutionName}
                    autoCapitalize="none"
                />
            </View>
            <View className='m-3'>
                <TextInput
                    placeholder={institutionDescription}
                    placeholderTextColor={'#000000'}
                    multiline
                    style={styles.textArea}
                    className={`${Tokens.TextAreaStyle}`}
                />
            </View>
            <View style={Platform.OS === 'ios' ? styles.pickerContainerIos: styles.pickerContainerAndroid}>
                <Picker
                    onValueChange={async (itemValue: string) => {
                        if (itemValue === "add_zone") {
                            handleModalClose(); // Abre el modal para agregar una zona.
                        } else {
                            setSelectedZone(itemValue);
                            await getRooms(itemValue);
                        }
                    }}
                    mode="dialog"
                    prompt="Zona"
                    style={{
                        height: 100,
                        width: '108%',
                        backgroundColor: 'transparent',
                        color: '#000',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    itemStyle={{
                        color: '#000',
                        textAlign: 'center',
                    }}
                    dropdownIconColor="#000"
                >
                    <Picker.Item label="Agregar zona" value="add_zone" />
                    {zones.map((zone: any) => (
                        <Picker.Item key={zone.id} label={zone.name} value={zone.id.toString()} />
                    ))}
                </Picker>
            </View>
            <View className='m-5'>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#000000' }}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.headText} widthArr={widthArr} />
                    {loading ? (
                        <Text style={[styles.text, { textAlign: 'center', marginTop: 10 }]}>
                            Cargando datos...
                        </Text>
                    ) : tableData.length === 0 ? (
                        <Row
                            data={['No hay salones disponibles']}
                            style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}
                            textStyle={StyleSheet.flatten([styles.text, { textAlign: 'center', flex: 1 }])}
                            widthArr={[widthArr.reduce((acc, width) => acc + width, 0)]} // Ocupa todo el ancho
                        />
                    ) : (
                        <Rows data={tableData} textStyle={styles.text} widthArr={widthArr} />
                    )}
                </Table>
            </View>
            <CustomButton 
                text="Añadir salón" 
                onPress={handleAddRoom}
            />
            {showCreateRoom && <Room visible={true} onClose={closeRoom} />}
        </View>
    );
}

const styles = StyleSheet.create({
    textArea: {
        textAlignVertical: 'top', 
        padding: 15
    },
    pickerContainerIos:{
        marginVertical: 40, 
        width: 300,         
        height: 50,         
        borderRadius: 10,   
        paddingHorizontal: 2, 
        backgroundColor: '#D9D9D9', 
        display: 'flex',    
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    pickerContainerAndroid:{
        marginVertical: 8, 
        width: 300,         
        height: 50,         
        borderRadius: 10,   
        paddingHorizontal: 2, 
        backgroundColor: '#D9D9D9', 
        display: 'flex',    
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    head: { height: 50, backgroundColor: '#ffffff' },
    headText: { margin: 10, fontSize: 16, fontWeight: 'bold' },
    text: {
        margin: 10,
        fontSize: 12,
        textAlign: 'left', // Cambia si lo necesitas.
    },
})

export default Building;

