import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";

const ImageCanvas = () => {
  const [imgSrc, setImgSrc] = useState(null); // To store the uploaded image source
  const [showImages, setShowImages] = useState(false); // To control the display of images
  const [maskSrc, setMaskSrc] = useState(null); // To store the generated mask image
  const [brushSize, setBrushSize] = useState(10); // Brush size for drawing
  const [uploadStatus, setUploadStatus] = useState(""); // Upload status message
  const canvasRef = useRef(null);

  // Handle image upload (only sets the imgSrc)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result);
        setShowImages(false); // Reset image visibility on new upload
      };
      reader.readAsDataURL(file);
    }
  };

  // Export mask from canvas
  const exportMask = () => {
    if (canvasRef.current) {
      const maskCanvas = canvasRef.current.canvas.drawing;

      // Create a new canvas with a black background
      const maskImage = document.createElement("canvas");
      maskImage.width = maskCanvas.width;
      maskImage.height = maskCanvas.height;
      const maskCtx = maskImage.getContext("2d");

      // Fill with black background
      maskCtx.fillStyle = "#000000";
      maskCtx.fillRect(0, 0, maskImage.width, maskImage.height);

      // Draw white strokes (mask)
      maskCtx.drawImage(maskCanvas, 0, 0);

      // Generate mask image data URL
      const maskDataURL = maskImage.toDataURL("image/png");
      setMaskSrc(maskDataURL);
      return maskDataURL;
    }
    return null;
  };

  // Upload image and mask to backend
  const handleUploadToBackend = async () => {
    if (!imgSrc) {
      alert("Please upload an image first!");
      return;
    }

    const maskDataURL = exportMask();
    if (!maskDataURL) {
      alert("Please draw a mask first!");
      return;
    }

    // Convert DataURL to Blob for upload
    const originalBlob = dataURLToBlob(imgSrc);
    const maskBlob = dataURLToBlob(maskDataURL);

    // Prepare form data
    const formData = new FormData();
    formData.append("original", originalBlob, "original.png");
    formData.append("mask", maskBlob, "mask.png");

    try {
      setUploadStatus("Uploading...");
      const response = await fetch("http://localhost:5000/api/images/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setUploadStatus("Upload successful!");
        setShowImages(true); // Show images after successful upload
        console.log("Server Response:", result);
      } else {
        setUploadStatus("Upload failed!");
        console.error("Error:", result);
      }
    } catch (error) {
      setUploadStatus("Error connecting to server.");
      console.error("Error:", error);
    }
  };

  // Helper: Convert DataURL to Blob
  const dataURLToBlob = (dataURL) => {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  };

  // Function to clear the canvas
  const handleClearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear(); // Correctly access the clear method
    }
  };

  return (
    <div>
      <h2>Upload Image & Draw Mask</h2>

      {/* Upload Image */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {imgSrc && (
        <div>
          {/* Brush Size Control */}
          <div style={{ margin: "10px 0" }}>
            <label>
              Brush Size:{" "}
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
              />
              <span> {brushSize}px</span>
            </label>
          </div>

          {/* Canvas to draw the mask */}
          <CanvasDraw
            ref={canvasRef}
            brushRadius={brushSize}
            lazyRadius={0}
            canvasWidth={500}
            canvasHeight={500}
            imgSrc={imgSrc}
            brushColor="#FFFFFF" // White strokes for mask
          />

          {/* Buttons */}
          <div style={{ marginTop: "10px" }}>
            <button onClick={handleUploadToBackend}>Generate Mask</button>
            <button onClick={handleClearCanvas}>Clear</button>
          </div>

          {/* Upload Status */}
          {uploadStatus && <p>{uploadStatus}</p>}
        </div>
      )}

      {/* Show Original and Mask Images After Upload */}
      {showImages && (
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          {/* Original Image */}
          {imgSrc && (
            <div>
              <h4>Original Image</h4>
              <img
                src={imgSrc}
                alt="Original"
                style={{ width: "300px", border: "1px solid #ddd" }}
              />
            </div>
          )}

          {/* Mask Image */}
          {maskSrc && (
            <div>
              <h4>Generated Mask</h4>
              <img
                src={maskSrc}
                alt="Mask"
                style={{ width: "300px", border: "1px solid #ddd" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCanvas;
