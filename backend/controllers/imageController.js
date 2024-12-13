const Image = require("../models/ImageModel");

// @desc Upload images (original and mask)
// @route POST /api/images/upload
exports.uploadImage = async (req, res) => {
    try {
        const originalImage = req.files["original"][0].path; // Path of original image
        const maskImage = req.files["mask"][0].path; // Path of mask image

        // Create and save image metadata in MongoDB
        const image = await Image.create({ originalImage, maskImage });

        res.status(201).json({
            success: true,
            data: image,
            message: "Images uploaded successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to upload images",
            error: error.message,
        });
    }
};

// @desc Fetch all uploaded images
// @route GET /api/images/
exports.getImages = async (req, res) => {
    try {
        const images = await Image.find();

        res.status(200).json({
            success: true,
            data: images,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch images",
            error: error.message,
        });
    }
};
