import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function GoogleButton() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/google.png')}
        style={styles.logo} 
      />
      <Text style={styles.text}>Google</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#fff',
    padding: 10, 
    borderRadius: 10, 
    borderColor: "gray",
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    elevation: 5, 
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10, 
  },
  text: {
    fontFamily: 'FiraSans_900Black', 
    fontSize: 16, 
  },
});
