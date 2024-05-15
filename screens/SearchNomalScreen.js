import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

const SearchNomalScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const Tab = createBottomTabNavigator();
  const navigationn = useNavigation();
  const [hotels, setHotels] = useState([]);
  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8080/hotel_app/hotel');
      const fetchedHotels = response.data;
      setHotels(fetchedHotels);
    } catch (error) {
      console.error('Đã xảy ra lỗi khi gọi API:', error);
    }
  };
  const [searchName, setSearchName] = useState("");
  const [searchAdress, setSearchAdress] = useState("");
  const handleNameSearch = (text) => {
    setSearchName(text);
  }
  const handleAdressSearch = (text) => {
    setSearchAdress(text);
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchHotels();
    });

    return unsubscribe;
  }, [navigation]);

  const handleDetail = () => {
    navigationn.navigate("HotelDetail");
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
  // const handleSearchClick = () =>{
  //   const data = {
  //     name:searchName,
  //     adress:searchAdress
  //   }
  //   console.log(data)
  // }
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


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.title}>Tìm kiếm</Text>
        <View style={styles.searchContainer1}>
          <TextInput
            style={styles.searchInput}
            placeholder="Nhập từ khóa tìm kiếm"
            value={searchName}
            onChangeText={handleNameSearch}
          //   value={searchText}
          //   onChangeText={setSearchText}
          //   onSubmitEditing={handleSearch}
          />
          <TouchableHighlight
            style={styles.searchButton}
            underlayColor="#007bff"
          // onPress={handleSearch}
          >
            <Icon onPress={handleSearchClick} name="search" size={14} color="white" />
          </TouchableHighlight>
        </View>

        {showAdvancedSearch && (
          <View style={styles.advancedSearchContainer}>
            <View style={styles.searchContainer1}>
              <TextInput
                style={styles.searchInput}
                placeholder="Địa điểm"
                value={searchAdress}
                onChangeText={handleAdressSearch}
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
      {/* <ScrollView style={{ flex: 1, width: "100%" }}> */}
      <View style={styles.containerHeaderBestHotels}>
        <Text style={styles.headerBestHotelsText}>{hotels.length} Kết quả tìm kiếm !</Text>
        <Text
          onPress={handleSeeAllBestHotels}
          style={styles.linkBestHotelsText}
        >
          See All
        </Text>
      </View>
      {/* </ScrollView> */}
      {/* <View>
        <FlatList
          data={hotels}
          renderItem={renderHotels}
          keyExtractor={(item) => item.id.toString()}
        />
      </View> */}
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
            <Text style={styles.bookButtonText1}>Chi tiết</Text>
          </TouchableOpacity>
        </View>
        ))}
      </ScrollView>
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
  }
});

export default SearchNomalScreen;

