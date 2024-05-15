import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";

const WelcomeScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Điều hướng sang trang đăng nhập
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  const swiperRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.scrollBy(1); // Chuyển slide sang phải
      }
    }, 5000); // 5000ms (5 giây)

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Swiper ref={swiperRef} style={{ marginTop: 50 }}>
        <View style={styles.slide}>
          <Image
            source={{
              uri: "https://q-xx.bstatic.com/xdata/images/hotel/max500/410049543.jpg?k=f63ff599d15aebe35de9a92d0f147ffcbf7a48d82b198ffafcf33772bfe871af&o=",
            }} // URL của hình ảnh trên mạng
            style={{ width: "100%", height: "90%", borderRadius: 20 }} // Kích thước của hình ảnh
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: "https://kingdomhotel.vn/wp-content/uploads/2021/02/Avatar-KD.png",
            }} // URL của hình ảnh trên mạng
            style={{ width: "100%", height: "90%", borderRadius: 20 }} // Kích thước của hình ảnh
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/410049541.jpg?k=ce6c7ec9674e5f6e09ba64c532f6d2b228d5416151a41aa236fab6ba29325731&o=&hp=1",
            }} // URL của hình ảnh trên mạng
            style={{ width: "100%", height: "90%", borderRadius: 20 }} // Kích thước của hình ảnh
          />
        </View>
      </Swiper>
      <Text style={styles.title}>Welcome to our application!</Text>
      <Text style={styles.subtitle}>Start exploring now!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            width: "60%",
            height: "40%",
            borderRadius: 20,
            borderColor: "#007bff",
            backgroundColor: "#007bff",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleLogin}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            Get Start -&gt;
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    // marginTop: 50,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#888888",
    marginBottom: 32,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default WelcomeScreen;
