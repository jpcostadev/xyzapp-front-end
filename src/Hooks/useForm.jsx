import React from "react";

// Definindo diferentes tipos de validação para campos de formulário
const types = {
  email: {
    regex:
      // Expressão regular para validar e-mails
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email válido", // Mensagem de erro para e-mails inválidos
  },
  password: {
    regex:
      // Expressão regular para validar senhas
      /^(?=.*\d).{8,}$/,
    message: "A senha precisa ter no mínimo 8 caracteres", // Mensagem de erro para senhas inválidas
  },

  number: {
    regex: /^\d+$/, // Expressão regular para validar números
    message: "Utilize números apenas", // Mensagem de erro para números inválidos
  },
};

// Componente useForm para lidar com a validação de campos de formulário
const useForm = (type) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  // Função para validar um valor com base no tipo especificado
  function validate(value) {
    if (type === false) return true; // Se o tipo for especificado como false, retorna verdadeiro
    if (value.length === 0) {
      setError("Preencha um valor!"); // Se o valor estiver vazio, define uma mensagem de erro
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message); // Se o valor não corresponder ao tipo especificado, define a mensagem de erro correspondente
      return false;
    } else {
      setError(null); // Caso contrário, não há erro
      return true;
    }
  }

  // Função para lidar com eventos de mudança no campo de entrada
  function onChange({ target }) {
    if (error) validate(target.value); // Se houver um erro, valida o novo valor
    setValue(target.value); // Atualiza o valor com o novo valor do campo de entrada
  }

  return {
    value, // O valor atual do campo de formulário
    error, // A mensagem de erro atual (ou null se não houver erro)
    setValue, // Função para definir o valor do campo
    onChange, // Função para lidar com eventos de mudança no campo de entrada
    validate: () => validate(value), // Função para validar o valor atual
    onBlur: () => validate(value), // Função para validar o valor quando o campo perde o foco
  };
};

export default useForm;
/*
Este componente useForm é uma ferramenta útil para lidar com a validação de campos de formulário em React. Ele permite definir diferentes tipos de validação (como e-mail, senha e número) e fornece funções para validar, rastrear alterações e gerenciar erros de entrada do usuário.
*/
