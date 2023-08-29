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

// Componente UserHeaderNav que renderiza a navegação do usuário na barra de cabeçalho
const UserHeaderNav = () => {
  // Obtém a função `userLogout` do contexto do usuário
  const { userLogout } = React.useContext(UserContext);

  // Obtém a função `navigate` para redirecionar o usuário
  const navigate = useNavigate();

  // Verifica se o tamanho da tela é menor que 800px usando o hook useMedia
  const mobile = useMedia("(max-width: 800px)");

  // Define o estado para controlar o menu móvel
  const [mobileMenu, setMobileMenu] = React.useState(false);

  // Obtém a localização atual da rota
  const { pathname } = useLocation();

  // Fecha o menu móvel quando a localização da rota muda
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  // Função para lidar com o logout do usuário
  function handleLogout() {
    userLogout(); // Chama a função de logout do contexto do usuário
    navigate("/login"); // Redireciona o usuário para a página de login
  }

  // Renderiza o componente UserHeaderNav
  return (
    <>
      {mobile && (
        // Botão para abrir/fechar o menu móvel
        <button
          className={`${styles.mobileButton} ${
            mobileMenu ? styles.mobileButtonActive : ""
          }`}
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <section className={styles.navContainer}>
        {/* Navegação do usuário */}
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

// Agora o código está devidamente comentado para explicar as diferentes partes do componente e sua funcionalidade. Se precisar de mais esclarecimentos ou tiver alguma pergunta específica sobre o código, por favor, me informe.
