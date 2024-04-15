import { useState } from "react";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableHighlight } from "react-native";
import { BottomNavigation } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import { useNavigation } from "@react-navigation/native";

const CompareScreen = () => {
  const [index, setIndex] = useState(0);
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
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
    },
  ];
  const [showCompare, setShowCompare] = useState(false);
  const handleAddCompare = () => {
    setShowCompare(true);
    Alert.alert("Đã thêm để so sánh");
  };
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
        </View>
        <Text style={styles.hotelName1}>{item.name}</Text>
        <View style={styles.locationContainer1}>
          <Icon name="map-marker" size={16} color="gray" />
          <Text style={styles.locationText1}>{item.location}</Text>
        </View>
        <Text style={styles.hotelPrice1}>${item.price}/night</Text>
      </View>
      <TouchableOpacity onPress={handleAddCompare} style={styles.bookButton1}>
        <Text style={styles.bookButtonText1}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
  const handleSeeAllBestHotels = () => {
    // Điều hướng sang trang đăng ký
    Alert.alert("Chuyển hướng sang list Best Hotels");
  };
  const handleSearch = () => {
    navigation.navigate('SearchNomal');
  };
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const handleToggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };
  const handleCompare = () => {
    navigation.navigate('Compare');
  };
  const handleDetail = () => {
    navigation.navigate('HotelDetail');
  };
  const handleBooking = () => {
    Alert.alert("Đặt phòng");
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.title}>So Sánh</Text>
        <View style={styles.searchContainer1}>
          <TextInput
            style={styles.searchInput}
            placeholder="Nhập từ khóa tìm kiếm"
          //   value={searchText}
          //   onChangeText={setSearchText}
          //   onSubmitEditing={handleSearch}
          />
          <TouchableHighlight
            style={styles.searchButton}
            underlayColor="#007bff"
          // onPress={handleSearch}
          >
            <Icon name="search" size={14} color="white" />
          </TouchableHighlight>
        </View>

        {showAdvancedSearch && (
          <View style={styles.advancedSearchContainer}>
            <View style={styles.searchContainer1}>
              <TextInput
                style={styles.searchInput}
                placeholder="Địa điểm"
              //   value={searchText}
              //   onChangeText={setSearchText}
              //   onSubmitEditing={handleSearch}
              />
            </View>
            <View style={styles.searchContainer1}>
              <TextInput
                style={styles.searchInput}
                placeholder="Giá"
              //   value={searchText}
              //   onChangeText={setSearchText}
              //   onSubmitEditing={handleSearch}
              />

            </View>
          </View>
        )}
        <TouchableHighlight
          style={styles.toggleButton}
          underlayColor="#007bff"
          onPress={handleToggleAdvancedSearch}
        >
          <View style={styles.toggleBtn}>
            <Text style={styles.toggleText}>
              {showAdvancedSearch ? "Ẩn" : "Tìm kiếm nâng cao"}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      {/*  */}
      {/* <ScrollView style={{ flex: 1, width: "100%" }}> */}
      {/* Hiển thị component so sánh nếu showCompare là true */}

      {/* <TouchableOpacity onPress={handleAddCompare} style={styles.addCompareButton}>
                <Text style={styles.addCompareButtonText}>Thêm để so sánh</Text>
            </TouchableOpacity> */}
      {/* </ScrollView> */}
      {/*  */}
      <ScrollView style={{ flex: 1, width: "100%" }}>
        {showCompare && (
          <View style={styles.compareContainer}>
            {/* Thông tin khách sạn 1 */}
            <View style={styles.hotelContainer}>
              <Image source={{ uri: "https://vtv1.mediacdn.vn/Uploaded/lanchi/2013_09_19/10-hinh-anh-dac-trung-cua-ha-noi-0.jpg" }} style={styles.hotelImage} />
              <View style={styles.hotelInfo}>
                <Text style={styles.hotelName}>Tên khách sạn 1</Text>
                <Text style={styles.hotelLocation}>Địa điểm: Địa điểm của khách sạn 1</Text>
                <Text style={styles.hotelPrice}>Giá: Giá của khách sạn 1</Text>
                <View style={styles.containerBooking}>
                  <View style={styles.booking}>
                    <Text style={styles.bookingTextt} onPress={handleBooking}>Đặt phòng</Text>
                  </View>
                  <View style={styles.booking}>
                    <Text style={styles.bookingTextt} onPress={handleDetail}>Detai</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* Thông tin khách sạn 2 */}
            <View style={styles.hotelContainer}>
              <Image source={{ uri: "https://vtv1.mediacdn.vn/Uploaded/lanchi/2013_09_19/10-hinh-anh-dac-trung-cua-ha-noi-0.jpg" }} style={styles.hotelImage} />
              <View style={styles.hotelInfo}>
                <Text style={styles.hotelName}>Tên khách sạn 2</Text>
                <Text style={styles.hotelLocation}>Địa điểm: Địa điểm của khách sạn 2</Text>
                <Text style={styles.hotelPrice}>Giá: Giá của khách sạn 2</Text>
                <View style={styles.containerBooking}>
                  <View style={styles.booking}>
                    <Text style={styles.bookingTextt} onPress={handleBooking}>Đặt phòng</Text>
                  </View>
                  <View style={styles.booking}>
                    <Text style={styles.bookingTextt} onPress={handleDetail}>Detai</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        <View style={styles.containerHeaderBestHotels}>
          <Text style={styles.headerBestHotelsText}>5 Kết quả tìm kiếm !</Text>
          <Text
            onPress={handleSeeAllBestHotels}
            style={styles.linkBestHotelsText}
          >
            See All
          </Text>
        </View>
        <View>
          {bestHotels.map((item) => renderHotels({ item, key: item.id }))}
        </View>
      </ScrollView>
      <View style={styles.tabBottom}>
        <TouchableOpacity style={{ width: "25%", justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: "#d9d9d9" }} onPress={() => console.log("Home button pressed")}>
          <Icon name="home" size={20} color="black" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "25%", justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: "#d9d9d9" }} onPress={() => console.log("Booking button pressed")}>
          <Icon name="calendar" size={20} color="black" />
          <Text>Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "25%", justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: "#d9d9d9" }} onPress={() => console.log("About button pressed")}>
          <Icon name="bell" size={20} color="black" />
          <Text>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "25%", justifyContent: 'center', alignItems: 'center', }} onPress={handleCompare}>
          <Icon name="user" size={20} color="black" />
          <Text>Compare</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // padding: 16,
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
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  containerHeaderBestHotels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  headerBestHotelsText: {
    fontWeight: "bold",
    fontSize: 21,
  },
  linkBestHotelsText: {
    color: "blue",
    textDecorationLine: "none",
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    resizeMode: "contain",
  },
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
  tabBottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1e90ff",
    height: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  toggleBtn: {
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "white",
    borderRadius: 20,
  },
  toggleText: {
    fontWeight: "600"
  },
  // 
  compareContainer: {
    padding: 20,
  },
  hotelContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  hotelImage: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 10,
  },
  hotelInfo: {
    flex: 1,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  hotelLocation: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },
  hotelPrice: {
    fontSize: 16,
    color: "green",
  },
  addCompareButton: {
    backgroundColor: "#1e90ff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  addCompareButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  booking: {
    padding: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 20,
    backgroundColor: "#1e90ff",
    alignSelf: 'flex-start',
    marginRight: 5,
  },
  bookingTextt: {
    color: "white",
    fontWeight: "600"
  },
  containerBooking: {
    flexDirection: "row",
  }
});

export default CompareScreen;

