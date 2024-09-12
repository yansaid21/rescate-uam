import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/screens/Main';
import Login from './components/screens/Login';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect } from 'react';
import { FiraSans_400Regular,FiraSans_900Black } from '@expo-google-fonts/fira-sans';
import Register from './components/screens/Register';

export default function App() {
  const [fontsLoaded] = useFonts({
    FiraSans_400Regular,
    FiraSans_900Black,
/*     FiraSans_Regular: require("./assets/fonts/FiraSans-Regular.otf") */
  })

useEffect(()=>{
  async function prepare() {
    await SplashScreen.preventAutoHideAsync();
  }
  prepare();
},[])

const onLayout = useCallback(async () =>{
if(fontsLoaded){
  await SplashScreen.hideAsync();
}
}, [fontsLoaded])
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container} onLayout={onLayout}>
      {/* <Text>Hola</Text> */}
      <StatusBar style='auto'/>
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily:'FiraSans_900Black',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
