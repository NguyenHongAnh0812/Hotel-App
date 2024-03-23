import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    // Ẩn splash screen sau khi component được render
    // SplashScreen.hide();

    // Chuyển đến trang welcome sau 3 giây
    const timer = setTimeout(() => {
      navigation.replace('Welcome'); // Thay thế 'WelcomeScreen' bằng tên của trang welcome của bạn
    }, 3000);

    // Xóa timer khi component bị unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default LoadingScreen;