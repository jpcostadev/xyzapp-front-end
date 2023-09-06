import React from "react";
import styles from "./FeedPostsItens.module.css";

// Função para remover hífens e capitalizar palavras
function formatText(text) {
  // Remova os hífens e divida o texto em palavras
  const words = text.split("-");

  // Capitalize cada palavra
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );

  // Junte as palavras novamente com espaços
  return capitalizedWords.join(" ");
}

const FeedPostsItens = ({ post, setModalPost }) => {
  const subCategoriaFormatado = formatText(post.sub_categoria);
  const categoriaFormatado = formatText(post.categoria);
  const postadorFormatado = formatText(post.postador_name);
  const turno = formatText(post.turno_atendimento);

  function handleClick() {
    setModalPost(post);
  }
  return (
    <li onClick={handleClick} key={post.id} className={styles.post}>
      <div className={styles.anuncioBox}>
        <h1 className={styles.titulo}>{subCategoriaFormatado}</h1>

        <div className={styles.userInfo}>
          <p>{categoriaFormatado}</p>
        </div>

        <div className={styles.containerUser}>
          <p className={styles.user}>
            Usuário: <span>{postadorFormatado}</span>
          </p>
          <p className={styles.user}>
            Disponível: <span>{turno}</span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default FeedPostsItens;
