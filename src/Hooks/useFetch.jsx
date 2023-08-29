import React from "react";

// Cria um hook personalizado para realizar solicitações HTTP
const useFetch = () => {
  // Estados para armazenar dados, erros e informações de carregamento
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // Função de solicitação assíncrona para buscar dados de uma URL com opções personalizadas
  const request = React.useCallback(async (url, options) => {
    let response;
    let json;

    try {
      setError(null); // Limpa qualquer erro anterior
      setLoading(true); // Define o estado de carregamento como verdadeiro
      response = await fetch(url, options); // Realiza a solicitação HTTP
      json = await response.json(); // Converte a resposta em formato JSON
      // Verifica se a resposta não foi bem-sucedida (status HTTP diferente de 200)
      if (!response.ok) throw new Error(json.message);
      if (response.status === 404) {
        setError("Recurso não encontrado."); // Armazena a mensagem de erro no estado de erro
      }
    } catch (err) {
      json = null; // Define os dados JSON como nulos em caso de erro
      setError(err.message || "Recurso não encontrado."); // Armazena a mensagem de erro no estado de erro
    } finally {
      setData(json); // Define os dados recebidos no estado de dados
      setLoading(false); // Define o estado de carregamento como falso
      return { response, json }; // Retorna a resposta e os dados JSON
    }
  }, []);

  // Retorna um objeto contendo os estados e a função de solicitação
  return {
    data, // Dados recebidos da solicitação
    error,
    loading, // Indica se a solicitação está em andamento
    setError, // Função para definir o erro
    request, // Função para fazer uma solicitação HTTP
  };
};

export default useFetch; // Exporta o hook personalizado
