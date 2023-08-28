import React from "react";

const Carrocel = ({ image, onRemove }) => {
  return (
    <div style={{ position: "relative" }}>
      <img src={URL.createObjectURL(image)} alt="Imagem" />
      <button
        onClick={() => onRemove(image)}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          cursor: "pointer",
        }}
      >
        X
      </button>
    </div>
  );
};

export default Carrocel;
