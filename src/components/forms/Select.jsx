import React from "react";
import styles from "./Select.module.css";

/**
 * O componente Select é usado para renderizar um elemento de seleção (dropdown) com opções.
 *
 * @component
 * @param {object} props - As propriedades do componente.
 * @param {Array} props.options - Um array de objetos que representam as opções no elemento de seleção.
 * @param {function} props.onChange - Função de retorno de chamada para lidar com alterações na seleção.
 * @param {string} props.name - O nome do elemento de seleção.
 * @param {string} props.value - O valor selecionado no elemento de seleção.
 * @returns {JSX.Element} - Retorna um elemento JSX que representa um elemento de seleção (dropdown).
 */
const Select = ({ options, onChange, name, value }) => {
  return (
    <select
      id={name}
      name={name}
      className={styles.select}
      onChange={onChange}
      value={value}
    >
      {options.map((option, index) => (
        <option className={styles.options} key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
