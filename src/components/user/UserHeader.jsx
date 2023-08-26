import React from "react";
import UserHeaderNav from "./UserHeaderNav";
import styles from "../user/UserHeader.module.css";
const UserHeader = () => {
  return (
    <header>
      <h1 className="titulo">Titulo</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
