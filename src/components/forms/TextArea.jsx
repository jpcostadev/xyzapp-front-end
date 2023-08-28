import React from "react";
import styles from "./TextArea.module.css";

const TextArea = ({
  label,
  name,
  error,
  rows,
  cols,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className={styles.textAreaContainer}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        rows={rows || 4}
        cols={cols || 50}
        placeholder={placeholder || ""}
        value={value}
        onChange={onChange}
        className={styles.textArea}
        style={{ resize: "none" }}
      ></textarea>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default TextArea;
