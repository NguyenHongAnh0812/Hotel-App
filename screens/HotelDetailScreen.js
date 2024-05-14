import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
const HotelDetailScreen = () => {
  const ip = "192.168.1.89"
  const navigation = useNavigation();
  const route = useRoute();
  const { hotelId } = route.params;
  const { userId } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hotel, setHotel] = useState({});
  const [images, setImages] = useState([]);
  const [check, setCheck] = useState("true");
  useEffect(() => {
    fetch(`http://${ip}:3000/hotels/${hotelId}`)
      .then((response) => response.json())
      .then((data) => {
        setHotel(data);
        const photo = data.photo;
        const imageArray = photo.split(",");
        setImages(imageArray) // Cập nhật state bestHotels với dữ liệu từ API endpoint "/hotels"
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
    fetch(`http://${ip}:3000/checkbookings/${hotelId}?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setCheck(data);
        console.log(check) // Cập nhật state bestHotels với dữ liệu từ API endpoint "/hotels"
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  }, []);
  const handleSelectDate = () => {
    if (check == true)
      navigation.navigate("Booking", { hotelId: hotelId, userId: userId });
    else Alert.alert("Bạn đã đặt phòng này và chưa check-out");
    // setShowDatePicker(true);
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
      await showAlertAndWait();
      navigation.navigate("Booking");
    }
  };
  // const images = [
  //   {
  //     id: 1,
  //     source: {
  //       uri: "https://vtv1.mediacdn.vn/Uploaded/lanchi/2013_09_19/10-hinh-anh-dac-trung-cua-ha-noi-0.jpg",
  //     },
  //     title: "Hà Nội",
  //   },
  //   {
  //     id: 2,
  //     source: {
  //       uri: "https://img.daibieunhandan.vn/resize/800x800/Files/Images/2023/07/26/visithue_phao-hoa-2-1690342560540.jpg",
  //     },
  //     title: "Huế",
  //   },
  //   {
  //     id: 3,
  //     source: {
  //       uri: "https://toquoc.mediacdn.vn/2020/4/26/da-nang-15878865291212013802504.jpg",
  //     },
  //     title: "Đà Nẵng",
  //   },
  //   {
  //     id: 4,
  //     source: {
  //       uri: "https://quangxuong.thanhhoa.gov.vn/portal/Photos/2023-09/89dcdbb35982c49dba-ria-vung-tau.jpg",
  //     },
  //     title: "Vũng Tàu",
  //   },
  //   {
  //     id: 5,
  //     source: {
  //       uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvrUO6IokoYxBQqWuQKnt_o1TRgjVcPkI6iTuXTky6yw&s",
  //     },
  //     title: "Cần Thơ",
  //   },
  //   {
  //     id: 6,
  //     source: {
  //       uri: "https://media.vneconomy.vn/images/upload/2023/02/13/e6927be0-d152-44dc-8a94-71cce7ddfed8.jpeg",
  //     },
  //     title: "Quảng Ninh",
  //   },
  //   // Thêm các mục ảnh khác vào đây
  // ];

  const renderImageItem = ({ item }) => (
    <View style={styles.photoContainer}>
      <Image source={{uri: item}} style={styles.photo} />
    </View>
  );
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: hotel.source,
        }}
        style={styles.image}
      />
      <ScrollView style={{ padding: 16 }}>
        <View style={styles.hotelRating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star}>
              <Icon
                name={star <= hotel.rating ? "star" : "star-o"}
                size={18}
                color={star <= hotel.rating ? "gold" : "gray"}
              />
            </TouchableOpacity>
          ))}
          <Text style={{ marginLeft: 10 }}> {hotel.review} </Text>
        </View>
        <Text style={styles.title}>{hotel.name}</Text>
        <View style={styles.locationContainer}>
          <Icon name="map-marker" size={16} color="gray" />
          <Text style={styles.locationText}>{hotel.location}</Text>
        </View>
        <View style={styles.infoDescription}>
          <Text style={styles.infoDescriptionLabel}>Overview</Text>
          <Text style={styles.infoDescriptionText}>{hotel.overview}</Text>
        </View>
        <View style={styles.containerHeaderPhoto}>
          <Text style={styles.headerPhotoText}>Photo</Text>
          <Text style={styles.linkPhotoText}>See All</Text>
        </View>
        <FlatList
          data={images}
          renderItem={renderImageItem}
          // keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.containerHeaderPhoto}>
          <Text style={styles.headerPhotoText1}>
            Room in boutique hotel hosted by {hotel.manage}
          </Text>
          <Image
            source={{
              uri: hotel.source,
            }}
            style={{ width: 70, height: 70, borderRadius: 50 }}
          />
        </View>
        <View style={styles.infoDescription}>
          <Text style={{ marginLeft: 15, fontSize: 15, fontWeight: "bold" }}>
            {hotel.info}
          </Text>
        </View>
        <View style={styles.infoDescription}>
          <View style={styles.infoDescriptionHeader}>
            <Icon
              name="rocket"
              size={25}
              color="#000"
              style={{ alignSelf: "flex-start", marginRight: 10 }}
            />
            <Text style={styles.infoDescriptionLabel1}>Enhanced Clean</Text>
          </View>
          <Text style={styles.infoDescriptionText1}>
            This host committed to Airbnb's clone 5-step enhanced cleaning
            process.
          </Text>
        </View>
        <View style={styles.infoDescription}>
          <View style={styles.infoDescriptionHeader}>
            <Icon
              name="map-marker"
              size={25}
              color="#000"
              style={{ alignSelf: "flex-start", marginRight: 15 }}
            />
            <Text style={styles.infoDescriptionLabel1}>Great Location</Text>
          </View>
          <Text style={styles.infoDescriptionText1}>
            95% of recent guests give the location a 5-star rating.
          </Text>
        </View>
        <View style={styles.infoDescription}>
          <View style={styles.infoDescriptionHeader}>
            <Icon
              name="key"
              size={25}
              color="#000"
              style={{ alignSelf: "flex-start", marginRight: 10 }}
            />
            <Text style={styles.infoDescriptionLabel1}>
              Great check-in-experience
            </Text>
          </View>
          <Text style={styles.infoDescriptionText1}>
            90% of recent duests gave the check-im process a 5-star rating.
          </Text>
        </View>
        <View style={styles.infoDescription}>
          <View style={styles.infoDescriptionHeader}>
            <Icon
              name="calendar"
              size={25}
              color="#000"
              style={{ alignSelf: "flex-start", marginRight: 10, marginTop: 5 }}
            />
            <Text style={styles.infoDescriptionLabel1}>
              Free cancellation until 2:00 PM on 8 May
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.tabBottom}>
        <Text style={styles.price}>${hotel.price}/Night</Text>
        <TouchableOpacity style={styles.bookButton} onPress={handleSelectDate}>
          <Text style={styles.bookButtonText}>Booking</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            textColor="black"
            backgroundColor="#000"
            borderRadius="20"
            justifyContent="center"
            alignItems="center"
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 10,
    height: 250,
    marginBottom: 16,
  },
  hotelRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: "gray",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoDescription: {
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
  },
  infoDescriptionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoDescriptionLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 15,
  },
  infoDescriptionLabel1: {
    fontSize: 20,
    // fontWeight: "bold",
    width: "90%",
    marginBottom: 8,
    marginLeft: 15,
  },
  infoDescriptionText: {
    fontSize: 14,
    marginLeft: 15,
  },
  infoDescriptionText1: {
    fontSize: 14,
    marginLeft: 50,
  },
  photoContainer: {
    marginRight: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 30,
  },
  photo: {
    width: 120,
    height: 80,
    borderRadius: 10,
  },
  containerHeaderPhoto: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  headerPhotoText: {
    fontWeight: "bold",
    fontSize: 21,
  },
  headerPhotoText1: {
    fontWeight: "bold",
    fontSize: 21,
    width: "70%",
  },
  linkPhotoText: {
    color: "blue",
    textDecorationLine: "none",
  },
  tabBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: "#d9d9d9",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  bookButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 10,
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  datePickerContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
  },
});
export default HotelDetailScreen;
