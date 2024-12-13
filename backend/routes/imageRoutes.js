const express = require("express");
const multer = require("multer");
const {
    uploadImage,
    getImages,
} = require("../controllers/imageController");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Routes
router.post(
    "/upload",
    upload.fields([{ name: "original" }, { name: "mask" }]),
    uploadImage
);
router.get("/", getImages);

module.exports = router;
