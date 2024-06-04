import React, { useState, useEffect } from "react";
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
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";

const BookingScreen = () => {
  const ip = "172.20.10.2";
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [nameVisa, setNameVisa] = useState("Visa card not added yet");
  const [number, setNumber] = useState(2);
  const [bonus, setBonus] = useState(30);
  const [total, setTotal] = useState(0);
  const s = ">";
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isBookingSuccessVisible, setIsBookingSuccessVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { hotelId } = route.params;
  const { userId } = route.params;
  const [item, setItem] = useState({});
  const { hotel } = route.params;
  const [selectedOption, setSelectedOption] = useState("Basic");

useEffect(() => {
  if (selectedOption === "Luxury") setBonus(30);
  else if (selectedOption === "Medium") setBonus(20);
  else setBonus(10);
}, [selectedOption]);

const handleOptionChange = (itemValue, itemIndex) => {
  setSelectedOption(itemValue);
};
  useEffect(() => {
    setItem(hotel);
    // if (selectedOption == "Luxury") setBonus(30);
    // else if (selectedOption == "Medium") setBonus(20);
    // else setBonus(10);
  }, []);
  // useEffect(() => {
  //   fetch(`http://${ip}:3000/hotels/${hotelId}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setItem(data); // Cập nhật state bestHotels với dữ liệu từ API endpoint "/hotels"
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi khi lấy dữ liệu:", error);
  //     });
  // }, []);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handlePayNow = () => {
    fetch(`http://${ip}:3000/add-booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUser: userId,
        idHotel: hotelId,
        date: selectedDate.toLocaleDateString(), // Thay đổi ngày tùy theo yêu cầu của bạn
        guests: number, // Thay đổi số lượng khách tùy theo yêu cầu của bạn
        total: Number(item.price) + Number(number - 2) * 20,
        isCheck: "false",
        type: selectedOption, // Thay đổi tổng số tiền tùy theo yêu cầu của bạn
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Xử lý dữ liệu phản hồi
        console.log(data);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error(error);
      });
    if (
      isChecked == false ||
      (isChecked == true && nameVisa != "Visa card not added yet")
    )
      setIsBookingSuccessVisible(!isBookingSuccessVisible);
    else if (isChecked == true && nameVisa == "Visa card not added yet")
      Alert.alert("Vui lòng add thẻ visa");
    else setIsBookingSuccessVisible(!isBookingSuccessVisible);
  };
  // setTotal(item.price)
  const handleAddToCart = () => {
    setNameVisa(cardName);
    setIsModalVisible(false);
    setNameVisa(cardName);
    setCardNumber("");
    setCardName("");
    setExpiryDate("");
  };

  const increaseNumber = () => {
    const k = number + 1;
    if (k > 5) Alert.alert("Quá số lượng người ở mỗi phòng");
    else setNumber(k);
  };

  const decreaseNumber = () => {
    const k = number - 1;
    if (k == 0) Alert.alert("Phải có ít nhất 1 người");
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
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  const handleBackToHome = () => {};
  const handleBookingSuccess = () => {
    setIsBookingSuccessVisible(false);
    navigation.navigate("HomePage", { userId: userId });
  };

  return (
    <View style={styles.container}>
      <View key={item.id} style={styles.hotelItem1}>
        <Image source={{ uri: item.source }} style={styles.hotelImage1} />
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
      <ScrollView style={{ flex: 1 }}>
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
        <View style={styles.infoDescription}>
          <Text style={styles.infoDescriptionLabel}>Type :</Text>
          <Picker
            selectedValue={selectedOption}
            onValueChange={handleOptionChange}
          >
            <Picker.Item label="Luxury" value="Luxury" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Basic" value="Basic" />
          </Picker>
        </View>
        <View style={styles.containerHeader}>
          <Text style={styles.headerText}>Chose how to pay</Text>
        </View>
        <View style={{ marginLeft: 36 }}>
          <Text
            style={{
              fontSize: 15,
              color: "#000",
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Pay in Visa
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 15, color: "#454545" }}>
              Pay the total now and you're all set.
            </Text>
            <CheckBox checked={isChecked} onPress={toggleCheckbox} />
          </View>
        </View>
        <View style={{ marginLeft: 36 }}>
          <Text
            style={{
              fontSize: 15,
              color: "#000",
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Pay after check-in
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 15, color: "#454545" }}>
              Pay after check-in
            </Text>
            <CheckBox checked={!isChecked} onPress={toggleCheckbox} />
          </View>
        </View>
        {isChecked ? (
          <View style={styles.containerHeader}>
            <Text style={styles.headerText}>Pay with</Text>
          </View>
        ) : null}
        {isChecked ? (
          <View style={{ marginLeft: 36 }}>
            <Text
              style={{
                fontSize: 15,
                color: "#000",
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              Payment with Visa
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 15, color: "#454545" }}>{nameVisa}</Text>
              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  backgroundColor: "#fff",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#000",
                  marginRight: 10,
                }}
              >
                <Text style={{ color: "#000", fontWeight: "bold" }}>Add</Text>
              </TouchableOpacity>
              <Modal
                visible={isModalVisible}
                onRequestClose={toggleModal}
                transparent
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add to Cart</Text>
                    <TextInput
                      placeholder="Card Number"
                      value={cardNumber}
                      onChangeText={setCardNumber}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Card Name"
                      value={cardName}
                      onChangeText={setCardName}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Expiry Date"
                      value={expiryDate}
                      onChangeText={setExpiryDate}
                      style={styles.input}
                    />
                    <TouchableOpacity
                      onPress={handleAddToCart}
                      style={styles.addButton}
                    >
                      <Text style={styles.addButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={toggleModal}
                      style={styles.cancelButton}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        ) : null}
        <View style={styles.containerHeader}>
          <Text style={styles.headerText}>Price Details</Text>
        </View>
        <View style={styles.infoDescription}>
          <View style={styles.infoDescriptionPrice}>
            <Text style={styles.infoDescriptionTextPrice}>Price</Text>
            <Text style={styles.infoDescriptionTextPrice}>$ {item.price}</Text>
          </View>
          <View style={styles.infoDescriptionPrice}>
            <Text style={styles.infoDescriptionTextPrice}>
              Bonus
            </Text>
            <Text style={styles.infoDescriptionTextPrice}>
              $ {Number(number - 2) * 20 +bonus}
            </Text>
          </View>
        </View>
        <View style={styles.infoDescriptionTotal}>
          <Text style={styles.infoDescriptionTextPrice}>Total</Text>
          <Text style={styles.infoDescriptionTextPrice}>
            $ {Number(item.price) + Number(number - 2) * 20 +bonus}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.tabBottom}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.price}>Grand Total</Text>
          <Text style={styles.price}>
            $ {Number(item.price) + Number(number - 2) * 20+bonus}
          </Text>
        </View>
        <TouchableOpacity onPress={handlePayNow} style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Pay Now</Text>
        </TouchableOpacity>
        <Modal
          visible={isBookingSuccessVisible}
          onRequestClose={handleBookingSuccess}
          transparent
        >
          <View style={styles.modalContainer}>
            <View style={styles.bookingSuccessContent}>
              <View style={styles.circle}>
                <Icon name="check" size={20} color="#fff" />
              </View>
              <Text style={styles.bookingSuccessText}>Payment Received</Text>
              <Text style={styles.bookingSuccessText}>Successfully</Text>
              <Text>Congratulations</Text>
              <Text style={{ marginBottom: 30 }}>
                Your booking has been confirmed
              </Text>
              <TouchableOpacity
                onPress={handleBookingSuccess}
                style={styles.okButton}
              >
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    height: 170,
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
    // position: "absolute",
    // bottom: 0,
    width: "100%",
    marginTop: 20,
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
    fontSize: 20,
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
    color: "#000",
    marginLeft: 16,
    width: "20%",
    // alignSelf: 'flex-start',
    alignItems: "center",
    justifyContent: "center",
  },
  infoDescriptionText: {
    fontSize: 14,
    // marginRight: 150,
    color: "#454545",
    // alignSelf: "center",
    width: "60%",
  },
  numberContainer: {
    fontSize: 14,
    // marginRight: 150,
    paddingLeft: 20,
    color: "#454545",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
  },
  infoDescriptionTextPrice: {
    fontSize: 15,
    color: "#454545",
  },
  infoDescriptionTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 36,
    marginRight: 36,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    height: 350,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#000",
  },
  bookingSuccessContent: {
    width: 300,
    height: 350,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bookingSuccessText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  okButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 100,
    height: 40,
    justifyContent: "center",
  },
  okButtonText: {
    color: "#fff",
    fontWeight: "bold",
    // alignSelf:
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#00cc00",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
export default BookingScreen;
