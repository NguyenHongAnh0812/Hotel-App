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
app.get('/users', (req, res) => {
  // Gửi truy vấn SELECT
  const query = 'SELECT * FROM users';
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
app.post('/add-booking', (req, res) => {
  const { idUser, idHotel, date, guests, total } = req.body;

  // Truy vấn INSERT vào bảng booking
  const query = `INSERT INTO booking (idUser, idHotel, date, guests, total) VALUES ('${idUser}', '${idHotel}', '${date}', '${guests}', '${total}')`;
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
app.get('/listbooking', (req, res) => {
  const bookingQuery = 'SELECT idHotel FROM booking';
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


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});