import React from "react";
import { Link } from "react-router-dom";
import Input from "../forms/Input";
import Button from "../forms/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../userContext";
import Error from "../forms/Error";
import styles from "./LoginForm.module.css";

// Componente LoginForm
const LoginForm = () => {
  // Obtém a função `userLogin` do contexto do usuário
  const { userLogin, error, loading } = React.useContext(UserContext);

  // Cria estados para os campos de entrada (username e password)
  const username = useForm();
  const password = useForm();

  // Função para lidar com o envio do formulário
  async function handleSubmit(event) {
    event.preventDefault();

    // Valida os campos de entrada usando a função `validate` do hook useForm
    if (username.validate() && password.validate()) {
      // Chama a função de login do contexto de usuário
      userLogin(username.value, password.value);
    }
  }

  // Renderiza o formulário de login
  return (
    <section className="animeLeft">
      <h1 className="titulo">Login</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Componente Input para o campo de usuário */}
        <Input
          label="Usuário/E-mail"
          type="text"
          name="username"
          {...username}
        />

        {/* Componente Input para o campo de senha */}
        <Input label="Senha" type="password" name="password" {...password} />
        {error && <Error error={error} />}

        {/* Botão para enviar o formulário */}

        {loading ? (
          <button className={styles.buttonEntrar} disabled>
            Carregando...
          </button>
        ) : (
          <button className={styles.buttonEntrar}>Entrar</button>
        )}
      </form>

      <Link className={styles.perdeu} to={"/login/perdeu"}>
        Perdeu a Senha?
      </Link>

      {/* Link para a página de cadastro */}
      <div className={styles.cadastro}>
        <h2 className="subTitulo">Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={styles.button} to={"/login/criar"}>
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
