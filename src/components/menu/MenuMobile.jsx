import React from "react";
import styles from "./MenuMobile.module.css";
import useMedia from "../../Hooks/useMedia";
import { Link, useLocation } from "react-router-dom";
import Container from "../global/Container";
import { UserContext } from "../../userContext";
import { useNavigate } from "react-router-dom";
import UserInfo from "./renders/userInfo";
import InfoPlans from "./renders/InfoPlans";
import LinksMenu from "./renders/LinksMenu";

const MenuMobile = () => {
  // Verifica se a tela é móvel com base na largura

  const mobile = useMedia("(max-width: 800px)");
  const navigate = useNavigate();

  // Obtém os dados do usuário e função para fazer logout do contexto
  const { data, setData, error, userLogout, updateUserData } =
    React.useContext(UserContext);

  // Estado para controlar a exibição do menu móvel
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const [ativo, setAtivo] = React.useState(false);
  const token = window.localStorage.getItem("token");

  // Obtém o pathname da localização atual
  const { pathname } = useLocation();

  const menuRef = React.useRef(null);

  // Fecha o menu móvel quando a rota muda
  React.useEffect(() => {
    setMobileMenu(false);
    setAtivo(false);
  }, [pathname]);

  // Função para alternar a visibilidade do menu móvel
  const handleMobileMenuClick = () => {
    setMobileMenu(!mobileMenu);
    setAtivo(!ativo);

    if (data && !error) {
      setData(updateUserData(token));
    } else {
      userLogout();
    }
  };

  // Função para fechar o menu quando clicar fora dele
  const handleDocumentClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMobileMenu(false);
      setAtivo(false);
    }
  };

  React.useEffect(() => {
    // Adicionar event listener ao documento para detectar cliques fora do menu
    document.addEventListener("click", handleDocumentClick);

    // Remover o event listener quando o componente for desmontado
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <header className={styles.header}>
      <nav
        className={`${styles.nav} ${mobileMenu && styles.navActive} `}
        ref={menuRef}
      >
        {/* Botão e nav do menu Mobile */}
        <div className={styles.btnContainer}>
          {/* Botão para abrir/fechar o menu móvel */}
          {mobile && (
            <button
              className={`${styles.mobileButton} ${
                mobileMenu ? styles.mobileButtonActive : styles.mobileButton
              }`}
              aria-label="Menu"
              onClick={handleMobileMenuClick}
            >
              <span className={styles.hamburger}></span>
            </button>
          )}
          {/* Link para a página inicial (apenas visível em telas não móveis) */}
          {!mobile ? (
            <Link to={"/"} aria-label="xyz - home" className={styles.logo}>
              LOGO
            </Link>
          ) : (
            ""
          )}
        </div>

        {/*  A partir daqui só renderiza se estiver logado. */}
        <div
          className={`${styles.infoUser} ${
            mobileMenu && styles.infoUserActive
          } `}
        >
          {mobile && <UserInfo user={data} ativo={ativo} />}
        </div>

        <div>{mobile && <LinksMenu ativo={ativo} />}</div>
      </nav>
    </header>
  );
};

export default MenuMobile;
