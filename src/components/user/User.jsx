import React from "react";
import styles from "./User.module.css";
import UserHeader from "./UserHeader";
import { Route, Routes } from "react-router-dom";
import Feed from "../feed/Feed";
import UserServicePost from "./UserServicePost";
import ContainerMid from "../global/ContainerMid";
const User = () => {
  return (
    <section>
      <ContainerMid>
        <UserHeader />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="postar" element={<UserServicePost />} />
          <Route path="estatisticas" element={<UserServicePost />} />
        </Routes>
      </ContainerMid>
    </section>
  );
};

export default User;
