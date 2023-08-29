import { useState } from "react";

const useAuth = () => {
  // Estado para armazenar os dados de autenticação (nome de usuário e senha)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Estado para armazenar mensagens de erro
  const [error, setError] = useState(null);

  // Função para lidar com mudanças nos campos de entrada (nome de usuário e senha)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  // Função para validar os campos de entrada
  const validateCredentials = () => {
    if (!credentials.username || !credentials.password) {
      setError("Por favor, preencha todos os campos.");
      return false;
    }
    // Se os campos estiverem preenchidos, limpa qualquer mensagem de erro anterior
    setError(null);
    return true;
  };

  // Retorna os estados e funções necessários para lidar com a autenticação
  return {
    credentials, // Dados de autenticação (nome de usuário e senha)
    error, // Mensagem de erro, se houver
    handleInputChange, // Função para lidar com mudanças nos campos de entrada
    validateCredentials, // Função para validar os campos de entrada
  };
};

export default useAuth;

/*
Este hook pode ser usado em componentes de autenticação para gerenciar o estado dos campos de entrada (nome de usuário e senha), lidar com alterações nesses campos e validar se ambos os campos estão preenchidos antes de enviar uma solicitação de autenticação. É uma abordagem útil para reutilizar a lógica de autenticação em vários componentes.
*/
