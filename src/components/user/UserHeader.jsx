import React, { useEffect } from "react";
import UserHeaderNav from "./UserHeaderNav";
import styles from "../user/UserHeader.module.css";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../userContext";

const UserHeader = () => {
  const [title, setTitle] = React.useState("");
  const location = useLocation();
  const { data, setData } = React.useContext(UserContext);
  console.log(data);
  React.useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case "/conta/estatisticas":
        setTitle("Estatísticas");
        break;
      case "/conta/anunciar":
        setTitle("Criar um anúncio");
        break;
      default:
        setTitle("Meus Anúncios");
    }
    if ("/conta/estatisticas" === location.pathname) setTitle("Estatísticas");
  }, [location]);
  return (
    <header className={styles.header}>
      <h1 className="titulo">{title}</h1>
      <span className={styles.containerPlanoAtivo}>
        <p className={styles.plano}>
          {" "}
          Plano Ativo: <span>{data && data.plano_ativo}</span>{" "}
        </p>
        <p className={styles.plano}>
          {" "}
          Postagens: <span>{data && data.limite_postagens}</span>{" "}
        </p>
        <p className={styles.plano}>
          {" "}
          Tempo Restante: <span>{data && data.tempo_restante} Dias</span>{" "}
        </p>
      </span>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
