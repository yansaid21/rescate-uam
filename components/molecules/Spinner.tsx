import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const NewtonsCradle = () => {
  const swingAnim1 = useRef(new Animated.Value(0)).current;
  const swingAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación del primer punto
    const swing1 = Animated.loop(
      Animated.sequence([
        Animated.timing(swingAnim1, {
          toValue: 70,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(swingAnim1, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    // Animación del último punto
    const swing2 = Animated.loop(
      Animated.sequence([
        Animated.timing(swingAnim2, {
          toValue: -70,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(swingAnim2, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    swing1.start();
    swing2.start();

    return () => {
      swing1.stop();
      swing2.stop();
    };
  }, [swingAnim1, swingAnim2]);

  // Interpolaciones para la rotación de los puntos
  const swing1Style = {
    transform: [
      {
        rotate: swingAnim1.interpolate({
          inputRange: [0, 70],
          outputRange: ['-70deg', '0deg'],
        }),
      },
    ],
  };

  const swing2Style = {
    transform: [
      {
        rotate: swingAnim2.interpolate({
          inputRange: [-70, 0],
          outputRange: ['70deg', '0deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.cradleContainer}>
      {/* Primer punto animado */}
      <Animated.View style={[styles.dotContainer, swing1Style]}>
        <View style={styles.dot} />
      </Animated.View>
      {/* Puntos fijos */}
      <View style={styles.dotContainer}>
        <View style={styles.dot} />
      </View>
      <View style={styles.dotContainer}>
        <View style={styles.dot} />
      </View>
      {/* Último punto animado */}
      <Animated.View style={[styles.dotContainer, swing2Style]}>
        <View style={styles.dot} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cradleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200, // Ajusta el tamaño del cradle según lo desees
    height: 100,
  },
  dotContainer: {
    width: 25, // Ajusta el tamaño de cada punto
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dot: {
    width: 20, // Tamaño de los puntos
    height: 20,
    borderRadius: 10,
    backgroundColor: '#474554',
  },
});

export default NewtonsCradle;
