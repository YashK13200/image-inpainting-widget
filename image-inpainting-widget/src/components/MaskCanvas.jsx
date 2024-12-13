import React from "react";

const MaskCanvas = ({ mask }) => {
  return (
    <div>
      <h3>Mask Preview</h3>
      <img src={mask} alt="Mask Preview" />
    </div>
  );
};

export default MaskCanvas;
