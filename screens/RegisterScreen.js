import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  CheckBox,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const handleRegister = () => {
    Alert.alert("Bạn đã đăng ký tài khoản thành công. Hãy đăng nhập nào !");
    navigation.navigate("Login");
  };
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Register Now!</Text>
      <Text style={{ fontSize: 15, color: "#a9a9a9", marginBottom: 20 }}>
        Enter your information below
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        // onChangeText={handlePhoneNumberChange}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.createAccountText}>
        Already a member?{" "}
        <Text onPress={handleLogin} style={styles.createAccountLink}>
          Login
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
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
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
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
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotpasswordText: {
    color: "#007bff",
    fontSize: 16,
    textDecorationLine: "none",
    marginTop: 10,
    textAlign: "center",
    alignSelf: "flex-end",
  },
  createAccountText: {
    marginTop: 10,
    marginBottom: 20,
    color: "#000000",
    fontSize: 16,
    textDecorationLine: "none",
    marginTop: 30,
    textAlign: "center",
    alignSelf: "center",
  },
  createAccountLink: {
    color: "#007bff",
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

export default RegisterScreen;
