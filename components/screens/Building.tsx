import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import Input from '../atoms/Input';
import * as Tokens from '../tokens';
import { Picker } from '@react-native-picker/picker';
import { Row, Rows, Table } from 'react-native-table-component';
import CustomButton from '../atoms/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getInstitutionInfo } from '../../auth/institution';
import { getZones } from '../../auth/zones';

const Building = () => {
    //institutions props
    const [institutionName, setInstitutionName] = useState("");
    const [institutionDescription, setInstitutionDescription] = useState("");

    //zones props
    const [zones, setZones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateZone, setShowCreateZone] = useState(true);

    //table props
    const [tableData, setTableData] = useState<string[][]>([]);
    const [tableHead, setTableHead] = useState(['Salón', 'Código', 'Piso/Nivel', 'Descripción']); 
    const widthArr = [100, 100, 100, 170];

    // gestionar información de la institución
    const getInstitution = async () => {
        try {
            const token = await AsyncStorage.getItem('token'); 
            
            if (token ) {
                const institution = await getInstitutionInfo(token); 
                console.log('institution ', institution.data.name);
                setInstitutionName(institution.data.name);
                setInstitutionDescription(institution.data.description);
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
                console.log('zones meetpoints ', zonesData.data);
                setZones(zonesData.data); 
            }
            console.log('zones ', zones);
            
        } catch (error) {
            console.log('Error al obtener zonas:', error);
        } finally {
            setLoading(false); 
        }
    };
    
    useEffect(() => {
        getInstitution();
        fetchZones();
    }, []);

    return (
        <View>
            <Text>Institución</Text>
            <Input
                text={institutionName}
                autoCapitalize="none"
            />
            <TextInput
                placeholder={institutionDescription}
                placeholderTextColor={'#000000'}
                multiline
                style={styles.textArea}
                className={`${Tokens.TextAreaStyle}`}
            />
            <View style={Platform.OS === 'ios' ? styles.pickerContainerIos: styles.pickerContainerAndroid}>
                <Picker
                        onValueChange={(itemValue) => {
                            if (itemValue === "add_zone") {
                                onClose();
                                // Lógica para abrir la vista/agregar zona
                            } else {
                                onChange(itemValue);
                            }
                        }
                    }
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
                        /* pickerStyleType={{"basic"}} */
                        itemStyle={{
                            color: '#000',
                            textAlign: 'center',
                        }}
                        dropdownIconColor="#000"
                    >
                        {zones.length >0 ? (
                            zones.map((zone: any) => (
                                <Picker.Item key={zone.id} label={zone.name} value={zone.id.toString()} />
                            ))
                        ) : (
                            <Picker.Item label="Agregar zona" value="add_zone" />
                        )}
                </Picker>
            </View>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#000000' }}>
                <Row data={tableHead} style={styles.head} textStyle={styles.headText} widthArr={widthArr} />
                <Rows data={tableData} textStyle={styles.text} widthArr={widthArr} />
            </Table>
            <CustomButton 
                text="Añadir salón" 
                onPress={onClose} 
            />
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
    text: { margin: 10, fontSize: 12 },
})

export default Building;

