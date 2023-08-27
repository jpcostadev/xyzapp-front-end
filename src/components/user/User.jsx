import React from "react";
import styles from "./User.module.css";
import UserHeader from "./UserHeader";
import { Route, Routes } from "react-router-dom";
import Feed from "../feed/Feed";
import UserAnuncioPost from "./UserAnuncioPost";
import ContainerMid from "../global/ContainerMid";
import UserStats from "./UserStats";
const User = () => {
  return (
    <section>
      <ContainerMid>
        <UserHeader />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="anunciar" element={<UserAnuncioPost />} />
          <Route path="estatisticas" element={<UserStats />} />
        </Routes>
      </ContainerMid>
    </section>
  );
};

export default User;
