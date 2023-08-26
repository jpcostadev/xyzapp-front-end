import React, { useContext } from "react";
import styles from "./LoginCreate.module.css";
import Input from "../forms/Input";
import Button from "../forms/Button";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../Api";
import { Link } from "react-router-dom";
import entrar from "../../assets/Icones/entrar.svg";
import { UserContext } from "../../userContext";
import useFetch from "../../Hooks/useFetch";
import Error from "../forms/Error";

const LoginCreate = () => {
  const cep = useForm("number");
  const username = useForm();
  const email = useForm("email");
  const nome = useForm();
  const sobrenome = useForm();
  const password = useForm("password");
  const termos = useForm("termos");

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      cep: cep.value,
      username: username.value,
      email: email.value,
      nome: nome.value,
      sobrenome: sobrenome.value,
      password: password.value,
    });
    const response = await fetch(url, options);
    console.log(response);
    if (response.ok) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Link className={styles.acessarConta} to={"/login"}>
        Acessar sua conta
        <img src={entrar} alt="" />
      </Link>
      <h1 className="titulo">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="CEP:"
          type="text"
          name="cep"
          placeholder="xxxxx-xx"
          {...cep}
        />
        <Input label="Usuário:" type="text" name="username" {...username} />
        <Input
          label="Email:"
          placeholder="seuemail@email.com"
          type="email"
          name="email"
          {...email}
        />
        <Input label="Nome:" type="text" name="nome" {...nome} />
        <Input label="Sobrenome:" type="text" name="sobrenome" {...sobrenome} />
        <Input label="Senha:" type="password" name="password" {...password} />

        <span className={styles.termosContainer}>
          <input
            className={styles.customCheckbox}
            type="checkbox"
            name="termos"
            id="termos"
            value="true"
            required
            // {...termos}
          />
          <Link to={"termos"} htmlFor="termos">
            Termos de Condição
          </Link>
        </span>

        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
