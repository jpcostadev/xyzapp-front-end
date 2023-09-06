import React from "react";
import styles from "./UserInfo.module.css";
import { Link } from "react-router-dom";

const UserInfo = ({ user, ativo }) => {
  return (
    <div className={`${ativo && styles.ativo} ${styles.infoContent} animeLeft`}>
      <div className={styles.userProfile}>
        {user ? (
          <Link to="/conta" className={styles.login}>
            {user && `Olá ${user.nome}`}
          </Link>
        ) : (
          <Link to={"/login"} aria-label="xyz login" className={styles.login}>
            Entrar / Registrar
          </Link>
        )}
      </div>
      <div className={styles.dados}>
        {user ? (
          <p className={styles.plano}>
            Plano: <span>{user ? user.plano_ativo : "Carregando..."}</span>
          </p>
        ) : (
          ""
        )}
        {user ? (
          <p className={styles.plano}>
            Postagens:{" "}
            <span>
              {" "}
              {user.contador_postagens}/ {user.limite_postagens}
            </span>
          </p>
        ) : (
          ""
        )}
        {user ? (
          <p className={styles.plano}>
            Duração: <span> {user.tempo_restante} Dias</span>
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UserInfo;
