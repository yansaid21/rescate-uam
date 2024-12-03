import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProtocolsInfo } from '../../auth/protocols';
import Spinner from "../molecules/Spinner";

interface Protocol {
    id: number;
    name: string;
    description: string;
}

interface ProtocolsViewProps {
    idInstitution: number; // ID de la institución
    idRiskSituation: number; // ID del riesgo
}

const ProtocolsView: React.FC<ProtocolsViewProps> = ({ idRiskSituation }) => {
    const [protocols, setProtocols] = useState<Protocol[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProtocols = async () => {
            try {
                setLoading(true);
                const token = await AsyncStorage.getItem('token'); 
                if (token) {
                    const protocolsData = await getProtocolsInfo(1, token, 1);
                    console.log('protocolsData ', protocolsData);
                    
                    setProtocols(protocolsData.data); // Establecer los protocolos obtenidos.
                }
            } catch (error) {
                console.error('Error fetching protocols:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProtocols();
    }, [ idRiskSituation]);

    return (
        <View style={styles.container}>
            {loading ? (
                <Spinner />
            ) : protocols.length > 0 ? (
                <FlatList
                    data={protocols}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.protocolItem}>
                            <View style={styles.protocolTextContainer}>
                                <Text style={styles.protocolName}>{item.name}</Text>
                                <Text style={styles.protocolDescription}>{item.content}</Text>
                            </View>
                            <Image source={require('../../assets/Protocols/protocolImage.png')} style={styles.protocolImage} />
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noProtocolsText}>No se encontraron protocolos para este riesgo.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
    noProtocolsText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#999',
    },
    protocolItem: {
        flexDirection: 'column',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    protocolImage: {
        width: 300,
        height: 240,
        borderRadius: 8,
        marginTop: 10,
    },
    protocolTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    protocolName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10
    },
    protocolDescription: {
        fontSize: 18,
        color: '#666',
        textAlign: 'justify',
        marginTop: 4,
        marginBottom: 10
    },
});

export default ProtocolsView;
