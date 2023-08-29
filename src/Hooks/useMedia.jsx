import React from "react";

// Componente personalizado useMedia para rastrear consultas de mídia
const useMedia = (media) => {
  const [match, setMatch] = React.useState(null);

  React.useEffect(() => {
    // Função para verificar se a consulta de mídia corresponde
    function changeMatch() {
      const { matches } = window.matchMedia(media); // Verifique se a consulta de mídia corresponde
      setMatch(matches); // Atualize o estado com o resultado da consulta de mídia
    }

    // Verifique a correspondência inicial quando o componente é montado
    changeMatch();

    // Adicione um ouvinte de redimensionamento da janela para atualizar a correspondência quando a janela for redimensionada
    window.addEventListener("resize", changeMatch);

    // Remova o ouvinte de redimensionamento quando o componente for desmontado para evitar vazamentos de memória
    return () => {
      window.removeEventListener("resize", changeMatch);
    };
  }, [media]); // A consulta de mídia é um valor dependente, então atualize sempre que media mudar

  return match; // Retorna o resultado da consulta de mídia (true se corresponder, false caso contrário)
};

export default useMedia;
/*
Este componente personalizado useMedia é útil para rastrear consultas de mídia em React. Ele usa a API window.matchMedia para verificar se a mídia especificada (como largura da janela) corresponde a uma consulta específica. O estado match é atualizado com o resultado da consulta de mídia e pode ser usado em componentes React para realizar ações com base em consultas de mídia, como tornar o layout responsivo. O ouvinte de redimensionamento da janela é adicionado durante o ciclo de vida do componente e removido quando o componente é desmontado, evitando vazamentos de memória.
*/
