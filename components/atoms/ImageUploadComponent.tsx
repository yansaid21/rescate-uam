import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { UploadImageIcon } from './Icons';

interface ImageUploadComponentProps {
  onImageSelect: (imageUri: string) => void; // Callback to pass image URI to parent
}

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({ onImageSelect }) => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
        alert('Permission to access media library is required!');
        return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri); // Save image URI
            onImageSelect(result.assets[0].uri); // Pass image URI to parent
        }
    };

    return (
        <View className="items-center my-2 mb-5">
            <Pressable onPress={pickImage} className="items-center">
                {imageUri ? (
                <Image source={{ uri: imageUri }} className="w-24 h-24 rounded-lg" />
                ) : (
                <View className="items-center">
                    <UploadImageIcon size={32} color='gray' />
                    <Text>Cargar foto</Text>
                </View>
                )}
            </Pressable>
        </View>
    );
};

export default ImageUploadComponent;
