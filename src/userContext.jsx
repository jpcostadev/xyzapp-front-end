import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./Api";
import { useNavigate } from "react-router-dom";

// Criação de um contexto para gerenciamento de dados de usuário
export const UserContext = React.createContext();

// Componente de contexto para gerenciamento de dados de usuário
export const UserStorage = ({ children }) => {
  // Estados para armazenar os dados do usuário, estado de login, estado de carregamento e erros
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Hook de navegação para redirecionar o usuário para diferentes rotas
  const navigate = useNavigate();

  // Função para buscar os dados do usuário usando um token
  async function fetchUserData(token) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = USER_GET(token);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Erro ao buscar dados do usuário");
      const userData = await response.json();
      setData(userData);
      setLogin(true);
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  // Função para atualizar os dados do usuário no contexto
  const updateUserData = async (token) => {
    try {
      const { url, options } = USER_GET(token);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Erro ao buscar dados do usuário");
      const userData = await response.json();
      setData(userData);
      setLogin(true);
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer logout do usuário
  const userLogout = React.useCallback(async function () {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem("token");
  }, []);

  // Função para buscar dados do usuário usando um token
  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  // Função para fazer login do usuário
  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      const errorMessage = response.statusText || "Dados inválidos";
      if (!response.ok) throw new Error(`Error: ${errorMessage}`);
      const { token } = await response.json();
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("/conta");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  // Hook de efeito para realizar o login automático do usuário se um token estiver armazenado
  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  // Fornecimento de dados e funções de contexto para os componentes filhos
  return (
    <UserContext.Provider
      value={{
        userLogin,
        setData,
        userLogout,
        getUser,
        updateUserData,
        data,
        error,
        loading,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
/*
Neste código:

Cria-se um contexto chamado UserContext para gerenciar os dados do usuário.

Define-se o componente UserStorage que é um provedor de contexto para gerenciar os dados do usuário.

Usa-se o estado data para armazenar os dados do usuário, login para rastrear o status de login, loading para controlar o estado de carregamento e error para rastrear mensagens de erro.

O hook useNavigate é usado para obter uma função de navegação que permite redirecionar o usuário para diferentes rotas.

fetchUserData é uma função assíncrona para buscar os dados do usuário usando um token. Ela atualiza os estados de acordo com o resultado da busca.

updateUserData é outra função assíncrona para atualizar os dados do usuário no contexto.

userLogout é uma função de logout que limpa os dados do usuário do estado e do armazenamento local.

getUser é uma função que busca os dados do usuário usando um token e atualiza o estado.

userLogin é uma função para fazer login do usuário, que também armazena o token no armazenamento local e redireciona o usuário para a rota "/conta".

O hook de efeito useEffect é usado para realizar login automático se um token estiver armazenado no armazenamento local.

O contexto é fornecido para os componentes filhos, permitindo que eles acessem as funções e estados relacionados ao usuário
*/
