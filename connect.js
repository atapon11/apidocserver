const mongoose = require('mongoose');

// URL ของฐานข้อมูล MongoDB
const dbURL = 'mongodb+srv://atapon1526:atapon11@earth.jemf06t.mongodb.net/api';

// เชื่อมต่อกับฐานข้อมูล MongoDB
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับ MongoDB:', err);
});

db.on('open', () => {
  console.log('เชื่อมต่อกับ MongoDB สำเร็จ');
  // ทำสิ่งที่คุณต้องการทำหลังจากเชื่อมต่อ MongoDB ที่นี่
});

// ตรวจสอบสถานะการเชื่อมต่อ
if (mongoose.connection.readyState === 1) {
  console.log('กำลังเชื่อมต่อกับ MongoDB');
} else {
  console.log('ไม่ได้เชื่อมต่อกับ MongoDB');
}
