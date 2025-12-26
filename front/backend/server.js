const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// مجلد حفظ الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/Img"));
  },
  filename: function (req, file, cb) {
    const uniqueName = `hall_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// مسار رفع الصورة
app.post("/upload", upload.single("hallImage"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");
  res.json({ fileName: req.file.filename });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
