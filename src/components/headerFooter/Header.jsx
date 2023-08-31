import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Container from "../global/Container";
import { Link } from "react-router-dom";
import { UserContext } from "../../userContext";
import useMedia from "../../Hooks/useMedia";
import MenuMobile from "../menu/MenuMobile";
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
      {mobile && <MenuMobile />}

      {!mobile ? (
        <Container>
          <nav className={styles.nav}>
            <Link to={"/"} aria-label="xyz - home" className={styles.logo}>
              LOGO
            </Link>

            <div className={styles.userProfile}>
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
          </nav>
        </Container>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;

/**Neste comentário, explicamos que o componente Header representa a barra de navegação no topo da página e fornece informações sobre como o componente lida com o logout do usuário e redirecionamento. Isso torna mais fácil entender o comportamento do componente e como usá-lo. */
