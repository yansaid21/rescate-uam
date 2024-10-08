import { Link } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Image } from 'react-native-elements'

const Navbar: React.FC = () => {
  return (
    <View className='px-5 bg-customBlue rounded-bl-[30px] rounded-br-[30px]'>
      <View className='h-9'>
      </View>
    <View style={styles.navbar}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Link href='/loggedIn/main'>
          <Icon name="notifications"  size={30} className='m-3'   color="#fff" />
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href="/loggedIn/crudBrigradist">
          <Icon name="insert-chart-outlined"
        type="material" size={30} className='m-3' color="#fff" />
        </Link>
        </TouchableOpacity>
        <TouchableOpacity>
          <Link href='/loggedIn/menu'>
          <Icon name="menu" size={30} className='m-3' color="#fff" />
          </Link>
        </TouchableOpacity>
        <TouchableOpacity>

          <Link href='/loggedIn/account'>
          <Icon name='account-circle'size={30} className='m-3' color="#fff"/>
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
    width:'100%',
    display:"flex",
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',

    marginTop:0
  },
  iconsContainer: {
    display:"flex",
    alignItems:"center",
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Navbar;
