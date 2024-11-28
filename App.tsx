import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/screens/Main';
import Login from './components/screens/Login';
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react';
import Register from './components/screens/Register';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Spinner from './components/molecules/Spinner';
import { usePushNotifications } from './usePushNotifications';

export default function App() {
  const {expoPushToken, notification} =usePushNotifications()


  const data = JSON.stringify(notification, undefined, 2);
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
        <Text>Token: {expoPushToken?.data ?? ""}</Text>
        <Text>Notification: {data}</Text>
        {/* <Text>Hola</Text> */}
        <StatusBar style='auto'/>
        <Login/>
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
