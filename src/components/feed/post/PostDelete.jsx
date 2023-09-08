import React from "react";
import styles from "./PostDelete.module.css";
import { SERVICO_DELETE } from "../../../Api";
import useFetch from "../../../Hooks/useFetch";

const PostDelete = ({ id }) => {
  const { loading, request } = useFetch();

  async function handleClick() {
    const confirm = window.confirm("Deseja deletar este post?");
    if (confirm) {
      const { url, options } = SERVICO_DELETE(id);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  }

  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Deletando...
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PostDelete;
