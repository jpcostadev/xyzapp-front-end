import React, { useContext } from "react";
import styles from "./LoginCreate.module.css";
import Input from "../forms/Input";
import Button from "../forms/Button";
import useForm from "../../Hooks/useForm";
import { USER_POST, BUSCAR_CEP } from "../../Api";
import { Link } from "react-router-dom";
import entrar from "../../assets/Icones/entrar.svg";
import { UserContext } from "../../userContext";
import useFetch from "../../Hooks/useFetch";
import Error from "../forms/Error";
import Radio from "../forms/Radio";
import Loading from "../utils/Loading";

const LoginCreate = () => {
  // Hooks personalizados para gerenciar campos de formulário
  const username = useForm();
  const email = useForm("email");
  const password = useForm("password");
  const nome = useForm();
  const sobrenome = useForm();
  const cep = useForm("number");
  const cidade = useForm();
  const estado = useForm();
  const tipo = useForm();
  const profissao = useForm();
  const telefone = useForm("telefone");
  const whatsapp = useForm("telefone");
  const disponibilidade = useForm();
  const dias_disponiveis = useForm();

  // Estado para controlar a aceitação dos termos
  const [termosAceitos, setTermosAceitos] = React.useState(false);

  // Obtém a função de login do contexto do usuário
  const { userLogin } = React.useContext(UserContext);

  // Hook personalizado para fazer requisições
  const { loading, error, setError, request } = useFetch();

  // Estado para controlar a etapa atual do registro
  const [currentStep, setCurrentStep] = React.useState(1);

  // Função para verificar se todos os campos da segunda etapa estão preenchidos
  const isSecondStepComplete = () => {
    return (
      nome.value &&
      sobrenome.value &&
      cep.value &&
      cidade.value &&
      estado.value &&
      whatsapp.value &&
      termosAceitos
    );
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentStep === 1) {
      handleNextStep(2);
    } else if (currentStep === 2 && isSecondStepComplete()) {
      const cepValue = cep.value.replace(/\D/g, ""); // Remove caracteres não numéricos

      const { url, options } = USER_POST({
        cep: cepValue,
        cidade: cidade.value,
        estado: estado.value,
        username: username.value,
        email: email.value,
        nome: nome.value,
        sobrenome: sobrenome.value,
        password: password.value,
        whatsapp: whatsapp.value,
        tipo: tipo.value === "cliente" ? "cliente" : "profissional",
        termos: termosAceitos ? true : "Aceito Termos",
      });
      console.log(estado);
      const { response } = await request(url, options);

      if (response.ok) {
        userLogin(username.value, password.value);
      } else {
        // setError("Ocorreu um erro no cadastro.");
      }
    }
  };

  // Função para avançar para a próxima etapa
  const handleNextStep = (nextStep) => {
    setCurrentStep(nextStep);
  };

  // Função para buscar o CEP e atualizar a cidade e o estado
  const fetchCEP = async (cepValue) => {
    const response = await BUSCAR_CEP(cepValue);

    if (response && !response.erro) {
      cidade.setValue(response.localidade);
      estado.setValue(response.uf);
      setError(null); // Limpa o erro quando um novo CEP é digitado
    } else {
      cidade.setValue("");
      estado.setValue("");
      setError("CEP não encontrado. Por favor, verifique o CEP informado.");
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
        {currentStep === 1 && (
          <>
            <Input label="Usuário:" type="text" name="username" {...username} />

            <Input
              label="Email:"
              type="email"
              name="email"
              value={email.value}
              onChange={(e) => {
                email.setValue(e.target.value);
                setError(null); // Limpa o erro relacionado ao email quando ele é alterado
              }}
            />

            <Input
              label="Senha:"
              type="password"
              name="password"
              {...password}
            />

            <p className={styles.p}>Você é:</p>
            <Radio opcao1={"cliente"} opcao2={"profissional"} {...tipo} />

            <Button
              onClick={() => handleNextStep(2)}
              disabled={!username.value || !email.value || !password.value}
            >
              Avançar
            </Button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <Input label="Nome:" type="text" name="nome" required {...nome} />
            <Input
              label="Sobrenome:"
              type="text"
              name="sobrenome"
              required
              {...sobrenome}
            />

            <Input
              label="Telefone:"
              type="text"
              name="telefone"
              required
              placeholder="xx xxxx-xxxx"
              {...telefone}
              onBlur={() => {
                const value = telefone.value.replace(/\D/g, "");
                if (!/^\d{11}$/.test(value)) {
                  telefone.setValue(""); // Limpa o valor se não for um número válido
                }
              }}
            />
            <Input
              label="WhatsApp:"
              type="text"
              name="whatsapp"
              required
              placeholder="xx xxxx-xxxx"
              {...whatsapp}
              onBlur={() => {
                const value = whatsapp.value.replace(/\D/g, "");
                if (!/^\d{11}$/.test(value)) {
                  whatsapp.setValue(""); // Limpa o valor se não for um número válido
                }
              }}
            />

            <Input
              label="Cep:"
              type="text"
              name="cep"
              placeholder="Apenas números"
              {...cep}
              onBlur={async () => {
                const cepValue = cep.value.replace(/\D/g, ""); // Remove caracteres não numéricos
                cep.setValue(cepValue);

                if (cepValue.length === 8) {
                  await fetchCEP(cepValue);
                } else {
                  cidade.setValue("");
                  estado.setValue("");
                  setError("CEP Inválido");
                }
              }}
              required
            />

            <Input
              label="Cidade:"
              type="text"
              name="cidade"
              required
              {...cidade}
            />
            <Input
              label="Estado:"
              type="text"
              name="estado"
              required
              {...estado}
            />

            <div className={styles.termosContainer}>
              <input
                className={styles.customCheckbox}
                type="checkbox"
                name="termos"
                id="termos"
                checked={termosAceitos}
                onChange={() => setTermosAceitos(!termosAceitos)}
                required
              />
              <Link to={"termos"} htmlFor="termos">
                Termos de Condição
              </Link>
            </div>

            <div className={styles.botoes}>
              <Button onClick={() => handleNextStep(1)}>Voltar</Button>
              {loading ? (
                <Button type="submit" disabled>
                  Cadastrando...
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={
                    currentStep === 2 &&
                    (!isSecondStepComplete() || error !== null)
                  }
                >
                  Cadastrar
                </Button>
              )}
            </div>
            {error && <Error error={error} />}
          </>
        )}
      </form>
    </section>
  );
};

export default LoginCreate;
