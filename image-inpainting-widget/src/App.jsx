import React, { useState } from "react";
import ImageCanvas from "./components/ImageCanvas";
import MaskCanvas from "./components/MaskCanvas";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [mask, setMask] = useState(null);

  return (
    <div className="App">
      <h1>Image Inpainting Widget</h1>
      <ImageCanvas image={image} setImage={setImage} setMask={setMask} />
      {image && mask && (
        <div className="image-preview">
          <div>
            <h3>Original Image</h3>
            <img src={image} alt="Original" />
          </div>
          <div>
            <h3>Mask Image</h3>
            <img src={mask} alt="Mask" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
