import React from "react";
import styles from "./Input.module.css";

/**
 * O componente Input é usado para renderizar campos de entrada de texto.
 *
 * @component
 * @param {object} props - As propriedades do componente.
 * @param {string} props.label - O rótulo do campo de entrada.
 * @param {string} props.type - O tipo de campo de entrada (por exemplo, "text" ou "password").
 * @param {string} props.name - O nome do campo de entrada.
 * @param {string} props.error - A mensagem de erro a ser exibida (opcional).
 * @param {string} props.value - O valor do campo de entrada.
 * @param {function} props.onChange - Função de retorno de chamada para lidar com alterações no valor do campo.
 * @param {function} props.onBlur - Função de retorno de chamada para lidar com o evento onBlur.
 * @param {string} props.placeholder - O texto de placeholder do campo de entrada.
 * @returns {JSX.Element} - Retorna um elemento JSX que representa um campo de entrada de texto.
 */
const Input = ({
  label,
  type,
  name,
  error,
  value,
  onChange,
  onBlur,
  placeholder,
  required,
  disabled,
}) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        required={required ? true : undefined}
        className={styles.input}
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
      ></input>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;

/**Nesses comentários, explicamos que o componente Input é usado para renderizar campos de entrada de texto. Detalhamos as propriedades que ele aceita, incluindo rótulo, tipo, nome, mensagem de erro (opcional), valor e funções de retorno de chamada para lidar com eventos. Isso deve facilitar o entendimento e o uso deste componente em seu código. */
