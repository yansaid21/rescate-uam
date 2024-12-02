import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Risk from '../../components/organisms/Risk';

const CreateRisk = () => {
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        setModalVisible(true); // Mostrar el modal automáticamente
    }, []); // El arreglo vacío asegura que se ejecute solo al cargar el componente

    // Función para cerrar el modal
    const closeModal = () => {
        setModalVisible(false);
    };
    return (
        <View style={styles.container}>
            {/* Mostrar el modal */}
            <Risk visible={modalVisible} onClose={closeModal} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default CreateRisk;
