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
      res.json({ success: true, message: 'Đăng nhập thành công' });
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
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});