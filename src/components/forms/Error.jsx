import React from "react";
import style from "./Error.module.css";

const Error = ({ error }) => {
  return <p className={style.erro}>{error}</p>;
};

export default Error;
