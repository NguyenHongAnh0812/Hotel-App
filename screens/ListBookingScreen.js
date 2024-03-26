import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
const ListBookingScreen = () => {
    const navigation=useNavigation();
    const bestHotels = [
        {
          id: 1,
          source: {
            uri: "https://duonggiahotel.vn/wp-content/uploads/2023/01/4048e2d8302ae874b13b.jpg",
          },
          name: "Luxyry Hotel",
          rating: 3,
          location: "Đà Nẵng, Việt Nam",
          price: 100,
          review : "3.0 (115 Review)"
        },
        {
          id: 2,
          source: {
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9eEaU609SDeE9dkm0aCgu9yp7DvhB1qfn0Cyr3aK8A&s",
          },
          name: "Pro Hotel",
          location: "Vũng Tàu, Việt Nam",
          rating: 4,
          price: 120,
          review : "4.0 (96 Review)"
        },
        {
          id: 3,
          source: {
            uri: "https://thanhnien.mediacdn.vn/Uploaded/ttt/images/Content/tan-huong/xach-vali-di/2016_12_w2/rex_hotel/Exterior_Rex_9.jpg",
          },
          name: "Armani Hotel",
          location: "Quất Lâm, Giao Thuỷ, Nam Định, Việt Nam",
          rating: 5,
          price: 150,
          review : "5.0 (60 Review)"
        },
        {
          id: 4,
          source: {
            uri: "https://fantasea.vn/wp-content/uploads/2017/10/khach-san-pullman-ha-noi.jpg",
          },
          name: "Kasbah Du Toubkal Hotel",
          location: "Phố Cổ, Hà Nội, Việt Nam",
          rating: 3,
          price: 200,
          review : "3.0 (120 Review)"
        },
        {
          id: 5,
          source: {
            uri: "https://motortrip.vn/wp-content/uploads/2022/03/khach-san-15.jpg",
          },
          name: "Orson Hotel",
          location: "TP.Hồ Chí Minh, Việt Nam",
          rating: 4,
          price: 250,
          review : "4.0 (200 Review)"
        },
      ];
  const bestHotels1 = [
    {
        id: 1,
        source: {
          uri: "https://fantasea.vn/wp-content/uploads/2017/10/khach-san-pullman-ha-noi.jpg",
        },
        name: "Kasbah Du Toubkal Hotel",
        location: "Phố Cổ, Hà Nội, Việt Nam",
        rating: 3,
        price: 200,
        review : "3.0 (120 Review)"
      },
      {
        id: 2,
        source: {
          uri: "https://motortrip.vn/wp-content/uploads/2022/03/khach-san-15.jpg",
        },
        name: "Orson Hotel",
        location: "TP.Hồ Chí Minh, Việt Nam",
        rating: 4,
        price: 250,
        review : "4.0 (200 Review)"
      },
  ];
  const [chose, setChose] = useState(true);
  const handlePress = () => {
    setChose(!chose); // Toggle the value of `chose` when the button is pressed
  };
  const handleBack = () => {
    navigation.navigate('HomePage');
  }
  const renderHotels = ({ item }) => (
    <View key={item.id} style={styles.hotelItem1}>
      <Image source={item.source} style={styles.hotelImage1} />
      <View style={styles.hotelTitle}>
        <View style={styles.hotelRating1}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star}>
              <Icon
                name={star <= item.rating ? "star" : "star-o"}
                size={18}
                color={star <= item.rating ? "gold" : "gray"}
              />
            </TouchableOpacity>
          ))}
          <Text style={{ marginLeft: 10 }}>{item.review}</Text>
        </View>
        <Text style={styles.hotelName1}>{item.name}</Text>
        <View style={styles.locationContainer1}>
          <Icon name="map-marker" size={16} color="gray" />
          <Text style={styles.locationText1}>{item.location}</Text>
        </View>
        <Text style={styles.hotelPrice1}>${item.price}/night</Text>
      </View>
      <TouchableOpacity style={styles.bookButton1}>
        <Text style={styles.bookButtonText1}>View Detail</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookButton2}>
        <Text style={styles.bookButtonText2}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  const renderHotels1 = ({ item }) => (
    <View key={item.id} style={styles.hotelItem1}>
      <Image source={item.source} style={styles.hotelImage1} />
      <View style={styles.hotelTitle}>
        <View style={styles.hotelRating1}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star}>
              <Icon
                name={star <= item.rating ? "star" : "star-o"}
                size={18}
                color={star <= item.rating ? "gold" : "gray"}
              />
            </TouchableOpacity>
          ))}
          <Text style={{ marginLeft: 10 }}>{item.review}</Text>
        </View>
        <Text style={styles.hotelName1}>{item.name}</Text>
        <View style={styles.locationContainer1}>
          <Icon name="map-marker" size={16} color="gray" />
          <Text style={styles.locationText1}>{item.location}</Text>
        </View>
        <Text style={styles.hotelPrice1}>${item.price}/night</Text>
      </View>
      <TouchableOpacity style={styles.bookButton1}>
        <Text style={styles.bookButtonText1}>Book Again</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookButton2}>
        <Text style={styles.bookButtonText2}>Write a Review</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Bookings</Text>
      <Icon onPress={handleBack} name="arrow-left" size={25} color="black" style={{position:'absolute', top:40,left:30,}} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            backgroundColor: chose ? "#007bff" : "#a9a9a9",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            width: 170,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handlePress}
        >
          <Text
            style={{
              color: chose ? "white" : "black",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: chose ? "#a9a9a9" : "#007bff", 
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            width: 170,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handlePress}
        >
          <Text
            style={{
              color: chose ? "black" : "white", 
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {
            chose ? bestHotels.map((item) => renderHotels({ item, key: item.id })) : bestHotels1.map((item) => renderHotels1({ item, key: item.id }))
        }
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  headerTitle: {
    padding: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  bookButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 170,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  hotelItem1: {
    flexDirection: "row",
    alignSelf: "center",
    width: "90%",
    height: 220,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 10,
  },
  hotelImage1: {
    width: "30%",
    height: "60%",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  hotelTitle: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // padding: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: "70%",
  },
  hotelName1: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  locationContainer1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationText1: {
    marginLeft: 4,
    fontSize: 14,
    color: "gray",
  },
  hotelRating1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  starIcon1: {
    width: 16,
    height: 16,
    marginRight: 4,
    resizeMode: "contain",
  },
  hotelPrice1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 10,
  },

  bookButton1: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: "absolute",
    bottom: 10,
    right: 45,
    width: 120,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  bookButtonText1: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bookButton2: {
    backgroundColor: "#d9d9d9",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: "absolute",
    bottom: 10,
    left: 45,
    width: 120,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  bookButtonText2: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ListBookingScreen;
