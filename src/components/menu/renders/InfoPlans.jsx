import React from "react";
import styles from "./InfoPlans.module.css";
import { Link } from "react-router-dom";

const InfoPlans = ({ user, ativo }) => {
  return (
    <div>
      {user ? (
        <div className={`${ativo && styles.ativo} ${styles.infoPlans}`}>
          {/* Exibe informações sobre o plano ativo e limite de postagens */}
          <p className={styles.plano}>
            Plano: <span>{user ? user.plano_ativo : "Carregando..."}</span>
          </p>
        </div>
      ) : (
        <Link to={"/login"} />
      )}
    </div>
  );
};

export default InfoPlans;
