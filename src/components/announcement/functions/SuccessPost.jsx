import React from "react";
import styles from "./SuccessPost.module.css";

const SuccessPost = ({ success }) => {
  return (
    <div>
      <p className={styles.success}>{success}</p>
      {/* Aqui você pode adicionar qualquer conteúdo adicional que desejar */}
    </div>
  );
};

export default SuccessPost;
