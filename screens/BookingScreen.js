import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const BookingScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [number, setNumber] = useState(6);
  const s=">";

  const increaseNumber = () => {
    setNumber(number + 1);
  };

  const decreaseNumber = () => {
    const k = number - 1;
    if (k < 0) setNumber(0);
    else setNumber(k);
  };
  const handleEditDate = () => {
    setShowDatePicker(true);
  };
  const handleDateChange = (event, date) => {
    if (date != undefined) {
      setShowDatePicker(false);
      setSelectedDate(date);
    }
  };
  const item = {
    id: 1,
    source: {
      uri: "https://duonggiahotel.vn/wp-content/uploads/2023/01/4048e2d8302ae874b13b.jpg",
    },
    name: "Luxyry Hotel",
    rating: 3,
    location: "Đà Nẵng, Việt Nam",
    price: 100,
  };
  return (
    <View style={styles.container}>
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
      </View>
      <ScrollView>
        <View style={styles.containerHeader}>
          <Text style={styles.headerText}>Your Booking Details</Text>
        </View>
        <View style={styles.infoDescription}>
          <View style={styles.buttonContainer}>
            <Text style={styles.infoDescriptionLabel}>Date :</Text>
            <Text style={styles.infoDescriptionText}>
              {selectedDate.toLocaleDateString()}
            </Text>
            <View style={styles.buttonContainer1}>
              <Icon
                onPress={handleEditDate}
                name="edit"
                style={styles.editIcon}
              />
            </View>
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
        <View style={styles.infoDescription}>
          <View style={styles.buttonContainer}>
            <Text style={styles.infoDescriptionLabel}>Guests :</Text>
            <Text style={styles.numberContainer}>{number}</Text>
            <View style={styles.buttonContainer1}>
              <TouchableOpacity onPress={increaseNumber} style={styles.button}>
                <Icon
                  name="plus"
                  fontSize="20"
                  color="#000"
                  alignSelf="center"
                  justifyContent="center"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={decreaseNumber} style={styles.button}>
                <Icon
                  name="minus"
                  fontSize="20"
                  color="#000"
                  alignSelf="center"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.containerHeader}>
          <Text style={styles.headerText}>Price Details</Text>
        </View>
        <View style={styles.infoDescription}>
          <View style={styles.infoDescriptionPrice} >
            <Text style={styles.infoDescriptionTextPrice} >$100</Text>
            <Text style={styles.infoDescriptionTextPrice} >$100</Text>
          </View>
          <View style={styles.infoDescriptionPrice} >
            <Text style={styles.infoDescriptionTextPrice} >Discount</Text>
            <Text style={styles.infoDescriptionTextPrice} >- $10</Text>
          </View>
          <View style={styles.infoDescriptionPrice} >
            <Text style={styles.infoDescriptionTextPrice} >Bonus ( {s} 5 guest )</Text>
            <Text style={styles.infoDescriptionTextPrice} > + $50</Text>
          </View>
        </View>
        <View style={styles.infoDescriptionTotal} >
            <Text style={styles.infoDescriptionTextPrice} >Total</Text>
            <Text style={styles.infoDescriptionTextPrice} >$140</Text>
          </View>
      </ScrollView>
      <View style={styles.tabBottom}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.price}>Grand Total</Text>
          <Text style={styles.price}>$140</Text>
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  hotelItem1: {
    flexDirection: "row",
    alignSelf: "center",
    width: "90%",
    height: 150,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 10,
  },
  hotelImage1: {
    width: "40%",
    height: "100%",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  hotelTitle: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    width: "50%",
    marginLeft: 20,
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
  tabBottom: {
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    position: "absolute",
    bottom: 0,
    width: "100%",
    marginTop: 90,
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
    width: "60%",
    alignSelf: "center",
    height: 40,
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 20,
    // marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 21,
  },
  infoDescription: {
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    marginLeft: 20,
    marginRight: 20,
  },
  infoDescriptionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoDescriptionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    // marginBottom: 8,
    color: "#a9a9a9",
    marginLeft: 16,
    width: "20%",
    // alignSelf: 'flex-start',
    alignItems: "center",
    justifyContent: "center",
  },
  infoDescriptionText: {
    fontSize: 14,
    // marginRight: 150,
    color: "#a9a9a9",
    // alignSelf: "center",
    width: "60%",
  },
  numberContainer: {
    fontSize: 14,
    // marginRight: 150,
    paddingLeft: 20,
    color: "#a9a9a9",
    // alignSelf: "center",
    width: "60%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // justifyContent: 'flex-start',
    flex: 1,
  },
  editIcon: {
    marginLeft: 20,
    fontSize: 25,
    color: "black",
    alignSelf: "flex-end",
  },

  containerGuest: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 16,
    marginRight: 16,
  },
  buttonContainer1: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  button: {
    // backgroundColor: "blue",
    // padding: 10,
    borderRadius: 5,
    // marginBottom: 10,
    marginLeft: 5,
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "#a9a9a9",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  infoDescriptionPrice: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:20,
    marginRight: 20,
  },
  infoDescriptionTextPrice: {
    fontSize:15,
    color:'#a9a9a9',
  },
  infoDescriptionTotal:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:36,
    marginRight: 36,
  }
});
export default BookingScreen;
