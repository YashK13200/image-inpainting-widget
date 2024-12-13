const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    originalImage: { type: String, required: true }, // Path to the original image
    maskImage: { type: String, required: true },     // Path to the mask image
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Image", imageSchema);
