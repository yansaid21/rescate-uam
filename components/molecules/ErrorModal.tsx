import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';

interface ErrorModalProps {
    visible: boolean;
    errorMessage: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ visible, errorMessage, onClose }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className='flex-1 justify-center items-center bg-black/50'>
                <View className='w-72 p-5 bg-white rounded-lg items-center'>
                    <Text className='mb-4 text-lg text-center'>
                        {errorMessage}
                    </Text>
                    <Pressable 
                        onPress={onClose}
                        className='p-[10px] rounded-[19px] w-[212px] h-[49px] bg-[#0069A3] justify-center items-center'
                    >
                        <Text className='text-lg font-bold text-center text-[#FFFFFF] text-shadow-custom'>Cerrar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}


export default ErrorModal;
