import React from "react";
import styles from "./UserHeaderNav.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../userContext";
import { ReactComponent as MeusAnuncios } from "../../assets/Icones/feed.svg";
import { ReactComponent as Estatisticas } from "../../assets/Icones/estatisticas.svg";
import { ReactComponent as Anunciar } from "../../assets/Icones/adicionar.svg";
import { ReactComponent as Sair } from "../../assets/Icones/sair.svg";
import { useNavigate } from "react-router-dom";
import useMedia from "../../Hooks/useMedia";

// ____

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const navigate = useNavigate();

  const mobile = useMedia("(max-width: 800px)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  function handleLogout() {
    userLogout();
    navigate("/login");
  }

  return (
    <>
      {mobile && (
        <button
          className={`${styles.mobileButton} ${
            mobileMenu ? styles.mobileButtonActive : ""
          }`}
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <section className={styles.navContainer}>
        <nav
          className={`${mobile ? styles.navMobile : styles.nav} ${
            mobileMenu && styles.navMobileActive
          }`}
        >
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
          <button className={styles.sairBtn} onClick={handleLogout}>
            <Sair /> {mobile && "Sair"}
          </button>
        </nav>
      </section>
    </>
  );
};
export default UserHeaderNav;
