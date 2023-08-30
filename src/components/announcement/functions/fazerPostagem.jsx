// postActions.js

// Importa a função SERVICO_POST para criar uma postagem
// e o useFetch para fazer a requisição HTTP
import { SERVICO_POST } from "../../../Api";
import useFetch from "../../../Hooks/useFetch";

/**
 * Função para fazer a postagem de um anúncio.
 *
 * @param {FormData} formData - Os dados do formulário a serem enviados.
 * @param {Function} request - Função para fazer a requisição HTTP.
 * @param {Function} navigate - Função para navegar para outra página.
 * @param {Function} setError - Função para definir uma mensagem de erro.
 */
export async function fazerPostagemAnuncio(
  formData,
  request,
  navigate,
  error,
  setError,
) {
  try {
    // Obtém o token do localStorage para autenticação
    const token = window.localStorage.getItem("token");

    // Cria a URL e as opções para a requisição POST usando a função SERVICO_POST
    const { url, options } = SERVICO_POST(formData, token);

    // Faz a requisição HTTP para criar a postagem
    const { response } = await request(url, options);

    // Verifica se a requisição foi bem-sucedida
    if (response.ok) {
      // Se sim, redireciona o usuário para a página de conta
      navigate("/conta");
    } else {
      // Se houver um erro na requisição, define uma mensagem de erro
      return null;
    }
  } catch (error) {
    // Em caso de erro durante o processo, registra o erro no console
    console.error("Erro ao fazer a postagem:", error);

    // Define uma mensagem de erro para informar o usuário
    setError("Erro ao postar o anúncio.");
  }
}
