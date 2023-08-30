import React from "react";
import styles from "./MenuMobile.module.css";
import useMedia from "../../Hooks/useMedia";
import { Link, NavLink, useLocation } from "react-router-dom";
import Container from "../global/Container";
import { UserContext } from "../../userContext";

const MenuMobile = () => {
  // Verifica se a tela é móvel com base na largura

  const mobile = useMedia("(max-width: 800px)");

  // Obtém os dados do usuário e função para fazer logout do contexto
  const { data, userLogout } = React.useContext(UserContext);

  // Estado para controlar a exibição do menu móvel
  const [mobileMenu, setMobileMenu] = React.useState(false);

  // Obtém o pathname da localização atual
  const { pathname } = useLocation();

  // Fecha o menu móvel quando a rota muda
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  // Função para alternar a visibilidade do menu móvel
  const handleMobileMenuClick = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <Container>
      <header className={styles.header}>
        <nav className={`${styles.nav} ${mobileMenu && styles.navActive}`}>
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

          <div className={styles.infoContent}>
            <img src="" alt="" />

            <div className={styles.userProfile}>
              {/* Links para perfil ou login/registro, dependendo do estado do usuário */}
              {data ? (
                <Link to="/conta" className={styles.login}>
                  {data && "Olá" + " " + data.username}
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  aria-label="xyz login"
                  className={styles.login}
                >
                  Entrar / Registrar
                </Link>
              )}
            </div>
            {data ? (
              <div className={styles.infoPlans}>
                {/* Exibe informações sobre o plano ativo e limite de postagens */}
                <p>
                  Plano ativo: <span>{data.plano_ativo}</span>
                </p>

                <p>
                  Limite:{" "}
                  <span>
                    {data.contador_postagens}/{data.limite_postagens}
                  </span>{" "}
                  Postagens
                </p>
              </div>
            ) : (
              <Link to={"/login"} />
            )}
          </div>

          <div className={styles.infoMenu}>
            {/* Links para diferentes partes do menu */}
            <NavLink to={"/editar-categoria"}>Editar minha categoria</NavLink>
            <NavLink to={"/conta"}>Meu Perfil</NavLink>
            <NavLink to={"/indique"}>Indique e Ganhe</NavLink>
          </div>

          <div className={styles.ul}>
            <ul className={styles.linksMenu}>
              {/* Links do menu */}
              <li>comprar Moedas</li>
              <li>Pedidos Disponíveis</li>
              <li>Meus Pedidos</li>
              <li>Alguma coisa</li>
              <li>Contratar um profissional</li>
              <li>Fale Conosco</li>
              <li>Sair</li>
            </ul>
          </div>
        </nav>
      </header>
    </Container>
  );
};

export default MenuMobile;
