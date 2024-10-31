import React from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../atoms/CustomButton';
import ImageUploadComponent from '../atoms/ImageUploadComponent';

interface EditImageProps {
    visible: boolean;
    onClose: () => void;
    onImageSelect: (imageUri: string) => void;
}

const EditImage: React.FC<EditImageProps> = ({ visible, onClose, onImageSelect }) => {
    
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Modal
                    transparent={true}
                    visible={visible}
                    animationType="slide"
                    onRequestClose={onClose}
                >
                    <View style={styles.overlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.title}>Cambia tu foto</Text>
                            
                            <ImageUploadComponent onImageSelect={onImageSelect} />

                            <CustomButton 
                                text="Guardar" 
                                onPress={onClose} 
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 350,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0090D0',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default EditImage;
