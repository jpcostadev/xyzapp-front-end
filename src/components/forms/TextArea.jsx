import React from "react";
import styles from "./TextArea.module.css";

/**
 * O componente TextArea é usado para renderizar uma área de texto.
 *
 * @component
 * @param {object} props - As propriedades do componente.
 * @param {string} [props.label] - O rótulo associado à área de texto (opcional).
 * @param {string} props.name - O nome da área de texto.
 * @param {string} [props.error] - Uma mensagem de erro a ser exibida (opcional).
 * @param {number} [props.rows] - O número de linhas da área de texto (padrão: 4).
 * @param {number} [props.cols] - O número de colunas da área de texto (padrão: 50).
 * @param {string} [props.placeholder] - O texto de espaço reservado para a área de texto (opcional).
 * @param {string} props.value - O valor da área de texto.
 * @param {function} props.onChange - Função de retorno de chamada para lidar com alterações no valor da área de texto.
 * @returns {JSX.Element} - Retorna um elemento JSX que representa uma área de texto.
 */
const TextArea = ({
  label,
  name,
  error,
  rows,
  cols,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className={styles.textAreaContainer}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        rows={rows || 4}
        cols={cols || 50}
        placeholder={placeholder || ""}
        value={value}
        onChange={onChange}
        className={styles.textArea}
        style={{ resize: "none" }}
      ></textarea>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default TextArea;
/**Nesses comentários, explicamos que o componente TextArea é usado para renderizar uma área de texto e detalhamos as propriedades que ele aceita, incluindo a possibilidade de exibir um rótulo, uma mensagem de erro, configurar o número de linhas e colunas e especificar um texto de espaço reservado. Isso deve facilitar o entendimento e o uso deste componente em seu código. */
