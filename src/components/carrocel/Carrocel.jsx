import React from "react";

/**
 * Componente Carrocel exibe uma imagem com um botão "X" para removê-la.
 *
 * @param {object} props - As propriedades do componente.
 * @param {File} props.image - A imagem a ser exibida.
 * @param {function} props.onRemove - Função a ser chamada quando o botão "X" for clicado para remover a imagem.
 */
const Carrocel = ({ image, onRemove }) => {
  return (
    <div style={{ position: "relative" }}>
      {/* Exibe a imagem com base na URL criada a partir do objeto de imagem */}
      <img src={URL.createObjectURL(image)} alt="Imagem" />

      {/* Botão "X" para remover a imagem */}
      <button
        onClick={() => onRemove(image)} // Chama a função onRemove quando o botão é clicado
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          cursor: "pointer",
        }}
      >
        X
      </button>
    </div>
  );
};

export default Carrocel;
/*Este componente é útil em situações em que você deseja exibir uma lista de imagens em um carrossel e permitir que o usuário remova imagens individualmente clicando no botão "X". A função onRemove será chamada com o objeto de imagem como argumento quando o botão for clicado, permitindo que você atualize o estado ou realize qualquer ação necessária para remover a imagem. */
