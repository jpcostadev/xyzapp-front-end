import React from "react";
import styles from "./UserHeaderNav.module.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../userContext";
import { ReactComponent as MeusAnuncios } from "../../assets/Icones/feed.svg";
import { ReactComponent as Estatisticas } from "../../assets/Icones/estatisticas.svg";
import { ReactComponent as Anunciar } from "../../assets/Icones/adicionar.svg";
import { ReactComponent as Sair } from "../../assets/Icones/sair.svg";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const [mobile, setMobile] = React.useState(null);

  return (
    <section className={styles.navContainer}>
      <nav className={styles.nav}>
        <NavLink to="/conta" end>
          <MeusAnuncios />
          {mobile && "Meus Anúncios"}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <Estatisticas /> {mobile && "Estatísticas"}
        </NavLink>
        <NavLink to="/conta/anunciar">
          <Anunciar />
          {mobile && "Anunciar"}
        </NavLink>
        <button className={styles.sairBtn} onClick={userLogout}>
          <Sair /> {mobile && "Sair"}
        </button>
      </nav>
    </section>
  );
};
export default UserHeaderNav;
