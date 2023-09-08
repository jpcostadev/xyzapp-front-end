import React from "react";
import ContainerMid from "../../global/ContainerMid";
import styles from "./FeedPublic.module.css";
import Container from "../../global/ContainerMid";
import FeedModalPublic from "./FeedModalPublic";
import FeedPostPublic from "./FeedPostPublic";

const FeedPublic = () => {
  const [modalPost, setModalPost] = React.useState(null);
  return (
    <Container>
      <ContainerMid>
        <section className={styles.section}>
          {modalPost && (
            <FeedModalPublic post={modalPost} setModalPost={setModalPost} />
          )}

          <FeedPostPublic setModalPost={setModalPost} />
        </section>
      </ContainerMid>
    </Container>
  );
};

export default FeedPublic;
