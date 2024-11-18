import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllUsers } from '../../auth/get'; 

const Navbar: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loadUserRole = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const id_user = await AsyncStorage.getItem('id');

        if (token && id_user) {
          const users = await getAllUsers();

         
          if (users) {
       
            const user = users.find((u: any) => u.id === Number(id_user));

            console.log("Usuario actual:", user); 

            if (user) {
              if (user.role.id === 1) {
                setRole('administrator'); 
              } else if (user.role.id === 2) {
                setRole('brigadier'); 
              } else {
                setRole('finalUser'); 
              }
            }
          } else {
            console.error("No se pudieron obtener los usuarios.");
          }
        }
      } catch (error) {
        console.error("Error al cargar el rol del usuario:", error);
      }
    };

    loadUserRole();
  }, []);

  return (
    <View className="px-5 bg-customBlue rounded-bl-[30px] rounded-br-[30px]">
      <View className="h-9"></View>
      <View style={styles.navbar}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <Link href="/loggedIn/main">
              <Icon name="notifications" size={30} className="m-3" color="#fff" />
            </Link>
          </TouchableOpacity>

          {/* Condicional para mostrar el botón de crudBrigadist */}
          {(role === 'administrator' || role === 'brigadier') && (
            <TouchableOpacity>
              <Link href="/loggedIn/usersStatus">
                <Icon name="insert-chart-outlined" type="material" size={30} className="m-3" color="#fff" />
              </Link>
            </TouchableOpacity>
          )}

          <TouchableOpacity>
            <Link href="/loggedIn/menu">
              <Icon name="menu" size={30} className="m-3" color="#fff" />
            </Link>
          </TouchableOpacity>
          <TouchableOpacity>
            <Link href="/loggedIn/account">
              <Icon name="account-circle" size={30} className="m-3" color="#fff" />
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 0,
  },
  iconsContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Navbar;
