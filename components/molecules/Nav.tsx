import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserInfo } from '../../auth/get'; 

const Navbar: React.FC = () => {
  const [role, setRole] = useState<number | null>(null);

  useEffect(() => {
    const loadUserRole = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const id_user = await AsyncStorage.getItem('id');

        if (token && id_user) {
          const rawUser = await getUserInfo( Number(id_user), token); 
          /* console.log('rawUser en el nav', rawUser); */
          
          const user= rawUser.data;
          if (user) {
              if (user.role.id === 1) {
                setRole(1); 
              } else if (user.role.id === 2) {
                setRole(2); 
              } else {
                setRole(3); 
              }
              /* console.log('role del usuario en el nav', role); */
            
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
            <Link href={role === 1 ? "/loggedIn/main": "/loggedIn/emergency"}>
              <Icon name="notifications" size={30} className="m-3" color="#fff" />
            </Link>
          </TouchableOpacity>

          {/* Condicional para mostrar el botón de crudBrigadist */}
          {(role === 1 || role === 2) && (
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
