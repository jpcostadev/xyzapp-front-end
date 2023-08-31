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
            Plano:
            <span>{user ? user.plano_ativo : "Carregando..."}</span>
          </p>

          <p className={styles.limite}>
            Limite:{" "}
            <span>
              {user
                ? user.contador_postagens + "/" + user.limite_postagens
                : "Carregando..."}
            </span>{" "}
            Postagens
          </p>
        </div>
      ) : (
        <Link to={"/login"} />
      )}
    </div>
  );
};

export default InfoPlans;
