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

/**
 * O componente Login gerencia as rotas relacionadas ao login e exibe o formulário de login.
 * Redireciona automaticamente para a página de conta se o usuário já estiver logado.
 *
 * @component
 * @returns {JSX.Element} - Retorna um elemento JSX que representa a página de login.
 */
const Login = () => {
  const { login } = React.useContext(UserContext);

  // Se o usuário já estiver logado, redireciona para a página de conta
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

            {/* Rota para a página de termos de uso */}
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
/**Neste comentário, explicamos que o componente Login é responsável por gerenciar as rotas relacionadas ao login e que ele redireciona automaticamente para a página de conta se o usuário já estiver logado. Também detalhamos as diferentes rotas e componentes que são usados para construir a página de login. Isso fornece uma visão geral clara do comportamento deste componente. */
