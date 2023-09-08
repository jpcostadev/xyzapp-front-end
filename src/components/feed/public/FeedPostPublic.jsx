import React from "react";
import FeedPostsItens from "../FeedPostsItens";
import useFetch from "../../../Hooks/useFetch";
import { SERVICO_GET, SERVICO_GET_ALL } from "../../../Api";
import Error from "../../forms/Error";
import Loading from "../../utils/Loading";
import styles from "./FeedPostPublic.module.css";
import { UserContext } from "../../../userContext";

const FeedPostPublic = ({ setModalPost }) => {
  const { data, loading, error, request } = useFetch();

  const userContextData = React.useContext(UserContext);

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    async function fetchPost() {
      const { url, options } = SERVICO_GET_ALL({ page: 1, total: 6, user: 0 });
      const { response, json } = await request(url, options);
      console.log(json);
    }

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data) {
    return (
      <div>
        <h1 className="subTitulo">Destaques</h1>
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

export default FeedPostPublic;
