import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HotelDetailScreen = () => {
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
  const renderImageItem = ({ item }) => (
    <View style={styles.photoContainer}>
      <Image source={item.source} style={styles.photo} />
    </View>
  );
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://duonggiahotel.vn/wp-content/uploads/2023/01/4048e2d8302ae874b13b.jpg",
        }}
        style={styles.image}
      />
      <ScrollView style={{ padding: 16 }}>
        <View style={styles.hotelRating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star}>
              <Icon
                name={star <= 4 ? "star" : "star-o"}
                size={18}
                color={star <= 4 ? "gold" : "gray"}
              />
            </TouchableOpacity>
          ))}
          <Text style={{ marginLeft: 10 }}>4.0 (120 Review)</Text>
        </View>
        <Text style={styles.title}>Hotel Name</Text>
        <View style={styles.locationContainer}>
          <Icon name="map-marker" size={16} color="gray" />
          <Text style={styles.locationText}>Đà Nẵng, Việt Nam</Text>
        </View>
        <View style={styles.infoDescription}>
          <Text style={styles.infoDescriptionLabel}>Overview</Text>
          <Text style={styles.infoDescriptionText}>
            Welcome to Sunset Beach Hotel, where luxury meets tranquility.
            Situated along the pristine shoreline, our beachfront hotel offers
            breathtaking views of the golden sunsets and gentle waves.
          </Text>
        </View>
        <View style={styles.containerHeaderPhoto}>
          <Text style={styles.headerPhotoText}>Photo</Text>
          <Text style={styles.linkPhotoText}>See All</Text>
        </View>
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
      <View style={styles.tabBottom}>
        <Text style={styles.price}>$100/Night</Text>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => console.log("Booking button pressed")}
        >
          <Text style={styles.bookButtonText}>Booking</Text>
        </TouchableOpacity>
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
    height: 200,
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
  infoDescriptionLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 15,
  },
  infoDescriptionText: {
    fontSize: 14,
    marginLeft: 15,
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
  linkPhotoText: {
    color: "blue",
    textDecorationLine: "none",
  },
  tabBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth:1,
    borderColor:"#d9d9d9",
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  bookButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop:10,
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default HotelDetailScreen;
