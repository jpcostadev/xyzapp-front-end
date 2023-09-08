import React from "react";
import ContainerMid from "../global/ContainerMid";
import styles from "./Feed.module.css";
import Container from "../global/Container";
import FeedModal from "./FeedModal";
import FeedPost from "./FeedPost";

const Feed = () => {
  const [modalPost, setModalPost] = React.useState(null);
  return (
    <Container>
      <ContainerMid>
        <section className={styles.section}>
          {modalPost && (
            <FeedModal post={modalPost} setModalPost={setModalPost} />
          )}

          <FeedPost setModalPost={setModalPost} />
        </section>
      </ContainerMid>
    </Container>
  );
};

export default Feed;
