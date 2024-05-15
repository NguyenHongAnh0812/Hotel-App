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
  Button,
} from "react-native";
import React, { useState, useEffect } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from 'axios';
import { app } from './firebaseconfig';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
// import DocumentPicker from 'react-native-document-picker';
const AddScreen = () => {
  const [hotelName, setHotelName] = useState('');
  const [address, setAddress] = useState('');
  const [roomInfo, setRoomInfo] = useState('');
  const [overview, setOverview] = useState('');
  const [starRating, setStarRating] = useState(null);
  const [price, setPrice] = useState(null);
  const [url, setUrl] = useState('');

  const handleHotelNameChange = (text) => {
    setHotelName(text);
  };

  const handleAddressChange = (text) => {
    setAddress(text);
  };

  const handleRoomInfoChange = (text) => {
    setRoomInfo(text);
  };

  const handleOverviewChange = (text) => {
    setOverview(text);
  };

  const handleStarRatingChange = (text) => {
    setStarRating(text);
  };

  const handleUrlChange = (text) => {
    setUrl(text);
  };
  const handlePriceChange = (text) => {
    setPrice(text);
  };



  // const data = {
  //   name: "dung5",
  //   address: "ha long",
  //   overview: "rất là oke",
  //   infor: "1 giường 1 nvs",
  //   img: "url",
  //   price: 200,
  //   checkin: "10-10-2020",
  //   star: 3
  // };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedImages, setSelectedImages] = useState(null);
  const handleChooseImage = async () => {
    try {
      // Yêu cầu quyền truy cập thư viện ảnh
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Quyền truy cập thư viện ảnh bị từ chối.');
        return;
      }

      // Chọn ảnh từ thư viện
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // Lấy URI của ảnh đã chọn
        const selectedImage = result.assets[0].uri;
        setSelectedImages(selectedImage);

        // Tải ảnh lên Firebase
        const storage = getStorage(app);
        const filename = selectedImage.substring(selectedImage.lastIndexOf('/') + 1);
        const response = await fetch(selectedImage);
        const blob = await response.blob();

        const imageStorageRef = storageRef(storage, `images/${filename}`);
        await uploadBytes(imageStorageRef, blob);

        // Lấy URL của ảnh từ Firebase Storage
        const imageUrl = await getDownloadURL(imageStorageRef);
        setUrl(imageUrl); // Set giá trị của url bằng URL của ảnh từ Firebase
        // Alert.alert('Ảnh đã được tải lên thành công.');
        // console.log('Image URL:', url);
      } else {
        // Trường hợp người dùng hủy chọn ảnh
        console.log('User canceled image selection');
      }
    } catch (error) {
      console.log('Error handling image selection:', error);
      // Alert.alert('Đã xảy ra lỗi khi chọn và tải lên ảnh.');
    }
  };
  const navigation = useNavigation();
  const handleSubmit = () => {
    const data = {
      name: hotelName,
      adress: address,
      overview: overview,
      infor: roomInfo,
      img: url,
      price: price,
      checkin: selectedDate.toLocaleDateString().split('/').map(part => part.padStart(2, '0')).join('-').substring(0, 10),
      star: starRating
    };

    axios.post('http://10.0.2.2:8080/hotel_app/hotel', data)
      .then(response => {
        Alert.alert("Đăng thành công");
        navigation.navigate("Admin");
        console.log('POST request thành công!', response.data);
      })
      .catch(error => {
        console.error('Xảy ra lỗi khi thực hiện POST request:', error);
      });
    // const data1 = {
    //   name: hotelName,
    //   adress: address,
    //   overview: overview,
    //   infor: roomInfo,
    //   img: url,
    //   price: price,
    //   checkin: selectedDate.toLocaleDateString().split('/').join('-').substring(0, 10),
    //   star: 3
    // };
    // console.log(data1)
  };
  const handleSelectDate = () => {
    setShowDatePicker(true);
  };
  const handleDateChange = async (event, date) => {
    if (date !== undefined) {
      setShowDatePicker(false);
      setSelectedDate(date);
    }

  };



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerContent}>Thêm mới phòng khách sạn</Text>
      </View>
      <ScrollView>
        <View style={styles.container1}>
          <Text style={styles.label}>Tên khách sạn:</Text>
          <TextInput
            style={styles.input}
            value={hotelName}
            onChangeText={handleHotelNameChange}
            placeholder="Nhập tên khách sạn"
          />

          <Text style={styles.label}>Địa chỉ:</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={handleAddressChange}
            placeholder="Nhập địa chỉ"
          />

          <Text style={styles.label}>Thông tin phòng:</Text>
          <TextInput
            style={styles.input}
            value={roomInfo}
            onChangeText={handleRoomInfoChange}
            placeholder="Nhập thông tin phòng"
          />

          <Text style={styles.label}>Overview:</Text>
          <TextInput
            style={styles.input}
            value={overview}
            onChangeText={handleOverviewChange}
            placeholder="Nhập overview"
          />

          <Text style={styles.label}>Số sao:</Text>
          <TextInput
            style={styles.input}
            value={starRating}
            onChangeText={handleStarRatingChange}
            placeholder="Nhập số sao"
          />
          <Text style={styles.label}>Giá phòng:</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={handlePriceChange}
            placeholder="Nhập giá phòng"
          />
          <View>
            <Button style={styles.pickDate} onPress={handleSelectDate} title="Ngày checkin"></Button>
            <TextInput
              style={styles.input1}
              value={selectedDate.toLocaleDateString().split('/').map(part => part.padStart(2, '0')).join('-').substring(0, 10)}
              // onChangeText={handleHotelNameChange}
              editable={false}
              placeholder="Ngày checkin"
            />

            {showDatePicker && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={showDatePicker}
                onRequestClose={() => setShowDatePicker(false)}
              >
                <TouchableOpacity
                  style={styles.modalContainer}
                  activeOpacity={1}
                  onPressOut={() => setShowDatePicker(false)}
                >
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
                </TouchableOpacity>
              </Modal>
            )}
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Chọn ảnh" onPress={handleChooseImage} />
            {selectedImages && <Image source={{ uri: selectedImages }} style={{ width: 200, height: 200, marginTop: 10 }} />}
            {/* <Button title="Tải lên Firebase" onPress={uploadImage} /> */}
          </View>
          {/* <Text style={styles.label}>URL:</Text>
          <TextInput
            style={styles.input}
            value={url}
            onChangeText={handleUrlChange}
            placeholder="Nhập URL"
          /> */}
          <View style={{marginTop:10}}>
            <Button title="Thêm" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    backgroundColor: "#1e90ff",
    height: 100,
  },
  headerContent: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    alignSelf: "flex-start",
    marginLeft: 35,
    color: "#fff",
    marginTop: 45,
  },
  container1: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 0
  },
  input1: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10
  },
  pickDate: {
    width: '50%',
    marginBottom: 10
  }
})

export default AddScreen;
