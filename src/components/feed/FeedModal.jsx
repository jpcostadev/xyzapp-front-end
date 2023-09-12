import React from "react";
import styles from "./FeedModal.module.css";
import useFetch from "../../Hooks/useFetch";
import { BUSCAR_CEP, POST_GET, SERVICO_GET } from "../../Api";
import Error from "../forms/Error";
import Loading from "../utils/Loading";
import PostContent from "./post/PostContent";
import { Link } from "react-router-dom";
import { UserContext } from "../../userContext";
import PostDelete from "./post/PostDelete";

const formatText = (text) => {
  // Substitui os hífens por espaços e, em seguida, formata a string
  const formattedText = text.replace(/-/g, " ");
  return (
    formattedText.charAt(0).toUpperCase() + formattedText.slice(1).toLowerCase()
  );
};

const FeedModal = ({ post, setModalPost }) => {
  const { data, error, loading, request } = useFetch();

  const user = React.useContext(UserContext);
  console.log(user.data);

  React.useEffect(() => {
    const { url, options } = POST_GET(post.id);
    request(url, options);
  }, [post, request]);

  // Função para buscar o CEP e atualizar a cidade e o estado

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      setModalPost(null);
    }
  }
  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {loading && <Loading />}
      <div className={styles.post}>
        <h1 className={styles.titulo}>
          <Link to={`/post/${post.id}`}>{post.sub_categoria}</Link>
        </h1>

        <div className={styles.infoProfissional}>
          <h2>Dados do Profissional</h2>
          <p>
            {post.nome} {post.sobrenome}
          </p>
          <p>
            {post && post.cidade} - {post && post.estado}{" "}
          </p>
          Turno Disponível: <span>{formatText(post.turno_atendimento)}</span>
        </div>

        {/* Botões de contato */}
        <div className={styles.dados}>
          <button className={styles.btnWpp}>
            <a
              target="blank"
              href={`https://api.whatsapp.com/send?phone=55${post.whatsapp}&text=Ol%C3%A1%20vi%20seu%20an%C3%BAncio%20no%20XYZ%20Worker%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20poderia%20me%20atender?%20`}
            >
              Whatsapp
            </a>
          </button>

          <button className={styles.btnLigar}>
            <a target="blank" href={`tel:${post.telefone}`}>
              Ligar
            </a>
          </button>

          <button className={styles.btnEmail}>
            <a href={`mailto:${post.email}`}>Email</a>
          </button>
        </div>
        {/* Botão de deletar */}
        <div className={styles.nomeUser}>
          {user.data && user.data.username === post.postador_name ? (
            <PostDelete id={post.id} />
          ) : (
            <Link to={`/perfil/${post.post_author}`}>
              @{post.postador_name}
            </Link>
          )}
        </div>
        {data && <PostContent data={data} />}
        {error && <Error error={error} />}
      </div>
    </div>
  );
};

export default FeedModal;
