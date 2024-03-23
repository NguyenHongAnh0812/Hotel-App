import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen'
import LoadingScreen from './screens/LoadingScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomePageScreen from './screens/HomePageScreen';
import HotelDetailScreen from './screens/HotelDetailScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Loading' screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="HomePage" component={HomePageScreen} />
        <Stack.Screen name="HotelDetail" component={HotelDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
