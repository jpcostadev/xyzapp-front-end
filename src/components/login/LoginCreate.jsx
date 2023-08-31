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
  // Hooks personalizados para gerenciar campos de formulário
  const username = useForm();
  const email = useForm("email");
  const password = useForm("password");
  const nome = useForm();
  const sobrenome = useForm();
  const cep = useForm("number");

  // Obtém a função de login do contexto do usuário
  const { userLogin } = React.useContext(UserContext);

  // Hook personalizado para fazer requisições
  const { loading, error, setError, request } = useFetch();

  // Estado para controlar os termos de aceitação
  const [termos, setTermos] = React.useState("Aceito Termos");

  // Estado para controlar a etapa atual do registro
  const [currentStep, setCurrentStep] = React.useState(1);

  // Campos do formulário para a primeira etapa de registro
  const firstStepFields = (
    <>
      <Input label="Usuário:" type="text" name="username" {...username} />
      <Input label="Email:" type="email" name="email" {...email} />
      <Input label="Senha:" type="password" name="password" {...password} />
      <Button
        onClick={() => handleNextStep(2)}
        disabled={!username.value || !email.value || !password.value} // Habilita o botão apenas quando todos os campos estão preenchidos
      >
        Próxima Etapa
      </Button>
      {error && <Error error={error} />}
    </>
  );

  // Verifica se todos os campos da segunda etapa estão preenchidos
  const isSecondStepComplete = () => {
    return (
      nome.value && sobrenome.value && cep.value && termos !== "Aceito Termos"
    );
  };

  // Campos do formulário para a segunda etapa de registro
  const secondStepFields = (
    <>
      <Input label="Nome:" type="text" name="nome" {...nome} />
      <Input label="Sobrenome:" type="text" name="sobrenome" {...sobrenome} />
      <Input label="CEP:" type="text" name="cep" {...cep} />
      <div className={styles.termosContainer}>
        <input
          className={styles.customCheckbox}
          type="checkbox"
          name="termos"
          id="termos"
          value={"Aceito Termos"}
          // checked={termos === "Aceito Termos"}
          onChange={() =>
            setTermos(termos === "Aceito Termos" ? "" : "Aceito Termos")
          }
          required
        />
        <Link to={"termos"} htmlFor="termos">
          Termos de Condição
        </Link>
      </div>
      <Button onClick={() => handleNextStep(1)}>Voltar</Button>

      {loading ? (
        <Button disabled>Cadastrando...</Button>
      ) : (
        <Button
          type="submit"
          disabled={currentStep === 2 && !isSecondStepComplete()} // Habilita o botão apenas quando todos os campos estão preenchidos na segunda etapa
        >
          Cadastrar
        </Button>
      )}

      {error && <Error error={error} />}
    </>
  );

  // Função para avançar para a próxima etapa
  const handleNextStep = (nextStep) => {
    setCurrentStep(nextStep);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentStep === 1) {
      handleNextStep(2);
    } else if (currentStep === 2 && isSecondStepComplete()) {
      const { url, options } = USER_POST({
        cep: cep.value,
        username: username.value,
        email: email.value,
        nome: nome.value,
        sobrenome: sobrenome.value,
        password: password.value,
        termos: termos === "Aceito Termos" ? termos : true,
      });

      const { response } = await request(url, options);

      if (response.ok) {
        userLogin(username.value, password.value);
        // Você pode adicionar redirecionamentos ou outras ações aqui após o registro bem-sucedido
      }
    }
  };

  return (
    <section className={`${styles.section} animeLeft`}>
      <Link className={styles.acessarConta} to={"/login"}>
        Acessar sua conta
        <img src={entrar} alt="" />
      </Link>
      <h1 className="titulo">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && firstStepFields}
        {currentStep === 2 && secondStepFields}
      </form>
    </section>
  );
};

export default LoginCreate;

/*
Resumo:

Este componente é responsável por criar um formulário de registro com duas etapas.
Na primeira etapa, o usuário insere seu nome de usuário, email e senha.
O botão "Próxima Etapa" é habilitado somente quando todos os campos da primeira etapa estão preenchidos.
Na segunda etapa, o usuário insere seu nome, sobrenome, CEP e aceita os termos.
O botão "Cadastrar" na segunda etapa é habilitado somente quando todos os campos da segunda etapa estão preenchidos.
O registro é enviado para a API quando todos os campos da segunda etapa estão preenchidos e o botão "Cadastrar" é clicado.
Após o registro bem-sucedido, o usuário é redirecionado ou outras ações podem ser executadas.
*/
