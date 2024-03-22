import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    // Kiểm tra tên người dùng và mật khẩu ở đây
    if (username === "admin" && password === "password") {
      Alert.alert("Đăng nhập thành công");
    } else {
      Alert.alert("Đăng nhập thất bại");
    }
  };

  const handleCreateAccount = () => {
    // Điều hướng sang trang đăng ký
    navigation.navigate("Register");
  };

  const handleGoogleLogin = () => {
    // Xử lý đăng nhập bằng Google
    Alert.alert("Đăng nhập bằng Google");
  };

  const handleFacebookLogin = () => {
    // Xử lý đăng nhập bằng Facebook
    Alert.alert("Đăng nhập bằng Facebook");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Let's get you Login!</Text>
      <Text style={{fontSize:15, color:'#a9a9a9', marginBottom:20}}>Enter your information below</Text>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleGoogleLogin}
        >
          <Text style={styles.socialButtonText}>
            <Icon
              name="google"
              size={20}
              color="#4285F4"
              style={{ justifyContent:'center',alignItems:'center' }}
            />
            {" "}  Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleFacebookLogin}
        >
          <Text style={styles.socialButtonText}>
            <Icon
              name="facebook"
              size={20}
              color="#1877F2"
              style={{ justifyContent:'center',alignItems:'center' }}
            /> 
            {" "}  Facebook
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{fontSize:15,textAlign:'center',alignSelf:'center'}}>Or login with</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.createAccountText}>
        Don't have an account?{" "}
        <Text onPress={handleCreateAccount} style={styles.createAccountLink}>
          Register Now
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    borderRadius: 8,
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  createAccountText: {
    marginTop: 12,
    color: "#007bff",
    fontSize: 16,
    textDecorationLine: "underline",
    marginTop:30,
    textAlign: "center",
    alignSelf: "center",
  },
  socialButtonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    marginBottom: 20,
    flex: 1,
  },
  socialButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
