import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Container from "../global/Container";
import { Link } from "react-router-dom";
import { UserContext } from "../../userContext";

const Header = () => {
  const navigate = useNavigate(); // Adicione esta linha para obter a função navigate

  const { data, userLogout } = React.useContext(UserContext);

  const handleLogout = () => {
    userLogout();
    navigate("/login"); // Use a função navigate para redirecionar após o logout
  };

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.nav}>
          <Link to={"/"} aria-label="xyz - home" className={styles.logo}>
            LOGO
          </Link>
          {data ? (
            <Link to="/conta" className={styles.login}>
              {data && data.username + " " + data.sobrenome}
              {/* <button onClick={handleLogout}>sair</button> */}
            </Link>
          ) : (
            <Link to={"/login"} aria-label="xyz login" className={styles.login}>
              Entrar / Anunciar
            </Link>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
