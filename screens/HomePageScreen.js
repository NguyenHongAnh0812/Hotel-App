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
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableHighlight } from "react-native";
import { BottomNavigation } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import { useNavigation } from "@react-navigation/native";

const HomePageScreen = () => {
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
  const images = [
    {
      id: 1,
      source: {
        uri: "https://vtv1.mediacdn.vn/Uploaded/lanchi/2013_09_19/10-hinh-anh-dac-trung-cua-ha-noi-0.jpg",
      },
      title: "Hà Nội",
    },
    {
      id: 2,
      source: {
        uri: "https://img.daibieunhandan.vn/resize/800x800/Files/Images/2023/07/26/visithue_phao-hoa-2-1690342560540.jpg",
      },
      title: "Huế",
    },
    {
      id: 3,
      source: {
        uri: "https://toquoc.mediacdn.vn/2020/4/26/da-nang-15878865291212013802504.jpg",
      },
      title: "Đà Nẵng",
    },
    {
      id: 4,
      source: {
        uri: "https://quangxuong.thanhhoa.gov.vn/portal/Photos/2023-09/89dcdbb35982c49dba-ria-vung-tau.jpg",
      },
      title: "Vũng Tàu",
    },
    {
      id: 5,
      source: {
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvrUO6IokoYxBQqWuQKnt_o1TRgjVcPkI6iTuXTky6yw&s",
      },
      title: "Cần Thơ",
    },
    {
      id: 6,
      source: {
        uri: "https://media.vneconomy.vn/images/upload/2023/02/13/e6927be0-d152-44dc-8a94-71cce7ddfed8.jpeg",
      },
      title: "Quảng Ninh",
    },
    // Thêm các mục ảnh khác vào đây
  ];
  const handleDetail = () => {
    // Điều hướng sang trang đăng ký
    navigation.navigate("HotelDetail");
  };
  const renderImageItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item.source} style={styles.image} />
      <Text style={{ margin: 5, fontWeight: "bold" }}>{item.title}</Text>
    </View>
  );
  const renderBestHotels = ({ item }) => (
    <View style={styles.hotelItem}>
      <Image source={item.source} style={styles.hotelImage} />
      <View style={styles.hotelRating}>
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
      <Text style={styles.hotelName}>{item.name}</Text>
      <View style={styles.locationContainer}>
        <Icon name="map-marker" size={16} color="gray" />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>
      <Text style={styles.hotelPrice}>${item.price}/night</Text>
      <TouchableOpacity onPress={handleDetail} style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Detail</Text>
      </TouchableOpacity>
    </View>
  );
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
      <TouchableOpacity onPress={handleDetail} style={styles.bookButton1}>
        <Text style={styles.bookButtonText1}>Detail</Text>
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
  const handleCompare = () => {
    navigation.navigate('Admin');
  };
  // const [modalVisible, setModalVisible] = useState(false);

  // const openModal = () => {
  //   setModalVisible(true);
  //   console.log("open")
  // };

  // const closeModal = () => {
  //   setModalVisible(false);
  // };
  const Logout = () =>{
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Welcome, Quang Dũng!</Text>
          <Text onPress={Logout} style={styles.title}>Đăng xuất</Text>
        </View>
        <View style={styles.searchContainer1}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
          //   value={searchText}
          //   onChangeText={setSearchText}
          //   onSubmitEditing={handleSearch}
          />
          <TouchableHighlight
            style={styles.searchButton}
            underlayColor="#007bff"
            onPress={handleSearch}
          >
            <Icon name="search" size={14} color="white" />
          </TouchableHighlight>
          <View>
            {/* <Text onPress={openModal}>test btn</Text> */}
            {/* <Modal
              animationType="slide"
              transparent={true}
              // visible={modalVisible}
              visible={true}
              // onRequestClose={closeModal}
            >
              <Text>Modal</Text>
            </Modal> */}
          </View>
        </View>
      </View>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.containerHeaderBestHotels}>
          <Text style={styles.headerBestHotelsText}>Best Hotels</Text>
          <Text
            onPress={handleSeeAllBestHotels}
            style={styles.linkBestHotelsText}
          >
            See All
          </Text>
        </View>
        <FlatList
          data={bestHotels}
          renderItem={renderBestHotels}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.containerHeaderBestHotels}>
          <Text style={styles.headerBestHotelsText}>Nearby your location</Text>
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
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#1e90ff",
    borderColor: "#1e90ff",
    borderWidth: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    // textAlign: "center",
    // alignSelf: "flex-start",
    marginLeft: 28,
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
  imageContainer: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
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
  hotelItem: {
    flexDirection: "column",
    width: 300,
    height: 300,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 16,
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
  hotelImage: {
    width: "100%",
    height: "50%",
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: "center",
  },
  hotelName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: "gray",
  },
  hotelRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    resizeMode: "contain",
  },
  hotelPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: "absolute",
    bottom: 10,
    right: 10,
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
});

export default HomePageScreen;
