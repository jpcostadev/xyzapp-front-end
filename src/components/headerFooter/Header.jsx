import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Container from "../global/Container";
import { Link } from "react-router-dom";
import { UserContext } from "../../userContext";
import useMedia from "../../Hooks/useMedia";
import verificado from "../../assets/Icones/verificado.svg";
import logo from "../../assets/img/logo2.svg";
/**
 * O componente Header representa a barra de navegação no topo da página.
 *
 * @component
 * @returns {JSX.Element} - Retorna um elemento JSX que representa o cabeçalho da página.
 */
const Header = () => {
  const navigate = useNavigate(); // Obtém a função navigate do React Router

  const { data, userLogout, login } = React.useContext(UserContext);

  const mobile = useMedia("(max-width: 800px");

  /**
   * Função para lidar com o logout do usuário.
   * Esta função chama userLogout() para efetuar o logout e, em seguida, redireciona para a página de login.
   */
  const handleLogout = () => {
    userLogout();
    navigate("/login"); // Use a função navigate para redirecionar após o logout
  };

  return (
    <header className={styles.header}>
      {!mobile ? (
        <Container>
          <nav className={styles.nav}>
            <Link to={"/"} aria-label="xyz - home" className={styles.logo}>
              <img className={styles.logo} src={logo} alt="" />
            </Link>

            <div className={styles.userProfile}>
              {data ? (
                <Link to="/conta" className={styles.login}>
                  {data && "Olá" + " " + data.username}{" "}
                  <img src={verificado} alt="" />
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
          </nav>
        </Container>
      ) : (
        <header className={styles.headerM}>
          <nav className={styles.navM}>
            <p>Início</p>
            <p>Anuncios</p>
            <p>+</p>
            <p>Mensagens</p>
            <span className={styles.hamburger}>
              <button className={styles.btnMenu}>Menu</button>
            </span>
          </nav>
        </header>
      )}
    </header>
  );
};

export default Header;

/**Neste comentário, explicamos que o componente Header representa a barra de navegação no topo da página e fornece informações sobre como o componente lida com o logout do usuário e redirecionamento. Isso torna mais fácil entender o comportamento do componente e como usá-lo. */
