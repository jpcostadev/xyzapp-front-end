import React from "react";
import styles from "./PostContent.module.css";

const PostContent = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.post}>
      <div className={styles.postContent}></div>
    </div>
  );
};

export default PostContent;
