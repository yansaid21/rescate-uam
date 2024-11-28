import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

type CustomButtonProps = {
  number: string;
  text: string;
  href: string;
  color: string;
};

export default function SectionUsers({ number, text, href, color }: CustomButtonProps) {

  return (
    <View style={styles.container}>
      <Link href={href}>
        <View style={[styles.buttonContainer]}>
          <View style={styles.iconContainer}>
      <Text>{number}</Text>
          <Text style={styles.buttonText}>{text}</Text>
          <View style={[styles.colorIndicator, { backgroundColor: color }]} />
          </View>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  buttonContainer: {
    width: 352,
    height: 44, // Ajusta según tus necesidades
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Para Android
  },
  iconContainer: {
    width: 320,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
    borderRadius: 20,
    flexDirection: 'row',
    padding: 8,

  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  colorIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
