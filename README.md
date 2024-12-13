# Image-inpainting-widget 👨🏽‍💻©️

Project Overview
This project allows users to:

Upload an image.
Draw a mask on the image (using white strokes for the mask).
Save the original image and the mask image on the backend.
Retrieve and display these uploaded images.

### DEMO VIDEO


https://github.com/user-attachments/assets/082acf5d-c516-409f-84ad-f7ec08c83935



### Core Features
```bash
### **Core Features**

- **Image Upload**:
    - Allow users to upload an image (JPEG/PNG format).
    - Display the uploaded image in a canvas.
- **Mask Drawing**:
    - Let users draw on the image with a brush to create a mask.
    - The mask should display the drawn area in **white** and the background in **black**.
- **Brush Controls**:
    - Allow users to increase or decrease the brush size.
- **Export the Mask**:
    - Generate the mask image based on the drawing (save the mask as a separate image).
    - **Optional**: Allow users to clear the canvas for new drawings.
- **Display the Images**:
    - Display the original image and the generated mask image side-by-side below the canvas.
```

## Technologies Used

- **Frontend**: React.js + Vite , react-canvas-draw
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **HTTP Client**: Axios
- **Others**: Mongoose (for MongoDB object modeling)

  # Fetch Images Endpoint
  ```bash
  Endpoint: GET http://localhost:5000/api/images/
  Method: GET
  ```
  # Upload Images Endpoint
  ```bash
  Endpoint: POST http://localhost:5000/api/images/upload
  Method: POST
  Body: Form Data
  Add two keys for uploading files:
  Key: original (Type: File) → Select the original image from your system.
  Key: mask (Type: File) → Select the mask image from your system.

## Setup Instructions

Follow these steps to set up and run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/YashK13200/image-inpainting-widget.git
cd image-inpainting-widget
```

### 2. Backend Setup (Node.js)
Navigate to the backend folder:

 ```bash
   cd backend
   ```
Install dependencies:
 ```bash
   npm install
   ```

Create a .env file in the backend directory and add the following configuration:
 ```bash
   MONGODB_URI= Your Mongodb URL
   PORT=5000
   ```
Replace mongodb://localhost:27017 with your actual MongoDB connection string.

Start the backend server:
 ```bash
    node app.js
   ```
localhost:5000

### 3. Frontend Setup (React)
Navigate to the client folder:
 ```bash
 cd image-inpainting-widget
 npm install
   ```
Start the frontend development server:
 ```bash
 npm run dev
   ```
This will start the frontend on http://localhost:5171.
# Importanat Point Here To Note 
```bash
There may you encounter error occurs because react-canvas-draw has a peer dependency of react versions 16.x || 17.x, while my project is using React 18.3.1. This is causing a dependency conflict.

 Solution 1: Use --legacy-peer-deps Flag
Run the following command instead of npm install:

npm install react-canvas-draw fabric --legacy-peer-deps

This flag tells npm to bypass strict peer dependency resolution and use the older behavior, which often resolves conflicts like this.

Solution 2: Downgrade React Version (Not Recommended)
If you want compatibility with react-canvas-draw without using a flag, you can downgrade React to 17.x:

npm install react@17 react-dom@17
npm install react-canvas-draw fabric

However, this is not ideal as you lose React 18 features.

Solution 3: Use an Alternative Drawing Library
If you want to stick to React 18, you can use an alternative library like Fabric.js directly, which has full React 18 compatibility:

Install Fabric.js:

npm install fabric

Replace react-canvas-draw with custom Fabric.js implementation. Fabric.js allows you to build the same functionality (mask drawing) using its API.

Recommended Approach
Use Solution 1 as it's the quickest and ensures react-canvas-draw still works with React 18 without further changes. Let me know if you need the Fabric.js-based implementation instead! 🚀

```
### 4. Database Setup
You need a MongoDB database to store the contacts. You can either:

Use a local MongoDB instance, or
Use a cloud MongoDB service like MongoDB Atlas.
If you're using a local MongoDB instance, make sure it's running on localhost:27017 (or update the .env file accordingly).

Once the server is running, the database schema will be automatically created when the application first interacts with the database.

## File Structure

#Frontend
```bash
/src
  ├── components
  │   ├── ImageCanvas.js
  │   └── MaskCanvas.js
  ├── App.js
  ├── App.css
  └── index.js
```
#Backend
```bash
/backend
  ├── controllers
  │   └── imageController.js
  ├── models
  │   └── ImageModel.js
  ├── routes
  │   └── imageRoutes.js
  ├── uploads/           # Uploaded images
  ├── app.js
  ├── .env
  └── package.json
```
# Frontend (React)
#Image Upload and Canvas Drawing
```bash
The ImageCanvas component uses the react-canvas-draw library to draw masks over the uploaded image.
The user can control brush size and clear the canvas if needed.
The exportMask function extracts the mask layer as a black background with white strokes, preparing it for upload.
State Management

useState handles:
imgSrc: Uploaded image source.
maskSrc: Generated mask source.
uploadStatus: Status messages for the user.
Upload to Backend

The handleUploadToBackend function:
Converts images (original and mask) to Blob format.
Uploads these images via a POST request using fetch and FormData.
Display Results

After successful upload:
Both the original and mask images are displayed dynamically.
Backend (Express + MongoDB)
Multer for File Uploads

The multer middleware handles multipart file uploads and stores them in the uploads/ directory.
Routes

POST /api/images/upload:
Accepts two files: original (uploaded image) and mask (drawn mask).
Saves their file paths in MongoDB using the Image model.
GET /api/images/:
Fetches and returns all uploaded image records.
MongoDB Schema

Stores paths for the original image and mask with a timestamp (createdAt).
Environment Config

.env is used to store the MongoDB URI for clean configuration.
```

