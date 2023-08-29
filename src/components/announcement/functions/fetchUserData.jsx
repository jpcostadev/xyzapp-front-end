// Importa a função USER_GET para buscar dados do usuário
// e o useFetch para fazer a requisição HTTP
import { USER_GET } from "../../../Api";
import useFetch from "../../../Hooks/useFetch";

/**
 * Função para buscar dados do usuário e verificar o limite de postagens.
 *
 * @param {Function} request - Função para fazer a requisição HTTP.
 * @param {Function} navigate - Função para navegar para outra página.
 * @param {Function} setError - Função para definir uma mensagem de erro.
 * @param {Function} getUser - Função para obter informações do usuário.
 */

export async function fetchUserData(
  request,
  navigate,
  setError,
  error,
  getUser,
  useFetch,
) {
  try {
    // Obtém o token de autenticação do usuário do `localStorage`.
    const token = window.localStorage.getItem("token");

    // Primeiro, verifique o limite de postagens do usuário.
    const { url: limitUrl, options: limitOptions } = USER_GET(token);
    const { response: limitResponse, json: limitJson } = await request(
      limitUrl,
      limitOptions,
    );

    if (limitResponse.ok) {
      // Obtém o limite máximo de postagens do objeto JSON retornado.
      const MAX_POSTS = limitJson.limite_postagens;

      if (limitJson && limitJson.limite_postagens >= MAX_POSTS) {
        setError("Limite máximo de postagens excedido.");
        console.log(limitJson);

        return;
      }
    } else {
      setError("Erro ao verificar o limite de postagens.");
    }

    // Se o limite não foi atingido, agora busque os dados do usuário.
    const { url, options } = USER_GET(token);
    const { response, json } = await request(url, options);

    if (response.ok) {
      // Chama a função `getUser` para atualizar as informações do usuário.
      getUser(token);

      return {
        success: true,
        message: "Dados do usuário atualizados com sucesso.",
      };
    } else {
      setError(error);
      return {
        success: false,
        message: "Erro ao buscar dados do usuário.",
      };
    }
  } catch (error) {
    setError("Erro ao buscar dados do usuário:", error);

    return {
      success: false,
      message: "Erro ao buscar dados do usuário.",
    };
  }
}
