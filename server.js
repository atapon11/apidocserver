const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // เพิ่มบรรทัดนี้
const server = express();
const port = 5000;

// เปิดใช้งาน body-parser middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// เปิดใช้งาน middleware CORS
server.use(cors());

server.get('/data', (req, res) => {
  const jsonData = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8');
  const data = JSON.parse(jsonData);
  res.json(data);
});

// ฟังก์ชัน POST เพื่อบันทึกข้อมูลลงในไฟล์ JSON
server.post('/data', (req, res) => {
  try {
    const updatedData = req.body; // ข้อมูลจากคำขอ POST
    const filePath = path.join(__dirname, 'data.json');

    // บันทึกข้อมูลลงในไฟล์ JSON
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

    res.json({ message: 'บันทึกข้อมูลสำเร็จ' });
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
