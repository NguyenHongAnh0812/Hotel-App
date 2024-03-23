import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Text, Input } from 'react-native-elements';
import { AntDesign } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const handleResetPassword = () => {
    // TODO: Xử lý khôi phục mật khẩu
    alert('Yêu cầu khôi phục mật khẩu đã được gửi!');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={{fontSize:15, color:'#a9a9a9', marginBottom:20,textAlign:'center',alignSelf:'flex-start',marginLeft:10,}}>Enter your Email to reset your password</Text>
      <Input
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        Style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Khôi phục mật khẩu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
        <AntDesign name="arrowleft" size={24} color="#000" />
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 16,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        marginTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign:'center',
        alignSelf:'flex-start',
        marginLeft:10,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    button: {
      width: '80%',
      height: 50,
      borderRadius: 10,
      backgroundColor: '#007bff',
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },
    backButtonText: {
      marginLeft: 5,
      fontSize: 16,
    },
  });

export default ForgotPasswordScreen;