import React from "react";
import styles from "./Container.module.css";

/**
 * O componente Container é usado para envolver outros elementos e aplicar um estilo de contêiner.
 *
 * @component
 * @param {object} props - As propriedades do componente.
 * @param {React.ReactNode} props.children - Os elementos que devem ser incluídos dentro do contêiner.
 * @returns {JSX.Element} - Retorna um elemento JSX que representa um contêiner.
 */
const Container = ({ children }) => {
  return <div className={styles.Container}>{children}</div>;
};

export default Container;
/**Neste comentário, explicamos que o componente Container é usado para envolver outros elementos e aplicar um estilo de contêiner. Também detalhamos que ele aceita um único prop, children, que deve conter os elementos que serão renderizados dentro do contêiner. Isso ajuda a documentar a finalidade e o uso deste componente.*/
