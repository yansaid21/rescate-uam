import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar,SafeAreaView } from "react-native";
import TypeEmergencyButton from "../atoms/TypeEmergencyButton";
import Navbar from "../molecules/Nav";
import { BigEmergencyButton } from "../atoms/BigEmergencyButton";
import RedBrigadistaButton from "../atoms/RedBrigadistaButton"
import ModBrigadistaButton from "../atoms/ModBrigadistaButton"
import CompleteRegister from "../organisms/CompleteRegister";
import CustomButton from "../atoms/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from "../../auth/get";

export default function Main() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const checkUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); 
      const id_user = await AsyncStorage.getItem('id'); 

      console.log('id en main ', id_user);
      console.log('token en main ', token);
      

      if (token && id_user) {
        const user = await getUserInfo(Number(id_user), token); 
        console.log('user en main ', user);
        
        if (user && user.data) {
          console.log('user data en main ', user.data);
          setUserData(user);
          if (!user.data.rhgb || !user.data.social_security || !user.data.phone_number) {
            setModalVisible(true); 
          }
        }
      }

    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  useEffect(() => {
    checkUserInfo();
  }, []);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View className="h-full " >  
      
      <View className=" justify-center items-center pt-12">
        <View className="pb-4" >
        <BigEmergencyButton/>
        </View>
        <View className="p-5">
        <TypeEmergencyButton text="Evacuación" />
        </View>
        <View className="p-5">
        <TypeEmergencyButton text="Incendio" />
        </View>
        <View className="p-5">
        <TypeEmergencyButton text="Sismo" />
        </View>
      </View>
      <CompleteRegister visible={modalVisible} onClose={handleCloseModal} />
    </View>
  );
}
