import React from "react";
import styles from "./FeedModal.module.css";
import useFetch from "../../Hooks/useFetch";
import { POST_GET, SERVICO_GET } from "../../Api";
import Error from "../forms/Error";
import Loading from "../utils/Loading";
import PostContent from "./post/PostContent";
import { Link } from "react-router-dom";

const formatText = (text) => {
  // Substitui os hífens por espaços e, em seguida, formata a string
  const formattedText = text.replace(/-/g, " ");
  return (
    formattedText.charAt(0).toUpperCase() + formattedText.slice(1).toLowerCase()
  );
};

const FeedModal = ({ post, setModalPost }) => {
  const { data, error, loading, request } = useFetch();

  // console.log(data);
  React.useEffect(() => {
    const { url, options } = POST_GET(post.id);
    request(url, options);
  }, [post, request]);

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      setModalPost(null);
    }
    console.log(event.target);
    console.log(event.currentTarget);
  }
  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {loading && <Loading />}
      <div className={styles.post}>
        <h1 className={styles.titulo}>
          <Link to={`/post/${post.id}`}>{post.sub_categoria}</Link>
        </h1>

        <p>
          Turno Disponível: <span>{formatText(post.turno_atendimento)}</span>
        </p>
        <p>Whatsapp</p>
        <p>Whatsapp</p>
        <Link className={styles.nomeUser} to={`/perfil/${post.post_author}`}>
          @{post.postador_name}{" "}
        </Link>
      </div>
      {data && <PostContent data={data} />}
      {error && <Error error={error} />}
    </div>
  );
};

export default FeedModal;
