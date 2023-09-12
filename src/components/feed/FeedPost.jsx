import React from "react";
import FeedPostsItens from "./FeedPostsItens";
import useFetch from "../../Hooks/useFetch";
import { SERVICO_GET, SERVICO_GET_ALL } from "../../Api";
import Error from "../forms/Error";
import Loading from "../utils/Loading";
import styles from "./FeedPost.module.css";
import { UserContext } from "../../userContext";

const FeedPost = ({ setModalPost }) => {
  const { data, loading, error, request } = useFetch();

  const userContextData = React.useContext(UserContext);
  const id = userContextData.data ? userContextData.data.id : null;

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    async function fetchPost() {
      const { url, options } = SERVICO_GET(token, id);
      const { response, json } = await request(url, options);
    }

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data) {
    return (
      <div>
        <ul className={styles.feed}>
          {data.map((post) => (
            <FeedPostsItens
              key={post.id}
              post={post}
              setModalPost={setModalPost}
            />
          ))}
        </ul>
      </div>
    );
  } else return null;
};

export default FeedPost;
