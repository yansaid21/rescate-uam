import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'

const Navbar: React.FC = () => {
  return (
    <View style={styles.navbar}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Icon name="notifications"  size={30} style={styles.icon}   color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="insert-chart-outlined" // Nombre del icono
        type="material" size={30} style={styles.icon} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="menu" size={30} style={styles.icon} color="#fff" />
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    width:'100%',
    display:"flex",
    backgroundColor: '#0069A3',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',

    borderBottomLeftRadius: 15,  
    borderBottomRightRadius: 15,
    marginTop:0
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: "100%", 
  },
  icon:{
    margin:10

  }
});

export default Navbar;
