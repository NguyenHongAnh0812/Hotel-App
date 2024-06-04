import React, { useState, useEffect } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
const ListBookingScreen = () => {
  const ip = "172.20.10.2";
  const navigation = useNavigation();
  const [bestHotels, setBestHotels] = useState([]);
  const [bestHotels1, setBestHotels1] = useState([]);
  const fetchData = () => {
    fetch(`http://${ip}:3000/listbookingupcoming/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setBestHotels(data); // Cập nhật state bestHotels với dữ liệu từ API endpoint "/hotels"
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
    fetch(`http://${ip}:3000/listbookingpass/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setBestHotels1(data); // Cập nhật state bestHotels với dữ liệu từ API endpoint "/hotels"
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  };
  useEffect(() => {fetchData()}, []);
  const [chose, setChose] = useState(true);
  const route = useRoute();
  const { userId } = route.params;
  const handlePress = () => {
    setChose(!chose); // Toggle the value of `chose` when the button is pressed
  };
  const handleBack = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "HomePage",
          params: { userId: userId },
        },
      ],
    });
  };
  const renderHotels = ({ item }) => (
    <View key={item.hotel.id} style={styles.hotelItem1}>
      <Image source={{ uri: item.hotel.source }} style={styles.hotelImage1} />
      <View style={styles.hotelTitle}>
        <View style={styles.hotelRating1}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star}>
              <Icon
                name={star <= item.hotel.rating ? "star" : "star-o"}
                size={18}
                color={star <= item.hotel.rating ? "gold" : "gray"}
              />
            </TouchableOpacity>
          ))}
          <Text style={{ marginLeft: 10 }}>{item.hotel.review}</Text>
        </View>
        <Text style={styles.hotelName1}>{item.hotel.name}</Text>
        <View style={styles.locationContainer1}>
          <Icon name="map-marker" size={16} color="gray" />
          <Text style={styles.locationText1}>{item.hotel.location}</Text>
        </View>
        <Text style={styles.hotelPrice1}>${item.hotel.price}/night</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("BookingPastDetail", {
            userId: userId,
            hotelId: item.hotel.id,
          })
        }
        style={styles.bookButton1}
      >
        <Text style={styles.bookButtonText1}>View Detail</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log(item.hotel.id);
          fetch(
            `http://${ip}:3000/updatebooking/${item.hotel.id}?userId=${userId}`,
            {
              method: "PUT",
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data.message);
              fetchData()
              navigation.navigate("ListBooking", { userId: userId });
            })
            .catch((error) => {
              console.error("Lỗi khi gửi yêu cầu cập nhật: " + error);
            });
        }}
        style={styles.bookButton2}
      >
        <Text style={styles.bookButtonText2}>Success</Text>
      </TouchableOpacity>
    </View>
  );
  const renderHotels1 = ({ item }) => (
    <View key={item.hotel.id} style={styles.hotelItem1}>
      <Image source={{ uri: item.hotel.source }} style={styles.hotelImage1} />
      <View style={styles.hotelTitle}>
        <View style={styles.hotelRating1}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star}>
              <Icon
                name={star <= item.hotel.rating ? "star" : "star-o"}
                size={18}
                color={star <= item.hotel.rating ? "gold" : "gray"}
              />
            </TouchableOpacity>
          ))}
          <Text style={{ marginLeft: 10 }}>{item.hotel.review}</Text>
        </View>
        <Text style={styles.hotelName1}>{item.hotel.name}</Text>
        <View style={styles.locationContainer1}>
          <Icon name="map-marker" size={16} color="gray" />
          <Text style={styles.locationText1}>{item.hotel.location}</Text>
        </View>
        <Text style={styles.hotelPrice1}>${item.hotel.price}/night</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("HotelDetail", {
            userId: userId,
            hotelId: item.hotel.id,
          })
        }
        style={styles.bookButton1}
      >
        <Text style={styles.bookButtonText1}>Book Again</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookButton2}>
        <Text style={styles.bookButtonText2}>Review</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Bookings</Text>
      <Icon
        onPress={handleBack}
        name="arrow-left"
        size={25}
        color="black"
        style={{ position: "absolute", top: 40, left: 30 }}
      />
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
        {chose
          ? bestHotels.map((item) => renderHotels({ item, key: item.hotel.id }))
          : bestHotels1.map((item) =>
              renderHotels1({ item, key: item.hotel.id })
            )}
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
