import { useState, useEffect } from "react";
import { LIMIT_GET, LIMIT_POST, LIMIT_UPDATE } from "../Api"; // Certifique-se de ter um endpoint LIMIT_UPDATE
import useFetch from "./useFetch";

function useLimitePostagem(limiteInicial) {
  const token = window.localStorage.getItem("token");
  const { url: getLimitUrl, options: getLimitOptions } = LIMIT_GET(token);
  const { data, error, loading, request } = useFetch();
  const [limite, setLimite] = useState(limiteInicial);

  useEffect(() => {
    async function fetchLimite() {
      await request(getLimitUrl, getLimitOptions);
    }

    fetchLimite();
  }, [getLimitUrl, getLimitOptions, request]);

  useEffect(() => {
    console.log("Limite atual:", limite);
  }, [limite]);

  useEffect(() => {
    if (!loading && data) {
      setLimite(data.limite_postagens);
    }
  }, [loading, data]);

  const decrementarLimite = () => {
    if (limite > 0) {
      setLimite(limite - 1);
    }
  };

  const resetLimite = () => {
    setLimite(limiteInicial);
  };

  const atualizarLimite = async (novoLimite) => {
    // Aqui você fará uma solicitação POST para o endpoint LIMIT_UPDATE
    const { url: updateLimitUrl, options: updateLimitOptions } = LIMIT_UPDATE(
      token,
      novoLimite,
    );

    try {
      const response = await request(updateLimitUrl, updateLimitOptions);
      // Verifique se a solicitação foi bem-sucedida e atualize o estado conforme necessário
      if (response.status === 200) {
        setLimite(novoLimite);
      }
    } catch (error) {
      // Lide com erros de solicitação, se necessário
    }
  };

  return { limite, decrementarLimite, resetLimite, atualizarLimite };
}

export default useLimitePostagem;
