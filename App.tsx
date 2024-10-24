import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/screens/Main';
import Login from './components/screens/Login';
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect } from 'react';
import Register from './components/screens/Register';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Spinner from './components/molecules/Spinner';


export default function App() {

  const insets = useSafeAreaInsets()

  useEffect(()=>{
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  },[])
  useEffect(()=>{
    /* const unsubscribe; */
  })

  return (
    <SafeAreaProvider style={{ paddingBottom: insets.bottom, paddingTop: insets.top }}>
      <View style={styles.container}>
        {/* <Text>Hola</Text> */}
        <StatusBar style='auto'/>
        <Spinner/>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
