import React from "react";
import styles from "./Button.module.css";

/**
 * O componente Button é usado para renderizar um botão com um estilo específico.
 *
 * @component
 * @param {object} props - As propriedades do componente.
 * @param {ReactNode} props.children - O conteúdo interno do botão.
 * @param {any} props... - Outras propriedades que podem ser passadas para o elemento button.
 * @returns {JSX.Element} - Retorna um elemento JSX que representa o botão.
 */
const Button = ({ type, children, onClick, ...props }) => {
  return (
    <button type={type} onClick={onClick} {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
/**Nesses comentários, explicamos que o componente Button é usado para renderizar um botão com um estilo específico. Também detalhamos as propriedades que ele aceita e o que retorna. Isso facilita a compreensão e o uso do componente por outros desenvolvedores. */
