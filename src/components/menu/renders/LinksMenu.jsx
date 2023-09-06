import React from "react";
import { UserContext } from "../../../userContext";
import { NavLink } from "react-router-dom";
import styles from "./LinksMenu.module.css";
import { ReactComponent as Sair } from "../../../assets/Icones/sair.svg";
import { useNavigate } from "react-router-dom";
//icones menu
import moeda from "../../../assets/Iconesmenu/moeda.svg";
import pedidos from "../../../assets/Iconesmenu/pedidos.svg";
import meuspedidos from "../../../assets/Iconesmenu/check.svg";
import contratar from "../../../assets/Iconesmenu/userAdd.svg";
import faleconosco from "../../../assets/Iconesmenu/faleconosco.svg";
import useredit from "../../../assets/Iconesmenu/useredit.svg";
import user from "../../../assets/Iconesmenu/user.svg";
import indique from "../../../assets/Iconesmenu/indique.svg";

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
        <div className={`${ativo && styles.ativo} ${styles.infoMenu} `}>
          {/* Links para diferentes partes do menu */}
          <NavLink to={"/editar-categoria"}>
            {" "}
            <img src={useredit} alt="" /> Editar minha categoria
          </NavLink>
          <NavLink to={"/conta"}>
            {" "}
            <img src={user} alt="" /> Meu Perfil
          </NavLink>
          <NavLink to={"/indique"}>
            {" "}
            <img src={indique} alt="" /> Indique e Ganhe
          </NavLink>
        </div>
      )}

      {data && (
        <div className={`${ativo && styles.ativo} ${styles.ul} `}>
          <ul className={styles.linksMenu}>
            {/* Links do menu */}
            <li>
              <img src={moeda} alt="" /> comprar Moedas
            </li>
            <li>
              {" "}
              <img src={pedidos} alt="" /> Pedidos Disponíveis
            </li>
            <li>
              {" "}
              <img src={meuspedidos} alt="" /> Meus Pedidos
            </li>
            <li>
              <img src={contratar} alt="" /> Contratar um profissional
            </li>
            <li>
              <img src={faleconosco} alt="" /> Fale Conosco
            </li>
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
