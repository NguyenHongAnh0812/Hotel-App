import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  Image,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const AdminScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchAdress, setSearchAdress] = useState("");
  const handleNameSearch = (text) => {
    setSearchName(text);
  }
  const handleAdressSearch = (text) => {
    setSearchAdress(text);
  }
  const handleSearchClick = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8080/hotel_app/hotel/search?name=${searchName}&adress=${searchAdress}`);
      const hotels = response.data;
      setHotels(hotels);
      // Xử lý dữ liệu hotels ở đây
    } catch (error) {
      console.error('Đã xảy ra lỗi khi gọi API search:', error);
      // Xử lý lỗi ở đây nếu cần
    }
  };
  // useEffect(() => {
  //   const fetchHotels = async () => {
  //     try {
  //       const response = await axios.get('http://10.0.2.2:8080/hotel_app/hotel');
  //       const fetchedHotels = response.data;
  //       setHotels(fetchedHotels);
  //     } catch (error) {
  //       console.error('Đã xảy ra lỗi khi gọi API:', error);
  //     }
  //   };

  //   fetchHotels();
  // }, []);
  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8080/hotel_app/hotel');
      const fetchedHotels = response.data;
      setHotels(fetchedHotels);
    } catch (error) {
      console.error('Đã xảy ra lỗi khi gọi API:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchHotels();
    });

    return unsubscribe;
  }, [navigation]);
  const handleDeleteHotel = async (id) => {
    // Hiển thị cảnh báo xác nhận trước khi xóa
    Alert.alert(
      'Xóa',
      'Bạn có chắc chắn muốn xóa khách sạn này?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Hành động hủy xóa'),
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: async () => {
            try {
              // Gọi API DELETE để xóa khách sạn
              await axios.delete(`http://10.0.2.2:8080/hotel_app/hotel/${id}`);
              // Sau khi xóa thành công, cập nhật danh sách khách sạn bằng cách gọi API GET lại
              const response = await axios.get('http://10.0.2.2:8080/hotel_app/hotel');
              setHotels(response.data);
            } catch (error) {
              console.error('Đã xảy ra lỗi khi xóa khách sạn:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  const renderHotels = ({ item }) => (
    // Render each hotel item here
    <View key={item.id} style={styles.hotelItem1}>
      <Image source={{ uri: item.img }} style={styles.hotelImage1} />
      <View style={styles.hotelTitle}>
        <View style={styles.hotelRating1}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star}>
              <Icon
                name={star <= item.star ? "star" : "star-o"}
                size={18}
                color={star <= item.star ? "gold" : "gray"}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.hotelName1}>{item.name}</Text>
        <View style={styles.locationContainer1}>
          <Icon name="map-marker" size={16} color="gray" />
          <Text style={styles.locationText1}>{item.adress}</Text>
        </View>
        <Text style={styles.hotelPrice1}>{item.price}.000đ/Đêm</Text>
      </View>
      <TouchableOpacity style={styles.bookButton1}>
        <Text onPress={() => handleDeleteHotel(item.id)} style={styles.bookButtonText1}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  const navigationn = useNavigation();
  const handleAdd = () => {
    navigationn.navigate("Add");
  };
  const handleSelectDate = () => {
    setShowDatePicker(true);
  };
  const showAlertAndWait = () => {
    return new Promise((resolve) => {
      Alert.alert("Booking Time: " + selectedDate.toLocaleDateString(), "", [
        { text: "NEXT", onPress: resolve },
      ]);
    });
  };
  const handleDateChange = async (event, date) => {
    if (date !== undefined) {
      setShowDatePicker(false);
      setSelectedDate(date);
      // await showAlertAndWait();
      // navigation.navigate("HomePage");
    }
    // setShowDatePicker(false);
  };
  const Logout = () =>{
    navigation.navigate('Login');
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.title}>Quản lý Hotel</Text>
        <Text onPress={Logout} style={styles.title1}>Đăng Xuất</Text>
        <View style={styles.searchContainer1}>
          <TextInput
            style={styles.searchInput}
            placeholder="Nhập từ khóa tìm kiếm"
            value={searchName}
            onChangeText={handleNameSearch}
          //   onSubmitEditing={handleSearch}
          />
          <TouchableHighlight
            onPress={handleSearchClick}
            style={styles.searchButton}
            underlayColor="#007bff"
          // onPress={handleSearch}
          >
            <Icon name="search" size={14} color="white" />
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.containerAdd}>
        <View>
          <Text style={styles.countResult}>{hotels.length} kết quả tìm kiếm</Text>
        </View>
        <View style={styles.addBtn}>
          <Text style={styles.addTitle}>Thêm</Text>
          <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
            <Icon name="plus" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {hotels.map((item) => (
          <View key={item.id} style={styles.hotelItem1}>
            <Image source={{ uri: item.img }} style={styles.hotelImage1} />
            <View style={styles.hotelTitle}>
              <View style={styles.hotelRating1}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star}>
                    <Icon
                      name={star <= item.star ? "star" : "star-o"}
                      size={18}
                      color={star <= item.star ? "gold" : "gray"}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.hotelName1}>{item.name}</Text>
              <View style={styles.locationContainer1}>
                <Icon name="map-marker" size={16} color="gray" />
                <Text style={styles.locationText1}>{item.adress}</Text>
              </View>
              <Text style={styles.hotelPrice1}>{item.price}.000đ/Đêm</Text>
            </View>
            <TouchableOpacity style={styles.bookButton1}>
              <Text onPress={() => handleDeleteHotel(item.id)} style={styles.bookButtonText1}>Xóa</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    width: "100%",
    // height: 170,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#1e90ff",
    borderColor: "#1e90ff",
    borderWidth: 2,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    alignSelf: "flex-start",
    marginLeft: 18,
    color: "#fff",
    marginTop: 20,
  },
  title1: {
    position:"absolute",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    alignSelf: "flex-start",
    marginLeft: 18,
    color: "#fff",
    left:260,
    top: 40
  },
  searchContainer1: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  searchButton: {
    height: "100%",
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 20,
  },
  addBtn: {
    marginTop: 10,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  addTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginRight: 5,
  },
  containerAdd: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  countResult: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  // 
  hotelItem1: {
    flexDirection: "row",
    alignSelf: "center",
    width: "90%",
    height: 200,
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
    width: "50%",
    height: "100%",
    borderRadius: 8,
    alignSelf: "center",
  },
  hotelTitle: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    width: "50%",
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
    marginBottom: 8,
  },
  bookButton1: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  bookButtonText1: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default AdminScreen;
