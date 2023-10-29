const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./connect'); // เรียกใช้ connection object จาก connect.js
const server = express();
const port = 5000;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const apiSchema = new Schema({
  url: String
});

const DataModel = mongoose.model('api', apiSchema); // ให้แน่ใจว่า apiSchema ถูกนำเข้าอย่างถูกต้อง




// เพิ่ม middleware สำหรับการกำหนด CORS headers
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // ใช้ "*" เพื่ออนุญาตให้ทุกโดเมนเข้าถึง
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// เปิดใช้งาน body-parser middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', async (req, res) => {
  try {
    const data = await DataModel.find().select('-_id').exec();
    console.log(data); // แสดงข้อมูลในคอนโซล
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
  }
});


server.post('/', async (req, res) => {
  try {
    const newData = req.body; // นำข้อมูลจากคำขอ POST
    const result = await DataModel.create(newData); // สร้างข้อมูลใหม่ใน MongoDB
    res.json(result); // ส่งข้อมูลที่สร้างขึ้นกลับเป็น JSON
  } catch (err) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างข้อมูลใหม่' });
  }
});

server.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body; // นำข้อมูลที่จะอัปเดตจากคำขอ PUT

  try {
    const result = await DataModel.findByIdAndUpdate(id, updatedData, { new: true }); // อัปเดตข้อมูลใน MongoDB ด้วย ID และส่งข้อมูลที่อัปเดตกลับ
    if (result) {
      res.json(result); // ส่งข้อมูลที่อัปเดตกลับเป็น JSON
    } else {
      res.status(404).json({ message: 'ไม่พบข้อมูลที่ต้องการอัปเดต' });
    }
  } catch (err) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' });
  }
});


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
