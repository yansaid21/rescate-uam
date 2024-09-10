import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'

const Navbar: React.FC = () => {
  return (
    <View style={styles.navbar}>
      <View style={styles.iconsContainer}>
        <View style={styles.iconsStyle}>
        <TouchableOpacity>
          <Icon name="notifications" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="insert-chart-outlined" // Nombre del icono
        type="material" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="menu" size={30} color="#fff" />
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
    backgroundColor: '#0069A3',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,  // Agrega el borde redondeado en la esquina inferior izquierda
    borderBottomRightRadius: 15,
    marginTop:0
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: "100%", // Ajusta el ancho según la separación deseada
  },
  iconsStyle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
  }
});

export default Navbar;
