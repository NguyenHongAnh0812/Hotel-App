const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

// Tạo kết nối đến cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '24052002@Phuonn',
  database: 'hotel-app',
});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối đến cơ sở dữ liệu: ' + err.stack);
    return;
  }
  console.log('Kết nối thành công đến cơ sở dữ liệu MySQL');
});

// Định nghĩa API đăng nhập
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Truy vấn người dùng từ cơ sở dữ liệu
  const query = `SELECT * FROM users WHERE email = '${username}' AND password = '${password}'`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
      res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
      return;
    }

    if (results.length === 1) {
      // Đăng nhập thành công
      const userId = results[0].id
      res.json({ success: true, message: 'Đăng nhập thành công', userId });
    } else {
      // Đăng nhập thất bại
      res.json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
    }
  });
});
app.post('/register', (req, res) => {
  // Extract the registration data from the request body
  const { name, email, password, phone_number } = req.body;
  const query = `INSERT INTO users (name, email, password, phone_number) VALUES (?, ?, ?, ?)`;

  // Execute the query with the registration data
  connection.query(query, [name, email, password, phone_number], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'An error occurred during registration.' });
    } else {
      res.status(200).json({ message: 'Registration successful!' });
    }
  });
});
app.get('/user/:idUser', (req, res) => {
  // Gửi truy vấn SELECT
  const idUser = req.params.idUser;
  const query = `SELECT * FROM users WHERE id = ${idUser}`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Lỗi truy vấn:', error);
      res.status(500).send('Đã xảy ra lỗi khi lấy danh sách người dùng');
      return;
    }
    
    // Xử lý kết quả truy vấn
    res.json(results);
  });
});
app.get('/hotels', function(req, res) {
  connection.query('SELECT * FROM hotels', function(err, rows) {
    if (err) {
      console.error('Lỗi truy vấn cơ sở dữ liệu: ' + err.stack);
      return res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
    }

    // Trả về dữ liệu dưới dạng JSON
    res.json(rows);
  });
});
app.get('/hotels/:id', function (req, res) {
  const hotelId = req.params.id;
  const query = 'SELECT * FROM hotels WHERE id = ?';
  connection.query(query, [hotelId], function (err, results) {
    if (err) {
      console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      return;
    }
  const hotel = results[0];
  res.json(hotel);
  });
});
app.get('/checkbookings/:idHotel', (req, res) => {
  const idHotel = req.params.idHotel;
  const userId = req.query.userId;
  console.log(userId)
  const bookingQuery = `SELECT * FROM booking WHERE idHotel = ${idHotel} AND isCheck = 'false' AND idUser = ${userId}`;

  connection.query(bookingQuery, (error, bookingResults) => {
    if (error) {
      console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
      res.status(500).json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
      return;
    }

    if (bookingResults.length > 0) {
      res.json(false); // Có booking chưa được kiểm tra
    } else {
      res.json(true); // Không có booking chưa được kiểm tra
    }
  });
});
app.post('/add-booking', (req, res) => {
  const { idUser, idHotel, date, guests, total, isCheck } = req.body;

  // Truy vấn INSERT vào bảng booking
  const query = `INSERT INTO booking (idUser, idHotel, date, guests, total, isCheck) VALUES ('${idUser}', '${idHotel}', '${date}', '${guests}', '${total}', '${isCheck}')`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
      res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
      return;
    }

    // Kiểm tra số lượng hàng ảnh hưởng (rows affected)
    if (results.affectedRows === 1) {
      // Insert thành công
      res.json({ success: true, message: 'Dữ liệu đã được chèn thành công' });
    } else {
      // Insert thất bại
      res.json({ success: false, message: 'Không thể chèn dữ liệu' });
    }
  });
});
app.get('/listbookingupcoming/:userId', (req, res) => {
  const userId = req.params.userId;
  const bookingQuery = `SELECT idHotel FROM booking WHERE isCheck = 'false' AND idUser = ${userId} `;
  let hotelCount = {};

  connection.query(bookingQuery, (error, bookingResults) => {
    if (error) {
      console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
      return;
    }

    // Lấy danh sách idHotel từ kết quả truy vấn booking
    const idHotels = bookingResults.map(result => result.idHotel);

    // Nếu danh sách idHotel rỗng, trả về danh sách khách sạn trống
    if (idHotels.length === 0) {
      res.json([]);
      return;
    }

    // Lặp qua danh sách idHotels và tăng số lần xuất hiện của mỗi khách sạn
    idHotels.forEach(idHotel => {
      if (hotelCount[idHotel]) {
        hotelCount[idHotel]++;
      } else {
        hotelCount[idHotel] = 1;
      }
    });

    // Chuyển đổi đối tượng hotelCount thành mảng chứa thông tin khách sạn và số lần xuất hiện
    const hotelList = Object.keys(hotelCount).map(idHotel => ({
      hotelId: idHotel,
      count: hotelCount[idHotel]
    }));

    // Truy vấn thông tin về từng khách sạn
    let completedQueries = 0;
    let listHotels = [];

    hotelList.forEach(hotel => {
      const hotelQuery = 'SELECT * FROM hotels WHERE id = ?';
      const params = [hotel.hotelId];

      connection.query(hotelQuery, params, (error, hotelResults) => {
        if (error) {
          console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
          return;
        }

        listHotels.push({
          hotel: hotelResults[0],
          count: hotel.count
        });

        completedQueries++;

        // Kiểm tra nếu tất cả các truy vấn đã hoàn thành
        if (completedQueries === hotelList.length) {
          // Trả về danh sách khách sạn đã thu thập được
          res.json(listHotels);
        }
      });
    });
  });
});
app.get('/listbookingpass/:userId', (req, res) => {
  const userId = req.params.userId;
  const bookingQuery = `SELECT idHotel FROM booking WHERE isCheck = 'true' AND idUser = ${userId} `;
  let hotelCount = {};

  connection.query(bookingQuery, (error, bookingResults) => {
    if (error) {
      console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
      return;
    }

    // Lấy danh sách idHotel từ kết quả truy vấn booking
    const idHotels = bookingResults.map(result => result.idHotel);

    // Nếu danh sách idHotel rỗng, trả về danh sách khách sạn trống
    if (idHotels.length === 0) {
      res.json([]);
      return;
    }

    // Lặp qua danh sách idHotels và tăng số lần xuất hiện của mỗi khách sạn
    idHotels.forEach(idHotel => {
      if (hotelCount[idHotel]) {
        hotelCount[idHotel]++;
      } else {
        hotelCount[idHotel] = 1;
      }
    });

    // Chuyển đổi đối tượng hotelCount thành mảng chứa thông tin khách sạn và số lần xuất hiện
    const hotelList = Object.keys(hotelCount).map(idHotel => ({
      hotelId: idHotel,
      count: hotelCount[idHotel]
    }));

    // Truy vấn thông tin về từng khách sạn
    let completedQueries = 0;
    let listHotels = [];

    hotelList.forEach(hotel => {
      const hotelQuery = 'SELECT * FROM hotels WHERE id = ?';
      const params = [hotel.hotelId];

      connection.query(hotelQuery, params, (error, hotelResults) => {
        if (error) {
          console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
          return;
        }

        listHotels.push({
          hotel: hotelResults[0],
          count: hotel.count
        });

        completedQueries++;

        // Kiểm tra nếu tất cả các truy vấn đã hoàn thành
        if (completedQueries === hotelList.length) {
          // Trả về danh sách khách sạn đã thu thập được
          res.json(listHotels);
        }
      });
    });
  });
});
app.put('/updatebooking/:idHotel', (req, res) => {
  const idHotel = req.params.idHotel;
  const idUser = req.query.userId;
  const updateQuery = `UPDATE booking SET isCheck = 'true' WHERE idHotel = ${idHotel} AND idUser=${idUser}`;

  connection.query(updateQuery, (error, updateResult) => {
    if (error) {
      console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
      return;
    }

    res.json({ message: 'Cập nhật thành công!' });
  });
});
app.get('/bookingdetail/:idUser/:idHotel', (req, res) => {
  // Extract the idUser and idHotel from the request parameters
  const { idUser, idHotel } = req.params;

  // Create an SQL query to fetch booking information based on idUser and idHotel
  const query = `SELECT * FROM booking WHERE idUser = ? AND idHotel = ? AND isCheck = 'false'`;

  // Execute the query with the provided parameters
  connection.query(query, [idUser, idHotel], (error, results) => {
    if (error) {
      console.error('Error retrieving booking information:', error);
      res.status(500).json({ message: 'An error occurred while retrieving booking information.' });
    } else {
      res.status(200).json(results);
    }
  });
});
app.get('/bookingdelete/:idUser/:idHotel', (req, res) => {
  // Extract the idUser and idHotel from the request parameters
  const { idUser, idHotel } = req.params;

  // Create an SQL query to delete booking information based on idUser and idHotel
  const query = `DELETE FROM booking WHERE idUser = ? AND idHotel = ? AND isCheck = 'false'`;

  // Execute the query with the provided parameters
  connection.query(query, [idUser, idHotel], (error, results) => {
    if (error) {
      console.error('Error deleting booking information:', error);
      res.status(500).json({ message: 'An error occurred while deleting booking information.' });
    } else {
      res.status(200).json({ message: 'Booking information deleted successfully.' });
    }
  });
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});