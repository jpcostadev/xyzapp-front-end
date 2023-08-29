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
 * @returns {JSX.Element} - Retorna um elemento JSX que representa um elemento de seleção (dropdown).
 */
const Select = ({ options, onChange, name }) => {
  return (
    <select id={name} name={name} className={styles.select} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;

/** Nesses comentários, explicamos que o componente Select é usado para renderizar um elemento de seleção (dropdown) com opções. Detalhamos as propriedades que ele aceita, incluindo as opções a serem exibidas e uma função de retorno de chamada para lidar com alterações na seleção. Isso deve facilitar o entendimento e o uso deste componente em seu código.*/
