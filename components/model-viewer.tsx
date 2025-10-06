//@ts-nocheck

// ModelViewer.jsx
import React from "react";
import "@google/model-viewer"; // enregistre le web component

export default function ModelViewer({ src, alt = "3D model" }) {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <model-viewer
        src={src}
        alt={alt}
        camera-controls
        auto-rotate
        ar // si tu veux AR sur mobile pris en charge
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
