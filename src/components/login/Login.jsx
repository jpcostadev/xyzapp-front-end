import React from "react";
import Container from "../global/Container";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";
import { UserContext } from "../../userContext";
import styles from "./Login.module.css";
import Termos from "./Termos";

// Componente Login que define as rotas para as páginas relacionadas ao login
const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to={"/conta"} />;

  return (
    <section className={styles.login}>
      <Container>
        <div className={styles.forms}>
          <span className={styles.logo}>
            <h1>LOGO</h1>
            <img src="" alt="" />
          </span>

          {/* Componente Routes para gerenciar as rotas internas */}
          <Routes>
            {/* Rota para a página de login (rota raiz) */}
            <Route path="/" element={<LoginForm />} />

            {/* Rota para a página de criação de conta */}
            <Route path="criar" element={<LoginCreate />} />

            {/* Rota para a página de criação de conta */}
            <Route path="termos" element={<Termos />} />

            {/* Rota para a página de recuperação de senha */}
            <Route path="perdeu" element={<LoginPasswordLost />} />

            {/* Rota para a página de redefinição de senha */}
            <Route path="resetar" element={<LoginPasswordReset />} />
          </Routes>
        </div>
      </Container>
    </section>
  );
};

export default Login;
