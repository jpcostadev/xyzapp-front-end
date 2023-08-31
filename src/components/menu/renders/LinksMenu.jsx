import React from "react";
import { UserContext } from "../../../userContext";
import { NavLink } from "react-router-dom";
import styles from "./LinksMenu.module.css";
import { ReactComponent as Sair } from "../../../assets/Icones/sair.svg";
import { useNavigate } from "react-router-dom";

const LinksMenu = ({ ativo }) => {
  const { data, userLogout, login } = React.useContext(UserContext);

  const navigate = useNavigate();

  function handleLogout() {
    userLogout(); // Chama a função de logout do contexto do usuário
    navigate("/login"); // Redireciona o usuário para a página de login
  }

  return (
    <div>
      {data && (
        <div className={`${ativo && styles.ativo} ${styles.infoMenu}`}>
          {/* Links para diferentes partes do menu */}
          <NavLink to={"/editar-categoria"}>Editar minha categoria</NavLink>
          <NavLink to={"/conta"}>Meu Perfil</NavLink>
          <NavLink to={"/indique"}>Indique e Ganhe</NavLink>
        </div>
      )}

      {data && (
        <div className={`${ativo && styles.ativo} ${styles.ul}`}>
          <ul className={styles.linksMenu}>
            {/* Links do menu */}
            <li>comprar Moedas</li>
            <li>Pedidos Disponíveis</li>
            <li>Meus Pedidos</li>
            <li>Alguma coisa</li>
            <li>Contratar um profissional</li>
            <li>Fale Conosco</li>
            <li>
              <span className={styles.sairBtnContainer}>
                Sair
                <button className={styles.sairBtn} onClick={handleLogout}>
                  <Sair />
                </button>
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LinksMenu;
