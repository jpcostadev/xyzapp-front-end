import React from "react";
import styles from "./PostContent.module.css";
import { UserContext } from "../../../userContext";

const PostContent = ({ data }) => {
  const user = React.useContext(UserContext);

  return (
    <div className={styles.post}>
      <div className={styles.postContent}></div>
    </div>
  );
};

export default PostContent;
